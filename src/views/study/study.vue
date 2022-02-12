<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <h1>vue-router</h1>
  <ul>
    <li>
      <router-link :to="{ name: 'home' }">首页</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'login' }">Login</router-link>
    </li>
    <li>
      $route.push({ name: 'home'}):
      <button @click="$router.push({ name: 'home' })">首页</button>
    </li>
    <li>
      <p>$route.query.name: {{ $route.query.name }}</p>
    </li>
  </ul>

  <div>
    <h1>Vuex@4</h1>
    <div>
      <p>$store.state.user.id: {{ $store.state.user?.id }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue';
import { useStore } from 'vuex';
import { key } from '@/store/';

const store = useStore(key);
console.log('store returned by useStore in setup :', store);
console.log('store.state.user?.id :', store.state.user?.id);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
