import { getConfig, hexToRgb, PHYSICS, ParticleDensity } from './utils';
import { SpatialGrid } from './spatialGrid';
import { fbm } from './noise';

export interface ParticleSystem {
  positions: Float32Array;
  velocities: Float32Array;
  properties: Float32Array;
  colors: Uint8Array;
}

export class ParticleSimulation {
  private particles: ParticleSystem;
  private config: ReturnType<typeof getConfig>;
  private spatialGrid: SpatialGrid;
  private connectionCounts: Uint16Array;
  private renderPositions: Float32Array;
  private renderSizes: Float32Array;
  private renderColors: Float32Array;
  private lineVertices: Float32Array;
  private lineColors: Float32Array;
  private phases!: Float32Array;
  private noiseSeeds!: Float32Array;
  private basePositions!: Float32Array;
  private lineTint!: Float32Array;
  private lineCount = 0;

  constructor(
    width: number,
    height: number,
    palette: Array<{ color: string; a: number }>,
    densityPreset: ParticleDensity
  ) {
    this.config = getConfig(width, height, densityPreset);

    const n = this.config.particleCount;
    this.particles = {
      positions: new Float32Array(n * 2),
      velocities: new Float32Array(n * 2),
      properties: new Float32Array(n * 6),
      colors: new Uint8Array(n * 3),
    };

    this.connectionCounts = new Uint16Array(n);
    this.spatialGrid = new SpatialGrid(
      width,
      height,
      Math.max(16, Math.floor(this.config.maxDistance))
    );

    this.renderPositions = new Float32Array(n * 2);
    this.renderSizes = new Float32Array(n);
    this.renderColors = new Float32Array(n * 4);

    const maxSegments = Math.min(n * (this.config.connectionThreshold + 3), 20000);
    this.lineVertices = new Float32Array(maxSegments * 4);
    this.lineColors = new Float32Array(maxSegments * 8);

    this.phases = new Float32Array(n);
    this.noiseSeeds = new Float32Array(n * 2);
    this.lineTint = new Float32Array(3);
    const tintCol = hexToRgb(palette[0].color);
    this.lineTint[0] = tintCol[0] / 255;
    this.lineTint[1] = tintCol[1] / 255;
    this.lineTint[2] = tintCol[2] / 255;
    this.basePositions = new Float32Array(n * 2);

    this.initializeParticles(width, height, palette);
  }

  applyGpuState(pos: Float32Array, vel: Float32Array, props: Float32Array) {
    const n = this.config.particleCount;
    if (pos.length < n * 2 || vel.length < n * 2 || props.length < n * 4) return;

    for (let i = 0; i < n; i++) {
      const p2 = i * 2;
      const p6 = i * 6;
      this.particles.positions[p2] = pos[p2];
      this.particles.positions[p2 + 1] = pos[p2 + 1];
      this.particles.velocities[p2] = vel[p2];
      this.particles.velocities[p2 + 1] = vel[p2 + 1];
      this.particles.properties[p6] = props[i * 4 + 0]; // size
      this.particles.properties[p6 + 1] = props[i * 4 + 1]; // opacity
      this.particles.properties[p6 + 2] = props[i * 4 + 2]; // baseOpacity
      this.particles.properties[p6 + 3] = props[i * 4 + 3]; // life
    }

    this.rebuildRenderData();
  }

