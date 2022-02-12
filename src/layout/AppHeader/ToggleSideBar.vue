<template>
  <el-icon @click="handleCollapse"
    ><fold v-show="!store.state.isCollapse" />
    <expand v-show="store.state.isCollapse" />
  </el-icon>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { SET_IS_COLLAPSE } from '@/store/types';

const store = useStore();

const handleCollapse = () => {
  return store.commit(SET_IS_COLLAPSE, !store.state.isCollapse);
};
</script>
