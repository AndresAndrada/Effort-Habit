import tailwindcssAnimate from 'tailwindcss-animate';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      fontFamily: {
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Legacy aliases (keep existing components working)
        letterPrimary: "#53a8b6",
        letterSecondary: "#79c2d0",
        tertiary: {
          DEFAULT: '#222831',
          foreground: '#FAFAFA',
        },
        useHover: {
          DEFAULT: "#3a4750",
          foreground: '#FAFAFA',
        },
        customColor: '#00796B',

        // Base
        'base-950': '#0A0A0A',
        'base-900': '#0F0F0F',
        'base-800': '#18181B',
        'base-700': '#27272A',
        'base-600': '#3F3F46',
        'base-500': '#52525B',
        'base-400': '#71717A',
        'base-300': '#A1A1AA',
        'base-200': '#D4D4D8',
        'base-100': '#E4E4E7',
        'base-50': '#FAFAFA',
        'base-0': '#FFFFFF',

        // Surface / Card
        'surface': '#FFFFFF',
        'surface-dark': '#18181B',
        'surface-elevated': '#FAFAFA',
        'surface-elevated-dark': '#27272A',

        // Brand - Effort Orange (signature)
        'effort': {
          50: '#FFF3F0',
          100: '#FFE5DE',
          200: '#FFC9B8',
          300: '#FF9F7F',
          400: '#FF7A4D',
          500: '#FF5E2E',
          600: '#E84D1F',
          700: '#C45A2A',
          800: '#9D4522',
          900: '#7A351D',
          950: '#401A0E',
        },

        // Teal for data/progress
        'track': {
          50: '#F0FDF9',
          100: '#CCF5F0',
          200: '#99E8DD',
          300: '#5CD6C5',
          400: '#2FC1A8',
          500: '#1AA68E',
          600: '#148A75',
          700: '#116E5E',
          800: '#10564A',
          900: '#10463C',
          950: '#082620',
        },

        // Semantic aliases for daisyUI compatibility
        // NOTE: primary/secondary are THEME backgrounds (legacy semantics:
        // primary = light surface, secondary = dark surface)
        primary: {
          DEFAULT: '#F5F2ED',
          foreground: '#0F0F0F',
          50: '#FAF8F5',
          100: '#F5F2ED',
          200: '#EBE6DD',
          300: '#DDD7CA',
          400: '#C4BBA9',
          500: '#A79E89',
          600: '#8A8270',
          700: '#6B6555',
          800: '#4C483C',
          900: '#2E2B24',
        },
        secondary: {
          DEFAULT: '#16130F',
          foreground: '#F5F2ED',
        },
        accent: {
          DEFAULT: '#C45A2A',
          foreground: '#FFFFFF',
        },
        neutral: {
          DEFAULT: '#3F3F46',
          foreground: '#FAFAFA',
        },
        'base-content': '#0F0F0F',
        info: {
          DEFAULT: '#3B82F6',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#1AA68E',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#F59E0B',
          foreground: '#0F0F0F',
        },
        error: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        'full': '9999px',
      },
      // Legacy (usado por SignIn/SignUp/Home y tarjetas antiguas)
      backgroundImage: {
        banner:
          'url(https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg)',
        login1:
          'url(https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg)',
        login2:
          'url(https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg)',
        login3:
          'url(https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg)',
        login4:
          'url(https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg)',
        register:
          'url(https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg)',
      },
      boxShadow: {
        '4xl': '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 20px rgb(0 0 0 / 0.2)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
        'card-elevated': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'ring': '0 0 0 3px rgb(196 90 42 / 0.3)',
        'ring-track': '0 0 0 3px rgb(26 166 142 / 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-xl': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
        'data-lg': ['1.5rem', { lineHeight: '1.2', fontWeight: '700', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }],
        'data': ['1.125rem', { lineHeight: '1.3', fontWeight: '600', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }],
        'data-sm': ['0.875rem', { lineHeight: '1.4', fontWeight: '600', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }],
      },
      letterSpacing: {
        'tight': '-0.03em',
        'normal': '0',
        'wide': '0.02em',
        'wider': '0.05em',
      },
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        'ring-draw': {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: '0' },
        },
        'ring-rotate': {
          '0%': { transform: 'rotate(-90deg)' },
          '100%': { transform: 'rotate(270deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'ring-draw': 'ring-draw 1.2s ease-out forwards',
        'ring-rotate': 'ring-rotate 2s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
      },
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#C45A2A',
          'primary-content': '#FFFFFF',
          secondary: '#16130F',
          'secondary-content': '#F5F2ED',
          accent: '#1AA68E',
          'accent-content': '#FFFFFF',
          neutral: '#3F3F46',
          'neutral-content': '#FAFAFA',
          'base-100': '#F5F2ED',
          'base-200': '#EBE6DD',
          'base-300': '#DDD7CA',
          'base-content': '#16130F',
          info: '#3B82F6',
          'info-content': '#FFFFFF',
          success: '#1AA68E',
          'success-content': '#FFFFFF',
          warning: '#F59E0B',
          'warning-content': '#0F0F0F',
          error: '#EF4444',
          'error-content': '#FFFFFF',
          '--rounded-box': '1rem',
          '--rounded-btn': '0.75rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.2s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '0.98',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.75rem',
        },
        dark: {
          primary: '#FF7A4D',
          'primary-content': '#FFFFFF',
          secondary: '#F5F2ED',
          'secondary-content': '#16130F',
          accent: '#5CD6C5',
          'accent-content': '#0F0F0F',
          neutral: '#27272A',
          'neutral-content': '#FAFAFA',
          'base-100': '#16130F',
          'base-200': '#1E1A16',
          'base-300': '#2A2520',
          'base-content': '#F5F2ED',
          info: '#60A5FA',
          'info-content': '#0F0F0F',
          success: '#5CD6C5',
          'success-content': '#0F0F0F',
          warning: '#FBBF24',
          'warning-content': '#0F0F0F',
          error: '#F87171',
          'error-content': '#FFFFFF',
          '--rounded-box': '1rem',
          '--rounded-btn': '0.75rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.2s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '0.98',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.75rem',
        },
      },
    ],
    logs: false,
  },
  plugins: [tailwindcssAnimate, daisyui],
}