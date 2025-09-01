import { lerp, fade } from './utils';

function xorshift32(seed: number) {
  let x = seed || 123456789;
  return function () {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967295;
  };
}

function buildPermutation(rng: () => number) {
  const perm = new Uint8Array(256);
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  const P = new Uint8Array(512);
  for (let i = 0; i < 512; i++) P[i] = perm[i & 255];
  return P;
}

function buildGradients(rng: () => number) {
  const grads: Array<[number, number]> = new Array(256);
  for (let i = 0; i < 256; i++) {
    const a = rng() * Math.PI * 2;
    grads[i] = [Math.cos(a), Math.sin(a)];
  }
  for (let i = 256; i < 512; i++) grads[i] = grads[i - 256];
  return grads;
}

export class Noise {
  private P: Uint8Array;
  private grads: Array<[number, number]>;
  private tileX: number | null = null;
  private tileY: number | null = null;

  constructor(options?: { seed?: number; tileX?: number; tileY?: number }) {
    const seed = options?.seed ?? 0x9e3779b9;
    const rng = xorshift32(seed >>> 0);
    this.P = buildPermutation(rng);
    this.grads = buildGradients(rng);
    if (options?.tileX) this.tileX = options.tileX;
    if (options?.tileY) this.tileY = options.tileY;
  }

  perlin2(x: number, y: number) {
    let xf = x;
    let yf = y;
    if (this.tileX) xf = (x % this.tileX) + this.tileX * Math.floor(x / this.tileX);
    if (this.tileY) yf = (y % this.tileY) + this.tileY * Math.floor(y / this.tileY);

    const xi = Math.floor(xf) & 255;
    const yi = Math.floor(yf) & 255;
    const xrel = xf - Math.floor(xf);
    const yrel = yf - Math.floor(yf);

    const u = fade(xrel);
    const v = fade(yrel);

    const aa = this.P[(this.P[xi] + yi) & 255];
    const ab = this.P[(this.P[xi] + yi + 1) & 255];
    const ba = this.P[(this.P[xi + 1] + yi) & 255];
    const bb = this.P[(this.P[xi + 1] + yi + 1) & 255];

    const gAA = this.grads[aa];
    const gBA = this.grads[ba];
    const gAB = this.grads[ab];
    const gBB = this.grads[bb];

    const x1 = lerp(gAA[0] * xrel + gAA[1] * yrel, gBA[0] * (xrel - 1) + gBA[1] * yrel, u);
    const x2 = lerp(
      gAB[0] * xrel + gAB[1] * (yrel - 1),
      gBB[0] * (xrel - 1) + gBB[1] * (yrel - 1),
      u
    );
    const vres = lerp(x1, x2, v);

    return Math.max(-1, Math.min(1, vres));
  }

  fbm(x: number, y: number, octaves = 5, lacunarity = 2.0, gain = 0.3) {
    let sum = 0;
    let amp = 1;
    let freq = 1;
    let max = 0;
    for (let o = 0; o < octaves; o++) {
      sum += amp * this.perlin2(x * freq, y * freq);
      max += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / max;
  }
}

const globalNoise = new Noise();

export function perlin2(x: number, y: number) {
  return globalNoise.perlin2(x, y);
}

export function fbm(x: number, y: number, octaves = 5, lacunarity = 2.0, gain = 0.3) {
  return globalNoise.fbm(x, y, octaves, lacunarity, gain);
}

export function createNoise(options?: { seed?: number; tileX?: number; tileY?: number }) {
  return new Noise(options);
}
