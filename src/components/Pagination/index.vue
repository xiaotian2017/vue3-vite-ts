<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="props.listCount"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core';
// import { withDefaults } from 'vue';

// ! defineProps 或 defineEmits 只能是要么使用运行时声明，要么使用类型声明。同时使用两种声明方式会导致编译报错
// ! defineProps 推荐用运行时声明
// ! defineEmits 推荐用类型声明

// ! 运行时声明 >>>
const props = defineProps({
  page: {
    // 页码
    type: Number,
    default: 1,
  },
  limit: {
    // 每页大小
    type: Number,
    default: 10,
  },
  listCount: {
    type: Number,
    default: 0,
  },
  loadList: {
    type: Function as PropType<(...args: any[]) => void>,
    default: () => {},
  },
});

// const emit = defineEmits(['update:page', 'update:limit']);
// 运行时声明 <<<

/*
// ! 类型声明 >>>
interface IProps {
  page: number;
  limit: number;
  listCount: number;
  loadList: (...args: any[]) => void;
}
const props = withDefaults(defineProps<IProps>(), {
  page: 1,
  limit: 10,
  listCount: 0,
  loadList: () => {},
});
*/

interface IEmitsType {
  (e: 'update:page', page: number, a?: string): void;
  (e: 'update:limit', limit: number): void;
}

const emit = defineEmits<IEmitsType>();
// 类型声明 <<<

const handleCurrentChange = (page: number) => {
  emit('update:page', page);
  props.loadList();
};

const handleSizeChange = (size: number) => {
  emit('update:page', 1, 'test');
  emit('update:limit', size);
  props.loadList();
};
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
