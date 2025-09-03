import type { GLRef, GLHelperRef, SimulationRef, ParamsRef } from './types';

export class CpuRenderer {
  private _glRef: GLRef;
  private _glHelperRef: GLHelperRef;
  private _simulationRef: SimulationRef;
  private _paramsRef: ParamsRef;

  constructor(
    glRef: GLRef,
    glHelperRef: GLHelperRef,
    simulationRef: SimulationRef,
    paramsRef: ParamsRef
  ) {
    this._glRef = glRef;
    this._glHelperRef = glHelperRef;
    this._simulationRef = simulationRef;
    this._paramsRef = paramsRef;
  }

  render(dtNorm: number) {
    const params = this._paramsRef.current;
    const sim = this._simulationRef.current;
    if (!sim || !params) return false;
    sim.update(
      dtNorm,
      params.width,
      params.height,
      params.mouseX,
      params.mouseY,
      params.mouseActive
    );
    this.drawFrame();
    return true;
  }

  private drawFrame() {
    const gl = this._glRef.current!;
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
