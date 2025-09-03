export const SHADERS = {
  PARTICLE_UPDATE_VS_ES3: `#version 300 es
      precision highp float;
      in vec2 a_position;
      in vec2 a_velocity;
      in vec4 a_properties; // [size, opacity, baseOpacity, life]
      in vec2 a_basePosition;
      in vec2 a_noiseSeed;
    
      uniform float u_time;
      uniform float u_deltaTime;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouseActive;
      uniform float u_mouseRadius;
      uniform float u_baseSpeed;
      uniform vec4 u_physics; // [friction, wanderStrength, mouseRepelStrength, maxSpeed]
    
      out vec2 v_position;
      out vec2 v_velocity;
      out vec4 v_properties;

      // Noise functions
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
    
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
    
      float fbm(vec2 st, int octaves) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          if (i >= octaves) break;
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
    
      void main() {
        vec2 pos = a_position;
        vec2 vel = a_velocity;
        float size = a_properties.x;
        float opacity = a_properties.y;
        float baseOpacity = a_properties.z;
        float life = a_properties.w;
      
        // Update life
        life += u_deltaTime * 0.03;
      
        // Energy calculation
        float energy = 0.8 + 0.2 * sin(life * 0.1);
      
        // Noise-based wandering
        float sampleScale = 0.008;
        vec2 noisePos = life * sampleScale + a_noiseSeed;
        float sx = fbm(noisePos, 4) * 2.0 - 1.0;
        float sy = fbm(noisePos + vec2(100.0), 4) * 2.0 - 1.0;
      
        vel.x += sx * u_physics.y * energy * 0.8;
        vel.y += sy * u_physics.y * energy * 0.8;
      
        // Mouse interaction
        if (u_mouseActive > 0.5) {
          vec2 mouseDir = u_mouse - pos;
          float mouseDist = length(mouseDir);
        
          if (mouseDist < u_mouseRadius && mouseDist > 0.0) {
            float force = (u_mouseRadius - mouseDist) / u_mouseRadius;
            vec2 repelDir = normalize(mouseDir);
            vel -= repelDir * force * u_physics.z;
            opacity = min(255.0, baseOpacity + force * 76.0);
            energy = min(1.0, energy + force * 0.1);
          } else {
            opacity += (baseOpacity - opacity) * 0.03;
            energy += (0.8 - energy) * 0.01;
          }
        } else {
          opacity += (baseOpacity - opacity) * 0.03;
          energy += (0.8 - energy) * 0.01;
        }
      
        // Velocity clamping
        float maxV = u_physics.w * energy;
        vel = clamp(vel, vec2(-maxV), vec2(maxV));
      
        // Position update
        pos += vel * u_baseSpeed * u_deltaTime;
      
        // Apply friction
        vel *= u_physics.x;
      
        // Boundary wrapping
        float margin = 15.0;
        if (pos.x < -margin) {
          pos.x = u_resolution.x + margin;
          vel.x += (random(vec2(life, pos.y)) - 0.5) * 0.05;
        } else if (pos.x > u_resolution.x + margin) {
          pos.x = -margin;
          vel.x += (random(vec2(life, pos.y)) - 0.5) * 0.05;
        }
      
        if (pos.y < -margin) {
          pos.y = u_resolution.y + margin;
          vel.y += (random(vec2(pos.x, life)) - 0.5) * 0.05;
        } else if (pos.y > u_resolution.y + margin) {
          pos.y = -margin;
          vel.y += (random(vec2(pos.x, life)) - 0.5) * 0.05;
        }
      
        // Output updated values
        v_position = pos;
        v_velocity = vel;
        v_properties = vec4(size, opacity, baseOpacity, life);
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      }`,

  PARTICLE_UPDATE_FS_ES3: `#version 300 es
      precision mediump float;
      out vec4 outColor;
      void main() { outColor = vec4(0.0); }
    `,

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
