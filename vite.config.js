import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/hr-career-pyramid.js',
      formats: ['iife'],
      name: 'HrCareerPyramid',
      fileName: 'hr-career-pyramid',
    },
  },
});
