const tailwindConfig = {
  content: [
    './src/**/*.{ts,tsx}', // 전체로 포함시키는 게 더 확실
  ],
  safelist: ['pc:grid-cols-3'], // ✅ 이 줄을 추가!!
  theme: {
    extend: {
      screens: {
        pc: '994px',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
