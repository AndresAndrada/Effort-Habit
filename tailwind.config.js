import tailwindcssAnimate from 'tailwindcss-animate';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './app/**/*.{js,ts,jsx,,tsx}',
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
      border: {
        border: 'hsl(var(--primary))',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        // ...otras fuentes si quieres
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        hover_primary: 'hsl(var(--hover-primary))',
        hover_secondary: 'hsl(var(--hover-secondary))',
        customColor: '#00796B',
        letterPrimary: "#53a8b6",
        letterSecondary: "#79c2d0",
        primary: {
          DEFAULT: '#ececec',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#141010',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT: '#222831',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        useHover: {
          DEFAULT: "#3a4750",
          foreground: 'hsl(var(--secondary-foreground))',
        },
        complementary: 'hsl(var(--complementary))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        banner:
          'url(https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg)',
        banner_person:
          'url(https://res.cloudinary.com/dge3tzzsh/image/upload/v1714141543/gravitad_general/022-assets/banner-recetas_g8xavu.png)',
        banner_pet:
          'url(https://res.cloudinary.com/dge3tzzsh/image/upload/v1714507838/gravitad_general/022-assets/shop/banner-shop_oqc3yd.webp)',
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
      backgroundPosition: {
        banner_sm: 'left 30% top 10%',
        banner_xs: 'left 10% top 10%',
      },
      objectPosition: {
        left_10: '15% center',
      },
      boxShadow: {
        '4xl': '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 20px rgb(0 0 0 / 0.2)',
      },
      dropShadow: {
        text: '0 1px 2px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.5s ease-out',
        'accordion-up': 'accordion-up 0.5s ease-out',
      },
      screens: {
        'sm': '480px',  // Personalizado, por ejemplo, para pantallas pequeñas de 480px
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [tailwindcssAnimate, daisyui],
}