  private rebuildRenderData() {
    const n = this.config.particleCount;
    this.connectionCounts.fill(0);
    this.spatialGrid.rebuild();
    for (let i = 0; i < n; i++) {
      const posOffset = i * 2;
      this.spatialGrid.insert(
        i,
        this.particles.positions[posOffset],
        this.particles.positions[posOffset + 1]
      );
    }

    this.lineCount = 0;
    const maxSegments = this.lineVertices.length / 4;

    this.spatialGrid.forEachNeighborPair((i, j) => {
      const posI = i * 2;
      const posJ = j * 2;
      const dx = this.particles.positions[posI] - this.particles.positions[posJ];
      const dy = this.particles.positions[posI + 1] - this.particles.positions[posJ + 1];
      const dist = Math.hypot(dx, dy);

      if (dist < PHYSICS.PARTICLE_REPEL_RADIUS && dist > 0) {
        const repel = (PHYSICS.PARTICLE_REPEL_RADIUS - dist) / PHYSICS.PARTICLE_REPEL_RADIUS;
        const strength = repel * PHYSICS.PARTICLE_REPEL_STRENGTH;
        const inv = 1.0 / dist;
        const rx = dx * inv * strength;
        const ry = dy * inv * strength;

        this.particles.velocities[i * 2] += rx;
        this.particles.velocities[i * 2 + 1] += ry;
        this.particles.velocities[j * 2] -= rx;
        this.particles.velocities[j * 2 + 1] -= ry;
      }

      if (dist < this.config.maxDistance) {
        this.connectionCounts[i]++;
        this.connectionCounts[j]++;

        if (this.lineCount < maxSegments) {
          const strength = Math.pow(1 - dist / this.config.maxDistance, 2);
          const propI = i * 6;
          const propJ = j * 6;
          const avgOpacity =
            (this.particles.properties[propI + 1] + this.particles.properties[propJ + 1]) /
            (2 * 255);
          const avgConn =
            (this.particles.properties[propI + 5] + this.particles.properties[propJ + 5]) * 0.5;
          const finalA = Math.max(0, Math.min(1, strength * avgOpacity * (0.35 + avgConn * 0.06)));

          if (finalA > 0.02) {
            const vertexOffset = this.lineCount * 4;
            this.lineVertices[vertexOffset] = this.particles.positions[posI];
            this.lineVertices[vertexOffset + 1] = this.particles.positions[posI + 1];
            this.lineVertices[vertexOffset + 2] = this.particles.positions[posJ];
            this.lineVertices[vertexOffset + 3] = this.particles.positions[posJ + 1];

            const colorOffset = this.lineCount * 8;
            const stableA = Math.max(0.02, finalA * 0.8);
            this.lineColors[colorOffset] = this.lineTint[0];
            this.lineColors[colorOffset + 1] = this.lineTint[1];
            this.lineColors[colorOffset + 2] = this.lineTint[2];
            this.lineColors[colorOffset + 3] = stableA;
            this.lineColors[colorOffset + 4] = this.lineTint[0];
            this.lineColors[colorOffset + 5] = this.lineTint[1];
            this.lineColors[colorOffset + 6] = this.lineTint[2];
            this.lineColors[colorOffset + 7] = stableA;

            this.lineCount++;
          }
        }
      }
    });

    const smoothing = 0.12;
    for (let i = 0; i < n; i++) {
      const propOffset = i * 6;
      this.particles.properties[propOffset + 5] =
        this.particles.properties[propOffset + 5] * (1 - smoothing) +
        this.connectionCounts[i] * smoothing;

      const posOffset = i * 2;
      this.renderPositions[posOffset] = this.particles.positions[posOffset];
      this.renderPositions[posOffset + 1] = this.particles.positions[posOffset + 1];

      const size = this.particles.properties[propOffset];
      const opacity = this.particles.properties[propOffset + 1];
      const life = this.particles.properties[propOffset + 3];
      const energy = this.particles.properties[propOffset + 4];
      const smoothedConn = this.particles.properties[propOffset + 5];

      const dynamicSize = size + Math.sin(life) * 0.2 * energy;
      const connectionGlow = Math.min(1.5, 0.8 + smoothedConn * 0.15);
      const energyGlow = Math.max(0.1, Math.min(1.5, 0.8 + energy * 0.4));
      const bodyOpacity = Math.max(0, Math.min(1, (opacity / 255) * connectionGlow * energyGlow));

      this.renderSizes[i] = dynamicSize * (2 + energy);

      const colorOffset = i * 3;
      const renderColorOffset = i * 4;
      this.renderColors[renderColorOffset] = this.particles.colors[colorOffset] / 255;
      this.renderColors[renderColorOffset + 1] = this.particles.colors[colorOffset + 1] / 255;
      this.renderColors[renderColorOffset + 2] = this.particles.colors[colorOffset + 2] / 255;
      this.renderColors[renderColorOffset + 3] = bodyOpacity;
    }
  }

