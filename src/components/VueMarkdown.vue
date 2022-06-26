<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';

import MarkdownIt from 'markdown-it';

import hljs from 'highlight.js';

let md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
});

const props = defineProps<{
  content: string | undefined;
}>();

const data = ref('');

const render = (s: string) => {
  let s1 = md.render(s);
  data.value = s1;
};

onMounted(() => {
  if (props.content !== undefined) {
    render(props.content);
  }
});

onUpdated(() => {
  if (props.content !== undefined) {
    render(props.content);
  }
});
</script>

<template>
  <article v-dompurify-html="data" v-katex class="markdown-body" />
</template>
