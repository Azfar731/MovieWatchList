/// <reference types="vitest" />
/// <reference types="vite/client"/>


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'



const ReactCompilerConfig = {
  target: '18', // Specify React version (18 or 19 for React Compiler)
};




// https://vitejs.dev/config/
export default defineConfig({
  plugins:  [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
  ],
  test:{
    environment: "jsdom",
    globals: true,
    css: true,
    setupFiles: "./tests/setup.ts"
  }
})