  private initializeParticles(
    width: number,
    height: number,
    palette: Array<{ color: string; a: number }>
  ) {
    const n = this.config.particleCount;
    const gridCols = Math.ceil(Math.sqrt(n * (width / height)));
    const gridRows = Math.ceil(n / gridCols);
    const cellW = width / gridCols;
    const cellH = height / gridRows;

    for (let i = 0; i < n; i++) {
      const gridX = i % gridCols;
      const gridY = Math.floor(i / gridCols);
      const posOffset = i * 2;
      this.particles.positions[posOffset] = gridX * cellW + (Math.random() * 0.8 + 0.1) * cellW;
      this.particles.positions[posOffset + 1] = gridY * cellH + (Math.random() * 0.8 + 0.1) * cellH;
      this.basePositions[posOffset] = this.particles.positions[posOffset];
      this.basePositions[posOffset + 1] = this.particles.positions[posOffset + 1];

      const velOffset = i * 2;
      this.particles.velocities[velOffset] = (Math.random() - 0.5) * 0.1;
      this.particles.velocities[velOffset + 1] = (Math.random() - 0.5) * 0.1;

      const propOffset = i * 6;
      const baseOpacity = (0.3 + Math.random() * 0.4) * 255;
      this.particles.properties[propOffset] = 1.2 + Math.random() * 0.8; // size
      this.particles.properties[propOffset + 1] = baseOpacity; // opacity
      this.particles.properties[propOffset + 2] = baseOpacity; // baseOpacity
      this.particles.properties[propOffset + 3] = Math.random() * Math.PI * 2; // life
      this.particles.properties[propOffset + 4] = 0.3 + Math.random() * 0.7; // energy
      this.particles.properties[propOffset + 5] = 0; // smoothedConn

      const colorOffset = i * 3;
      const paletteColor = palette[Math.floor(Math.random() * palette.length)];
      const [r, g, b] = hexToRgb(paletteColor.color);
      this.particles.colors[colorOffset] = r;
      this.particles.colors[colorOffset + 1] = g;
      this.particles.colors[colorOffset + 2] = b;

      this.phases[i] = Math.random() * Math.PI * 2;
      this.noiseSeeds[i * 2] = Math.random() * 10;
      this.noiseSeeds[i * 2 + 1] = Math.random() * 10;
    }
  }

