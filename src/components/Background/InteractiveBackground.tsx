import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { Box, alpha, useTheme } from '@mui/material';
import { SHADERS } from './shaders';
import { WebGLHelper } from './webglHelper';
import { ParticleSimulation } from './particleSimulation';
import { createPalette, ParticleDensity } from './utils';

export const InteractiveBackground: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glHelperRef = useRef<WebGLHelper | null>(null);
  const simulationRef = useRef<ParticleSimulation | null>(null);

  const paramsRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
    mouseX: 0,
    mouseY: 0,
    mouseActive: false,
    lastTime: 0,
    frameAvg: 16.67,
    visible: true,
  });

  const rafRef = useRef<number>(0);
  const palette = useMemo(() => createPalette(theme), [theme]);

  const initGL = useCallback((gl: WebGLRenderingContext): boolean => {
    const helper = new WebGLHelper(gl);
    if (
      !helper.createProgram('points', SHADERS.POINT_VS, SHADERS.POINT_FS) ||
      !helper.createProgram('lines', SHADERS.LINE_VS, SHADERS.LINE_FS)
    ) {
      return false;
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);
    glHelperRef.current = helper;
    return true;
  }, []);

  const drawFrame = useCallback(() => {
    const gl = canvasRef.current?.getContext('webgl') as WebGLRenderingContext;
    const helper = glHelperRef.current!;
    const simulation = simulationRef.current!;
    const { width, height, dpr } = paramsRef.current;

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
      gl.uniform1f(dprUniform, dpr);
      gl.uniform2f(resUniform, width, height);

      let posBuffer = helper.getBuffer('pointPositions');
      if (!posBuffer) {
        posBuffer = helper.createBuffer('pointPositions', renderData.positions)!;
      } else {
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
  }, []);

  const updateSimulation = useCallback((dtNorm: number) => {
    const { width, height, mouseX, mouseY, mouseActive } = paramsRef.current;
    simulationRef.current?.update(dtNorm, width, height, mouseX, mouseY, mouseActive);
  }, []);

  const tick = useCallback(
    (t: number) => {
      if (!paramsRef.current.visible) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const rawDelta = paramsRef.current.lastTime === 0 ? 16.67 : t - paramsRef.current.lastTime;
      paramsRef.current.lastTime = t;
      paramsRef.current.frameAvg = paramsRef.current.frameAvg * 0.92 + rawDelta * 0.08;
      const dtNorm = rawDelta / (paramsRef.current.frameAvg || 16.67);

      updateSimulation(dtNorm);
      drawFrame();

      rafRef.current = requestAnimationFrame(tick);
    },
    [updateSimulation, drawFrame]
  );

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.floor(window.innerWidth);
    const height = Math.floor(window.innerHeight);

    paramsRef.current.width = width;
    paramsRef.current.height = height;
    paramsRef.current.dpr = dpr;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    simulationRef.current = new ParticleSimulation(
      width,
      height,
      palette,
      ParticleDensity.Balanced
    );

    const gl = canvas.getContext('webgl') as WebGLRenderingContext;
    if (gl && glHelperRef.current) {
      const renderData = simulationRef.current.getRenderData();
      glHelperRef.current.createBuffer('pointPositions', renderData.positions);
      glHelperRef.current.createBuffer('pointSizes', renderData.sizes);
      glHelperRef.current.createBuffer('pointColors', renderData.colors);
      glHelperRef.current.createBuffer('lineVertices', renderData.lineVertices);
      glHelperRef.current.createBuffer('lineColors', renderData.lineColors);
    }
  }, [palette]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    paramsRef.current.mouseX = e.clientX - rect.left;
    paramsRef.current.mouseY = e.clientY - rect.top;
    paramsRef.current.mouseActive = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    paramsRef.current.mouseActive = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = (canvas.getContext('webgl', {
      premultipliedAlpha: true,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('WebGL not supported; component will render nothing.');
      return;
    }

    if (!initGL(gl)) return;

    const onVisibilityChange = () => {
      paramsRef.current.visible = document.visibilityState !== 'hidden';
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    handleResize();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      glHelperRef.current?.cleanup();
    };
  }, [handleResize, handleMouseMove, handleMouseLeave, tick, initGL]);

  const backgroundStyle = useMemo(
    () => `
    radial-gradient(ellipse at 25% 25%, ${alpha(theme.palette.primary.main || '#10b981', 0.32)} 0%, transparent 60%),
    radial-gradient(ellipse at 75% 75%, ${alpha(theme.palette.secondary.main || '#3b82f6', 0.32)} 0%, transparent 60%),
    linear-gradient(135deg, transparent 0%, ${alpha(theme.palette.background?.default || '#000', 0.32)} 100%)
  `,
    [theme.palette]
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        background: backgroundStyle,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'auto' }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, 
            ${alpha(theme.palette.background.default, 0.15)} 0%, 
            ${alpha(theme.palette.background.default, 0.05)} 50%, 
            transparent 70%
          )`,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};
