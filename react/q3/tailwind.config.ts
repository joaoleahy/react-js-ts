import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './**/*.{jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'crystal-blue': '#9CF0F4',
        'pastel-lilac': '#D7C8E1',
        'light-moss-green': '#9BC26A',
        'golden-yellow': '#FAC648',
        'foggy-gray': '#D1D1D1',
        'emerald-green': '#00B576',
        'cotton-candy-pink': '#FBE7F1',
        'solar-orange': '#FEA630',
      },
      spacing: {
        '7/10': '70%',
        '19/200': '9.5%',
      },
    },
  },
  plugins: [],
} satisfies Config;