  update(
    dtNorm: number,
    width: number,
    height: number,
    mouseX: number,
    mouseY: number,
    mouseActive: boolean
  ) {
    const n = this.config.particleCount;
    this.connectionCounts.fill(0);
    this.spatialGrid.rebuild();

    for (let i = 0; i < n; i++) {
      const posOffset = i * 2;
      const velOffset = i * 2;
      const propOffset = i * 6;

      const x = this.particles.positions[posOffset];
      const y = this.particles.positions[posOffset + 1];
      let vx = this.particles.velocities[velOffset];
      let vy = this.particles.velocities[velOffset + 1];

      let opacity = this.particles.properties[propOffset + 1];
      const baseOpacity = this.particles.properties[propOffset + 2];
      let life = this.particles.properties[propOffset + 3];
      let energy = this.particles.properties[propOffset + 4];

      life += PHYSICS.LIFE_INCREMENT * dtNorm;

      const seedX = this.noiseSeeds[i * 2];
      const seedY = this.noiseSeeds[i * 2 + 1];

      const sampleScale = 0.005; // increased to reduce spatial correlation between neighbors
      const sx = fbm(life * sampleScale + seedX, seedY * 0.37 + i * 0.001, 4);
      const sy = fbm(life * sampleScale + seedY, seedX * 0.41 + i * 0.001, 4);

      vx += sx * PHYSICS.WANDER_STRENGTH * energy * 0.8;
      vy += sy * PHYSICS.WANDER_STRENGTH * energy * 0.8;

      if (Math.abs(fbm(life * 0.05 + seedX, seedY, 2)) > 0.95) {
        vx += (Math.random() - 0.5) * 0.012 * energy;
        vy += (Math.random() - 0.5) * 0.012 * energy;
      }

      if (mouseActive) {
        const dx = mouseX - x;
        const dy = mouseY - y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.config.mouseRadius && dist > 0) {
          const force = (this.config.mouseRadius - dist) / this.config.mouseRadius;
          const ang = Math.atan2(dy, dx);
          const repel = force * PHYSICS.MOUSE_REPEL_STRENGTH;
          vx -= Math.cos(ang) * repel;
          vy -= Math.sin(ang) * repel;
          opacity = Math.min(255, baseOpacity + force * 76);
          energy = Math.min(1, energy + force * 0.1);
        } else {
          opacity += (baseOpacity - opacity) * PHYSICS.OPACITY_LERP_SPEED;
          energy += (0.8 - energy) * 0.01;
        }
      } else {
        opacity += (baseOpacity - opacity) * PHYSICS.OPACITY_LERP_SPEED;
        energy += (0.8 - energy) * 0.01;
      }

      const maxV = PHYSICS.MAX_SPEED * energy;
      vx = Math.max(-maxV, Math.min(maxV, vx));
      vy = Math.max(-maxV, Math.min(maxV, vy));

      const newX = x + vx * this.config.baseSpeed * dtNorm;
      const newY = y + vy * this.config.baseSpeed * dtNorm;

      vx *= PHYSICS.FRICTION;
      vy *= PHYSICS.FRICTION;

      const margin = 15;
      let finalX = newX;
      let finalY = newY;

      if (newX < -margin) {
        finalX = width + margin;
        vx += (Math.random() - 0.5) * 0.05;
      } else if (newX > width + margin) {
        finalX = -margin;
        vx += (Math.random() - 0.5) * 0.05;
      }

      if (newY < -margin) {
        finalY = height + margin;
        vy += (Math.random() - 0.5) * 0.05;
      } else if (newY > height + margin) {
        finalY = -margin;
        vy += (Math.random() - 0.5) * 0.05;
      }

      const speed = Math.hypot(vx, vy);
      if (speed < PHYSICS.MIN_SPEED) {
        const ang = Math.random() * Math.PI * 2;
        vx += Math.cos(ang) * PHYSICS.MIN_SPEED;
        vy += Math.sin(ang) * PHYSICS.MIN_SPEED;
      }

      this.particles.positions[posOffset] = finalX;
      this.particles.positions[posOffset + 1] = finalY;
      this.particles.velocities[velOffset] = vx;
      this.particles.velocities[velOffset + 1] = vy;
      this.particles.properties[propOffset + 1] = opacity;
      this.particles.properties[propOffset + 3] = life;
      this.particles.properties[propOffset + 4] = energy;

      this.spatialGrid.insert(i, finalX, finalY);
    }

    this.lineCount = 0;
    const maxSegments = this.lineVertices.length / 4;

