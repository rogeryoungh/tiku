<script setup lang="ts">
import {
  NButton,
  NH1,
  NP,
  NList,
  NListItem,
  NCard,
  useMessage,
  NH3,
  NH2
} from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import TOML from '@ltd/j-toml';
import VueMarkdown from '../components/VueMarkdown.vue';

const route = useRoute();
const message = useMessage();

const urlRef = ref(String(route.query.url || '/data/tmp.toml'));

const dataRef = ref<any>({ description: '', problems: null });

const parserData = (input: any) => {
  let data: any = TOML.parse(input, 1, '\n');
  dataRef.value.name = data.name;
  dataRef.value.url = urlRef.value;
  dataRef.value.description = data.description;
  dataRef.value.lastUpdateTime = data.lastUpdateTime;
  let problems = [];
  for (let p of data.problems) {
    problems.push({
      content: p.content,
      answer: p.answer,
      analysis: p.analysis,
      show: false
    });
  }
  dataRef.value.problems = problems;
  return 0;
};

const fetchData = (url: string) => {
  console.log(url);
  fetch(url)
    .then(res => res.text())
    .then(data => {
      parserData(data);
    })
    .catch(e => {
      console.error(e);
      message.error('加载失败');
      urlRef.value = '/data/tmp.toml';
      fetchData(urlRef.value);
    });
};

let isShowAll = ref(false);

const showAll = () => {
  isShowAll.value = !isShowAll.value;
  for (let p of dataRef.value.problems) {
    p.show = isShowAll.value;
  }
};

onMounted(() => {
  fetchData(urlRef.value);
});
</script>

<template>
  <div id="home-container">
    <div v-if="dataRef != null">
      <n-h1> {{ dataRef.name }} </n-h1>
      <n-p>
        URL：{{ dataRef.url }}，最后更新时间：{{ dataRef.lastUpdateTime }}
      </n-p>
      <vue-markdown :content="dataRef.description" />
      <n-button type="primary" @click="showAll">
        {{ isShowAll ? '全部展开' : '全部闭合' }}
      </n-button>
      <n-list v-if="dataRef.problems !== null">
        <n-list-item v-for="p of dataRef.problems" :key="p.id">
          <n-card>
            <n-h2> 题目 </n-h2>
            <vue-markdown :content="p.content" />
            <n-button secondary type="primary" @click="p.show = !p.show">
              查看解析
            </n-button>
            <n-p v-if="p.show">
              <n-h3> 答案 </n-h3>
              <vue-markdown :content="p.answer" />
            </n-p>
            <n-p v-if="p.show && p.analysis !== ''">
              <n-h3> 分析 </n-h3>
              <vue-markdown :content="p.analysis" />
            </n-p>
          </n-card>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<style lang="less" scoped>
#home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.markdown-body {
  margin-bottom: 20px;
}
</style>
