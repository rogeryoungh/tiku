import { App } from 'vue';
import MarkdownIt from 'markdown-it';

let md = new MarkdownIt({ html: true, linkify: true, typographer: true });

export default {
  install: (app: App) => {
    app.directive('markdown', {
      updated(el: HTMLElement) {
        let data = el.innerHTML;
        if (!data.startsWith('<p>')) {
          data = data.replace('&gt;', '>');
          el.innerHTML = md.render(data);
        }
      },
      mounted(el: HTMLElement) {
        let data = el.innerHTML;
        if (!data.startsWith('<p>')) {
          data = data.replace('&gt;', '>');
          el.innerHTML = md.render(data);
        }
      }
    });
  }
};