    this.spatialGrid.forEachNeighborPair((i, j) => {
      const posI = i * 2;
      const posJ = j * 2;
      const dx = this.particles.positions[posI] - this.particles.positions[posJ];
      const dy = this.particles.positions[posI + 1] - this.particles.positions[posJ + 1];
      const dist = Math.hypot(dx, dy);

      if (dist < PHYSICS.PARTICLE_REPEL_RADIUS && dist > 0) {
        const repel = (PHYSICS.PARTICLE_REPEL_RADIUS - dist) / PHYSICS.PARTICLE_REPEL_RADIUS;
        const strength = repel * PHYSICS.PARTICLE_REPEL_STRENGTH;
        const inv = 1.0 / dist;
        const rx = dx * inv * strength;
        const ry = dy * inv * strength;

        this.particles.velocities[i * 2] += rx;
        this.particles.velocities[i * 2 + 1] += ry;
        this.particles.velocities[j * 2] -= rx;
        this.particles.velocities[j * 2 + 1] -= ry;
      }

      if (dist < this.config.maxDistance) {
        this.connectionCounts[i]++;
        this.connectionCounts[j]++;

        if (this.lineCount < maxSegments) {
          const strength = Math.pow(1 - dist / this.config.maxDistance, 2);
          const propI = i * 6;
          const propJ = j * 6;
          const avgOpacity =
            (this.particles.properties[propI + 1] + this.particles.properties[propJ + 1]) /
            (2 * 255);
          const avgConn =
            (this.particles.properties[propI + 5] + this.particles.properties[propJ + 5]) * 0.5;
          const finalA = Math.max(0, Math.min(1, strength * avgOpacity * (0.35 + avgConn * 0.06)));

          if (finalA > 0.02) {
            const vertexOffset = this.lineCount * 4;
            this.lineVertices[vertexOffset] = this.particles.positions[posI];
            this.lineVertices[vertexOffset + 1] = this.particles.positions[posI + 1];
            this.lineVertices[vertexOffset + 2] = this.particles.positions[posJ];
            this.lineVertices[vertexOffset + 3] = this.particles.positions[posJ + 1];

            const colorOffset = this.lineCount * 8;
            const stableA = Math.max(0.02, finalA * 0.8);
            this.lineColors[colorOffset] = this.lineTint[0];
            this.lineColors[colorOffset + 1] = this.lineTint[1];
            this.lineColors[colorOffset + 2] = this.lineTint[2];
            this.lineColors[colorOffset + 3] = stableA;
            this.lineColors[colorOffset + 4] = this.lineTint[0];
            this.lineColors[colorOffset + 5] = this.lineTint[1];
            this.lineColors[colorOffset + 6] = this.lineTint[2];
            this.lineColors[colorOffset + 7] = stableA;

            this.lineCount++;
          }
        }
      }
    });

    const smoothing = 0.12;
    for (let i = 0; i < n; i++) {
      const propOffset = i * 6;
      this.particles.properties[propOffset + 5] =
        this.particles.properties[propOffset + 5] * (1 - smoothing) +
        this.connectionCounts[i] * smoothing;

      const posOffset = i * 2;
      this.renderPositions[posOffset] = this.particles.positions[posOffset];
      this.renderPositions[posOffset + 1] = this.particles.positions[posOffset + 1];

      const size = this.particles.properties[propOffset];
      const opacity = this.particles.properties[propOffset + 1];
      const life = this.particles.properties[propOffset + 3];
      const energy = this.particles.properties[propOffset + 4];
      const smoothedConn = this.particles.properties[propOffset + 5];

      const dynamicSize = size + Math.sin(life) * 0.2 * energy;
      const connectionGlow = Math.min(1.5, 0.8 + smoothedConn * 0.15);
      const energyGlow = Math.max(0.1, Math.min(1.5, 0.8 + energy * 0.4));
      const bodyOpacity = Math.max(0, Math.min(1, (opacity / 255) * connectionGlow * energyGlow));

      this.renderSizes[i] = dynamicSize * (2 + energy);

      const colorOffset = i * 3;
      const renderColorOffset = i * 4;
      this.renderColors[renderColorOffset] = this.particles.colors[colorOffset] / 255;
      this.renderColors[renderColorOffset + 1] = this.particles.colors[colorOffset + 1] / 255;
      this.renderColors[renderColorOffset + 2] = this.particles.colors[colorOffset + 2] / 255;
      this.renderColors[renderColorOffset + 3] = bodyOpacity;
    }
  }

  getRenderData() {
    return {
      positions: this.renderPositions,
      sizes: this.renderSizes,
      colors: this.renderColors,
      lineVertices: this.lineVertices,
      lineColors: this.lineColors,
      lineCount: this.lineCount,
      particleCount: this.config.particleCount,
    };
  }
}
