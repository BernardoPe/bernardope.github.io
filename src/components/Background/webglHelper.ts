export class WebGLHelper {
  private gl: WebGLRenderingContext | WebGL2RenderingContext;
  private isWebGL2: boolean;
  private programs: Map<string, WebGLProgram> = new Map();
  private buffers: Map<string, WebGLBuffer> = new Map();
  private transformFeedbacks: Map<string, WebGLTransformFeedback> = new Map();

  constructor(gl: WebGLRenderingContext | WebGL2RenderingContext) {
    this.gl = gl;
    this.isWebGL2 = typeof (gl as WebGL2RenderingContext).createTransformFeedback === 'function';
  }

  createShader(source: string, type: number): WebGLShader | null {
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  createProgram(
    name: string,
    vs: string,
    fs: string,
    transformFeedbackVaryings?: string[],
    varyingsBufferMode: number = (this.gl as WebGL2RenderingContext).INTERLEAVED_ATTRIBS
  ): WebGLProgram | null {
    const vertexShader = this.createShader(vs, this.gl.VERTEX_SHADER);
    const fragmentShader = this.createShader(fs, this.gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return null;

    const program = this.gl.createProgram()!;
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);

    // If WebGL2 and transform feedback varyings provided, set them before linking
    if (this.isWebGL2 && transformFeedbackVaryings && transformFeedbackVaryings.length > 0) {
      (this.gl as WebGL2RenderingContext).transformFeedbackVaryings(
        program as WebGLProgram,
        transformFeedbackVaryings,
        varyingsBufferMode
      );
    }

    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program link error:', this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }

    this.programs.set(name, program);
    return program;
  }

  createBuffer(name: string, data: ArrayBufferView, usage?: number): WebGLBuffer | null {
    const buffer = this.gl.createBuffer();
    if (!buffer) return null;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    const use =
      usage ??
      (this.isWebGL2 ? (this.gl as WebGL2RenderingContext).STREAM_COPY : this.gl.DYNAMIC_DRAW);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, use);
    this.buffers.set(name, buffer);
    return buffer;
  }

  createTransformFeedback(name: string): WebGLTransformFeedback | null {
    if (!this.isWebGL2) return null;
    const tf = (this.gl as WebGL2RenderingContext).createTransformFeedback();
    if (!tf) return null;
    this.transformFeedbacks.set(name, tf);
    return tf;
  }

  getTransformFeedback(name: string): WebGLTransformFeedback | undefined {
    return this.transformFeedbacks.get(name);
  }

  getProgram(name: string): WebGLProgram | undefined {
    return this.programs.get(name);
  }

  getBuffer(name: string): WebGLBuffer | undefined {
    return this.buffers.get(name);
  }

  cleanup() {
    this.programs.clear();
    this.buffers.clear();
  }
}
