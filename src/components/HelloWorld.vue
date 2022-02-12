<script setup lang="tsx">
import { ref } from 'vue';
import TsxComponent from './tsx';
import DefineComponentTsx from './defineComponent';
import DefineComponentSetup from './defineComponentSetup';

const props = defineProps<{ msg: string }>();

const count = ref(0);
const emit = defineEmits(['increment']);

const increment = () => {
  console.log('props.msg :', props.msg);
  count.value++;
  emit('increment', count.value);
};

const jsxC = (
  <div>
    <h2>vite jsx</h2>
    <p>vite jsx - does not update auto, must to refresh page</p>
  </div>
);
</script>

<template>
  <h1>props.msg : {{ props.msg }}</h1>
  <h1>msg : {{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="increment">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

  <jsxC />
  <TsxComponent />
  <DefineComponentTsx />
  <DefineComponentSetup />
</template>

<style lang="scss" scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

h1 {
  color: $red;
}
</style>
