import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDOMPurifyHTML from 'vue-dompurify-html';

import katex from './setting/katex';

createApp(App)
  .use(router)
  .use(VueDOMPurifyHTML)
  .use(katex)
  .mount('#app');
