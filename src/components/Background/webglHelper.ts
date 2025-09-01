export class WebGLHelper {
  private gl: WebGLRenderingContext;
  private programs: Map<string, WebGLProgram> = new Map();
  private buffers: Map<string, WebGLBuffer> = new Map();

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
  }

  createShader(source: string, type: number): WebGLShader | null {
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  createProgram(name: string, vs: string, fs: string): WebGLProgram | null {
    const vertexShader = this.createShader(vs, this.gl.VERTEX_SHADER);
    const fragmentShader = this.createShader(fs, this.gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return null;

    const program = this.gl.createProgram()!;
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }

    this.programs.set(name, program);
    return program;
  }

  createBuffer(
    name: string,
    data: ArrayBufferView,
    usage = this.gl.DYNAMIC_DRAW
  ): WebGLBuffer | null {
    const buffer = this.gl.createBuffer();
    if (!buffer) return null;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, usage);
    this.buffers.set(name, buffer);
    return buffer;
  }

  getProgram(name: string): WebGLProgram | undefined {
    return this.programs.get(name);
  }

  getBuffer(name: string): WebGLBuffer | undefined {
    return this.buffers.get(name);
  }

  cleanup() {
    this.programs.forEach((program) => this.gl.deleteProgram(program));
    this.buffers.forEach((buffer) => this.gl.deleteBuffer(buffer));
    this.programs.clear();
    this.buffers.clear();
  }
}
