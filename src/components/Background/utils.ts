// Simple theme interface to replace Material-UI dependency
interface Theme {
  palette: {
    mode: 'light' | 'dark';
    primary: {
      main: string;
      light: string;
    };
    secondary: {
      main: string;
      light: string;
    };
    background: {
      default: string;
      paper: string;
    };
  };
}

export interface ParticleSimConfig {
  particleCount: number;
  maxDistance: number;
  mouseRadius: number;
  baseSpeed: number;
  connectionThreshold: number;
}

export const ParticleDensity = {
  Subtle: 'subtle',
  Balanced: 'balanced',
  Busy: 'busy',
} as const;

export type ParticleDensity = (typeof ParticleDensity)[keyof typeof ParticleDensity];

export const PHYSICS = {
  FRICTION: 0.998,
  WANDER_STRENGTH: 0.012,
  PERIODIC_STRENGTH: 0.008,
  MOUSE_REPEL_STRENGTH: 0.6,
  PARTICLE_REPEL_RADIUS: 30,
  PARTICLE_REPEL_STRENGTH: 0.04,
  MIN_SPEED: 0.01,
  MAX_SPEED: 0.18,
  LIFE_INCREMENT: 0.03,
  OPACITY_LERP_SPEED: 0.03,
} as const;

export const getConfig = (
  width: number,
  height: number,
  densityPreset: ParticleDensity
): ParticleSimConfig => {
  const area = width * height;
  const resScale = Math.sqrt(area / (1920 * 1080));
  const presetFactor =
    densityPreset === ParticleDensity.Subtle
      ? 0.6
      : densityPreset === ParticleDensity.Busy
        ? 1.5
        : 1.0;

  if (width <= 768) {
    const base = Math.floor(150 * resScale);
    return {
      particleCount: Math.max(60, Math.floor(base * presetFactor)),
      maxDistance: 100,
      mouseRadius: 80,
      baseSpeed: 0.12,
      connectionThreshold: 2,
    };
  } else if (width <= 1200) {
    const base = Math.floor(150 * resScale);
    return {
      particleCount: Math.max(100, Math.floor(base * presetFactor)),
      maxDistance: 100,
      mouseRadius: 100,
      baseSpeed: 0.12,
      connectionThreshold: 3,
    };
  } else if (width <= 1920) {
    const base = Math.floor(350 * resScale);
    return {
      particleCount: Math.max(150, Math.floor(base * presetFactor)),
      maxDistance: 100,
      mouseRadius: 120,
      baseSpeed: 0.12,
      connectionThreshold: 4,
    };
  } else {
    const base = Math.floor(450 * resScale);
    return {
      particleCount: Math.max(200, Math.floor(base * presetFactor)),
      maxDistance: 120,
      mouseRadius: 150,
      baseSpeed: 0.18,
      connectionThreshold: 5,
    };
  }
};

export const createPalette = (theme: Theme) => [
  { color: theme.palette?.primary?.main || '#10b981', a: 0.7 },
  { color: theme.palette?.secondary?.main || '#3b82f6', a: 0.7 },
  { color: theme.palette?.primary?.light || '#34d399', a: 0.6 },
  { color: theme.palette?.secondary?.light || '#60a5fa', a: 0.6 },
  { color: '#ffffff', a: 0.5 },
];

export const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  const expandedHex =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const bigint = parseInt(expandedHex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
