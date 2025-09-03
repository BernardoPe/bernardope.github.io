import type { RefObject } from 'react';
import type { ParticleSimulation } from './particleSimulation';
import type { WebGLHelper } from './webglHelper';

export interface ParticleSimConfig {
  particleCount: number;
  maxDistance: number;
  mouseRadius: number;
  baseSpeed: number;
  connectionThreshold: number;
}

export interface RendererParams {
  width: number;
  height: number;
  dpr: number;
  mouseX: number;
  mouseY: number;
  mouseActive: boolean;
  lastTime: number;
  frameAvg: number;
  visible: boolean;
  pendingSyncs: PendingSyncData[];
  currentPing: number;
  frameCount?: number;
}

export interface PendingSyncData {
  sync: WebGLSync | null;
  posDst: WebGLBuffer | null;
  velDst: WebGLBuffer | null;
  propsDst: WebGLBuffer | null;
  n: number;
  timestamp: number;
  priority: boolean;
}

export type ParamsRef = RefObject<RendererParams>;

export type GLHelperRef = RefObject<WebGLHelper | null>;
export type SimulationRef = RefObject<ParticleSimulation | null>;
export type CanvasRef = RefObject<HTMLCanvasElement | null>;
export type GLRef = RefObject<WebGL2RenderingContext | null>;

export interface BackgroundParams extends RendererParams {
  frameCount?: number;
}
