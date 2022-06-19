import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import externalGlobals from 'rollup-plugin-external-globals';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), visualizer()],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        'highlight.js',
        'markdown-it',
        'katex',
        'katex/contrib/auto-render'
      ],
      plugins: [
        externalGlobals({
          'highlight.js': 'hljs',
          'markdown-it': 'markdownit',
          katex: 'katex',
          'katex/contrib/auto-render': 'renderMathInElement'
        })
      ]
    }
  }
});
