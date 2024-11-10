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
        'crystal-blue': '#54D5EB',
        'pastel-lilac': '#E2C6E6',
        'light-moss-green': '#9FC363',
        'golden-yellow': '#FFCC00',
        'foggy-gray': '#808080',
        'emerald-green': '#2BB673',
        'cotton-candy-pink': '#F3CCDE',
        'solar-orange': '#FFA500',
      },
      spacing: {
        '7/10': '70%',
        '19/200': '9.5%',
      },
    },
  },
  plugins: [],
} satisfies Config;
