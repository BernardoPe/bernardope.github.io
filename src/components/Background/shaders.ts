export const SHADERS = {
  POINT_VS: `
    attribute vec2 a_pos;
    attribute float a_size;
    attribute vec4 a_color;
    uniform float u_dpr;
    uniform vec2 u_resolution;
    varying vec4 v_color;
    void main() {
      v_color = a_color;
      vec2 clip = (a_pos / u_resolution) * 2.0 - 1.0;
      gl_Position = vec4(clip * vec2(1.0, -1.0), 0.0, 1.0);
      gl_PointSize = a_size * u_dpr;
    }`,

  POINT_FS: `
    precision mediump float;
    varying vec4 v_color;
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv) * 2.0;
      float outerGlow = smoothstep(1.0, 0.4, d);
      float innerGlow = smoothstep(0.6, 0.1, d);
      float core = smoothstep(0.2, 0.0, d);
      float alpha = v_color.a * (outerGlow * 0.3 + innerGlow * 0.5 + core * 0.9);
      vec3 color = v_color.rgb + vec3(0.1, 0.05, 0.15) * (1.0 - d) * innerGlow;
      gl_FragColor = vec4(color, alpha);
    }`,

  LINE_VS: `
    attribute vec2 a_pos;
    attribute vec4 a_col;
    uniform vec2 u_resolution;
    varying vec4 v_col;
    void main() {
      v_col = a_col;
      vec2 clip = (a_pos / u_resolution) * 2.0 - 1.0;
      gl_Position = vec4(clip * vec2(1.0, -1.0), 0.0, 1.0);
    }`,

  LINE_FS: `
    precision mediump float;
    varying vec4 v_col;
    void main() {
      vec4 color = v_col;
      color.rgb *= 1.0 + sin(gl_FragCoord.x * 0.01 + gl_FragCoord.y * 0.013) * 0.1;
      gl_FragColor = color;
    }`,
} as const;
