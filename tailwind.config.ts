import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#EA580C',
          600: '#D9531E', // Naadu Signature Terracotta
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        sand: {
          50: '#FCFBF9',
          100: '#FAF7F2', // Warm Ivory / Sand Background
          200: '#F4EEE5',
          300: '#E7DDD0',
          400: '#D2C3AF',
          500: '#A89781',
          900: '#2C251E',
        },
        coastal: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          800: '#1C1917',
          900: '#141210', // Deep Warm Charcoal
          950: '#0C0A09',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        veg: '#16A34A',
        nonveg: '#DC2626',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 20px 40px -10px rgba(217, 83, 30, 0.12), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        glow: '0 0 25px rgba(217, 83, 30, 0.35)',
      },
    },
  },
  plugins: [],
};
export default config;
