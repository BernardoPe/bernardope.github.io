import { PHYSICS } from './utils';
import type { CanvasRef, GLHelperRef, SimulationRef, ParamsRef, ParticleSimConfig } from './types';

export class GpuRenderer {
  private _canvasRef: CanvasRef;
  private _glHelperRef: GLHelperRef;
  private _simulationRef: SimulationRef;
  private _paramsRef: ParamsRef;

  constructor(
    canvasRef: CanvasRef,
    glHelperRef: GLHelperRef,
    simulationRef: SimulationRef,
    paramsRef: ParamsRef
  ) {
    this._canvasRef = canvasRef;
    this._glHelperRef = glHelperRef;
    this._simulationRef = simulationRef;
    this._paramsRef = paramsRef;
  }

  cleanup() {
    const canvas = this._canvasRef.current;
    if (canvas) {
      const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
      if (gl2 && this._paramsRef.current?.pendingSyncs) {
        const pendingSyncs = this._paramsRef.current.pendingSyncs;
        for (const pendingSync of pendingSyncs) {
          gl2.deleteSync(pendingSync.sync);
        }
        this._paramsRef.current.pendingSyncs = [];
      }
    }
  }

  render(dtNorm: number) {
    const didGpu = this.gpuUpdate(dtNorm);
    if (didGpu) {
      this.drawFrame();
    }
    return didGpu;
  }

  private gpuUpdate(dtNorm: number) {
    const canvas = this._canvasRef.current;
    if (!canvas) return false;
    const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    if (!gl2) return false;
    const helper = this._glHelperRef.current!;
    const program = helper.getProgram('particleUpdate') as WebGLProgram | undefined;
    if (!program) return false;

    const n = this._simulationRef.current?.getRenderData().particleCount || 0;
    if (n === 0) return false;

    const params = this._paramsRef.current!;
    if (params.currentPing === undefined) params.currentPing = 0;

    const srcIndex = params.currentPing;
    const srcSuffix = srcIndex === 0 ? 'a' : 'b';
    const dstSuffix = srcIndex === 0 ? 'b' : 'a';

    const posSrc = helper.getBuffer(`tf_pos_${srcSuffix}`);
    const velSrc = helper.getBuffer(`tf_vel_${srcSuffix}`);
    const propsSrc = helper.getBuffer(`tf_props_${srcSuffix}`);
    const posDst = helper.getBuffer(`tf_pos_${dstSuffix}`);
    const velDst = helper.getBuffer(`tf_vel_${dstSuffix}`);
    const propsDst = helper.getBuffer(`tf_props_${dstSuffix}`);

    gl2.useProgram(program);

    const resUniform = gl2.getUniformLocation(program, 'u_resolution');
    const dtUniform = gl2.getUniformLocation(program, 'u_deltaTime');
    const timeUniform = gl2.getUniformLocation(program, 'u_time');
    const mouseUniform = gl2.getUniformLocation(program, 'u_mouse');
    const mouseActiveUniform = gl2.getUniformLocation(program, 'u_mouseActive');
    const mouseRadiusUniform = gl2.getUniformLocation(program, 'u_mouseRadius');
    const baseSpeedUniform = gl2.getUniformLocation(program, 'u_baseSpeed');
    const physicsUniform = gl2.getUniformLocation(program, 'u_physics');

    gl2.uniform2f(resUniform, params.width, params.height);
    gl2.uniform1f(dtUniform, dtNorm);
    gl2.uniform1f(timeUniform, performance.now() / 1000);
    gl2.uniform2f(mouseUniform, params.mouseX, params.mouseY);
    gl2.uniform1f(mouseActiveUniform, params.mouseActive ? 1 : 0);

    // Type assertion for private config access
    const simulationWithConfig = this._simulationRef.current as {
      config?: ParticleSimConfig;
    } | null;
    gl2.uniform1f(mouseRadiusUniform, simulationWithConfig?.config?.mouseRadius || 120);
    gl2.uniform1f(baseSpeedUniform, simulationWithConfig?.config?.baseSpeed || 1.0);
    gl2.uniform4f(
      physicsUniform,
      PHYSICS.FRICTION,
      PHYSICS.WANDER_STRENGTH,
      PHYSICS.MOUSE_REPEL_STRENGTH,
      PHYSICS.MAX_SPEED
    );

    const posLoc = gl2.getAttribLocation(program, 'a_position');
    const velLoc = gl2.getAttribLocation(program, 'a_velocity');
    const propLoc = gl2.getAttribLocation(program, 'a_properties');
    const basePosLoc = gl2.getAttribLocation(program, 'a_basePosition');
    const noiseSeedLoc = gl2.getAttribLocation(program, 'a_noiseSeed');

    const bind = (buf: WebGLBuffer | null | undefined, loc: number, size: number) => {
      if (!buf || loc < 0) return;
      gl2.bindBuffer(gl2.ARRAY_BUFFER, buf);
      gl2.enableVertexAttribArray(loc);
      gl2.vertexAttribPointer(loc, size, gl2.FLOAT, false, 0, 0);
    };

    bind(posSrc, posLoc, 2);
    bind(velSrc, velLoc, 2);
    bind(propsSrc, propLoc, 4);

    const baseBuf = helper.getBuffer('basePositions');
    const noiseBuf = helper.getBuffer('noiseSeeds');
    if (baseBuf) bind(baseBuf, basePosLoc, 2);
    if (noiseBuf) bind(noiseBuf, noiseSeedLoc, 2);

    const tf = helper.getTransformFeedback(`tf_${dstSuffix}`);
    if (!tf) {
      console.warn('Missing transform feedback object for', `tf_${dstSuffix}`);
      return false;
    }
    if (!posDst || !velDst || !propsDst) {
      console.warn('Missing destination buffers for transform feedback');
      return false;
    }
    gl2.bindTransformFeedback(gl2.TRANSFORM_FEEDBACK, tf);
    gl2.bindBufferBase(gl2.TRANSFORM_FEEDBACK_BUFFER, 0, posDst);
    gl2.bindBufferBase(gl2.TRANSFORM_FEEDBACK_BUFFER, 1, velDst);
    gl2.bindBufferBase(gl2.TRANSFORM_FEEDBACK_BUFFER, 2, propsDst);

    gl2.enable(gl2.RASTERIZER_DISCARD);
    gl2.beginTransformFeedback(gl2.POINTS);
    gl2.drawArrays(gl2.POINTS, 0, n);
    gl2.endTransformFeedback();
    gl2.disable(gl2.RASTERIZER_DISCARD);

    gl2.bindTransformFeedback(gl2.TRANSFORM_FEEDBACK, null);

    if (!params.pendingSyncs) params.pendingSyncs = [];
    const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);

