import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDOMPurifyHTML from 'vue-dompurify-html';

import hljs from './setting/highlight';
import katex from './setting/katex';
import markdown from './setting/markdown';

createApp(App)
  .use(router)
  .use(VueDOMPurifyHTML)
  .use(hljs)
  .use(katex)
  .use(markdown)
  .mount('#app');
