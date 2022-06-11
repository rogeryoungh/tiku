import { App } from 'vue';
import MarkdownIt from 'markdown-it';

let md = new MarkdownIt({ html: true, linkify: true, typographer: true });

export default {
  install: (app: App) => {
    app.directive('markdown', {
      updated(el: HTMLElement) {
        if (!el.innerHTML.startsWith('<p>')) {
          el.innerHTML = md.render(el.innerHTML);
        }
      },
      mounted(el: HTMLElement) {
        if (!el.innerHTML.startsWith('<p>')) {
          el.innerHTML = md.render(el.innerHTML);
        }
      }
    });
  }
};