    if (sync) {
      gl2.flush();

      if (params.frameCount === undefined) params.frameCount = 0;
      params.frameCount++;

      const READBACK_EVERY_N_FRAMES = 10;
      const shouldReadback = params.frameCount % READBACK_EVERY_N_FRAMES === 0;
      const currentTime = performance.now();

      params.pendingSyncs.push({
        sync,
        posDst,
        velDst,
        propsDst,
        n,
        timestamp: currentTime,
        priority: shouldReadback,
      });

      this._processPendingIfNeeded(gl2);
      params.currentPing = 1 - srcIndex;
    }

    return true;
  }

  private _processPendingIfNeeded(gl2: WebGL2RenderingContext) {
    const params = this._paramsRef.current!;
    const pendingSyncs = params.pendingSyncs || [];
    const maxAge = 32;
    const currentTime = performance.now();

    for (let i = pendingSyncs.length - 1; i >= 0; i--) {
      const pendingSync = pendingSyncs[i];
      const { sync, posDst, velDst, propsDst, n, timestamp, priority } = pendingSync;

      if (!sync) continue;

      const status = gl2.clientWaitSync(sync, 0, 0);

      if (status === gl2.ALREADY_SIGNALED || status === gl2.CONDITION_SATISFIED) {
        if (priority) {
          try {
            const posRead = new Float32Array(n * 2);
            const velRead = new Float32Array(n * 2);
            const propsRead = new Float32Array(n * 4);

            gl2.bindBuffer(gl2.ARRAY_BUFFER, posDst);
            gl2.getBufferSubData(gl2.ARRAY_BUFFER, 0, posRead);
            gl2.bindBuffer(gl2.ARRAY_BUFFER, velDst);
            gl2.getBufferSubData(gl2.ARRAY_BUFFER, 0, velRead);
            gl2.bindBuffer(gl2.ARRAY_BUFFER, propsDst);
            gl2.getBufferSubData(gl2.ARRAY_BUFFER, 0, propsRead);

            const sim = this._simulationRef.current;
            if (sim && sim.applyGpuState) {
              sim.applyGpuState(posRead, velRead, propsRead);
            }
          } catch (e) {
            console.debug('getBufferSubData failed', e);
          }
        }

        gl2.deleteSync(sync);
        pendingSyncs.splice(i, 1);
      } else if (currentTime - timestamp > maxAge) {
        console.debug('Sync operation timed out, cleaning up');
        gl2.deleteSync(sync);
        pendingSyncs.splice(i, 1);
      }
    }
  }

  private drawFrame() {
    const canvas = this._canvasRef.current!;
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    const helper = this._glHelperRef.current!;
    const simulation = this._simulationRef.current!;
    const { width, height, dpr } = this._paramsRef.current;

    gl.viewport(0, 0, Math.floor(width * dpr), Math.floor(height * dpr));
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const renderData = simulation.getRenderData();

    if (renderData.lineCount > 0) {
      const program = helper.getProgram('lines')!;
      gl.useProgram(program);
      const resUniform = gl.getUniformLocation(program, 'u_resolution');
      gl.uniform2f(resUniform, width, height);

      let lineBuffer = helper.getBuffer('lineVertices');
      if (!lineBuffer) {
        lineBuffer = helper.createBuffer('lineVertices', renderData.lineVertices)!;
      } else {
        gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
        gl.bufferSubData(
          gl.ARRAY_BUFFER,
          0,
          renderData.lineVertices.subarray(0, renderData.lineCount * 4)
        );
      }

      let lineColorBuffer = helper.getBuffer('lineColors');
      if (!lineColorBuffer) {
        lineColorBuffer = helper.createBuffer('lineColors', renderData.lineColors)!;
      } else {
        gl.bindBuffer(gl.ARRAY_BUFFER, lineColorBuffer);
        gl.bufferSubData(
          gl.ARRAY_BUFFER,
          0,
          renderData.lineColors.subarray(0, renderData.lineCount * 8)
        );
      }

      const posAttr = gl.getAttribLocation(program, 'a_pos');
      const colorAttr = gl.getAttribLocation(program, 'a_col');
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, lineColorBuffer);
      gl.enableVertexAttribArray(colorAttr);
      gl.vertexAttribPointer(colorAttr, 4, gl.FLOAT, false, 0, 0);
      gl.lineWidth(2.5);
      gl.drawArrays(gl.LINES, 0, renderData.lineCount * 2);
    }

    if (renderData.particleCount > 0) {
      const program = helper.getProgram('points')!;
      gl.useProgram(program);
      const dprUniform = gl.getUniformLocation(program, 'u_dpr');
      const resUniform = gl.getUniformLocation(program, 'u_resolution');
      gl.uniform1f(dprUniform, this._paramsRef.current.dpr);
      gl.uniform2f(resUniform, this._paramsRef.current.width, this._paramsRef.current.height);

      const gpuPing = this._paramsRef.current.currentPing;
      const activeSuffix = gpuPing === 1 ? 'b' : 'a';
      const gpuPosBuffer = helper.getBuffer(`tf_pos_${activeSuffix}`);

      let posBuffer = gpuPosBuffer ?? helper.getBuffer('pointPositions');
      if (!posBuffer) {
        posBuffer = helper.createBuffer('pointPositions', renderData.positions)!;
      } else if (!gpuPosBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, renderData.positions);
      }

      let sizeBuffer = helper.getBuffer('pointSizes');
      if (!sizeBuffer) {
        sizeBuffer = helper.createBuffer('pointSizes', renderData.sizes)!;
      } else {
        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, renderData.sizes);
      }

      let colorBuffer = helper.getBuffer('pointColors');
      if (!colorBuffer) {
        colorBuffer = helper.createBuffer('pointColors', renderData.colors)!;
      } else {
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, renderData.colors);
      }

      const posAttr = gl.getAttribLocation(program, 'a_pos');
      const sizeAttr = gl.getAttribLocation(program, 'a_size');
      const colorAttr = gl.getAttribLocation(program, 'a_color');
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.enableVertexAttribArray(sizeAttr);
      gl.vertexAttribPointer(sizeAttr, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.enableVertexAttribArray(colorAttr);
      gl.vertexAttribPointer(colorAttr, 4, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, renderData.particleCount);
    }
  }
}
