import type { Theme } from '@mui/material';
import { alpha } from '@mui/material';

export const SPACING = {
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 6,
  xxxl: 8,
} as const;

export const LAYOUT = {
  sidebarWidth: {
    mobile: 0,
    tablet: 240,
    desktop: 280,
  },
  containerMaxWidth: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  sectionMinHeight: '100vh',
  cardBorderRadius: 3,
} as const;

export const ANIMATIONS = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  easing: {
    default: 'ease',
    inOut: 'ease-in-out',
    bounceIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const getGlassEffect = (theme: Theme, opacity = 0.8) => ({
  background: alpha(theme.palette.background.paper, opacity),
  backdropFilter: {
    sm: 'blur(2px)',
    md: 'blur(4px)',
  },
});

export const getTextGradient = (theme: Theme) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const getAnimatedTextGradient = (theme: Theme) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${alpha(theme.palette.primary.main, 0.8)})`,
  backgroundSize: '200% 200%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'textGradientShift 8s linear infinite',
  '@keyframes textGradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
});

export const getHoverEffect = (theme: Theme, lift = 8) => ({
  transition: `transform ${ANIMATIONS.duration.normal} ${ANIMATIONS.easing.default}, box-shadow ${ANIMATIONS.duration.normal} ${ANIMATIONS.easing.default}`,
  '&:hover': {
    transform: `translateY(-${lift}px)`,
    boxShadow: `0 ${lift * 2}px ${lift * 5}px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
});

export const commonStyles = {
  section: {
    minHeight: LAYOUT.sectionMinHeight,
    py: { xs: SPACING.xl, md: SPACING.xxxl },
    px: { xs: SPACING.lg, md: SPACING.xxxl },
  },
  card: {
    borderRadius: LAYOUT.cardBorderRadius,
    p: SPACING.lg,
  },
  buttonPrimary: {
    px: SPACING.lg,
    py: SPACING.md,
    borderRadius: 2,
    textTransform: 'none' as const,
    fontSize: '1.1rem',
  },
  iconButton: {
    width: 60,
    height: 60,
    transition: `all ${ANIMATIONS.duration.normal} ${ANIMATIONS.easing.default}`,
  },
};
