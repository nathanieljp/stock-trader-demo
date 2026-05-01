import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f172a',
        card: '#1e293b',
        border: '#334155',
        muted: '#94a3b8',
      },
    },
  },
  plugins: [],
};

export default config;
