export const theme = {
  colors: {
    ocean: {
      primary: '#006994',
      primaryLight: '#0088a3',
      primaryLighter: '#00a8cc',
      accent: '#4ecdc4',
      accentLight: '#7dd3cc',
      dark: '#005a7a',
      darker: '#003d52',
    },
    neutrals: {
      bgLight: '#f0f9ff',
      bgLighter: '#e0f2fe',
      bgSoft: '#e5f4f8',
      white: '#ffffff',
    },
    text: {
      primary: '#003d52',
      secondary: '#005a7a',
      muted: '#6b7280',
      light: '#9ca3af',
    },
    gradients: {
      ocean: 'linear-gradient(135deg, #006994 0%, #0088a3 50%, #00a8cc 100%)',
      oceanLight: 'linear-gradient(135deg, #0088a3 0%, #00a8cc 100%)',
      oceanAccent: 'linear-gradient(135deg, #4ecdc4 0%, #7dd3cc 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 105, 148, 0.1)',
      md: '0 4px 16px rgba(0, 105, 148, 0.15)',
      lg: '0 8px 24px rgba(0, 105, 148, 0.2)',
      xl: '0 12px 32px rgba(0, 105, 148, 0.25)',
    },
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '50%',
  },
  transitions: {
    default: 'all 0.3s ease',
    cubic: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export type Theme = typeof theme;
