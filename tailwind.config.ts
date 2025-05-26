// tailwind.config.ts
import { type Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'], // ✅ 컴포넌트 경로 꼭 정확해야 함
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'sans-serif'],
      },
    },
    screens: {
      pc: '1000px',
    },
  },
  plugins: [],
};
export default config;
