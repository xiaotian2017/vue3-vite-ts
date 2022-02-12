<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { logout } from '@/api/common';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { SET_USER } from '@/store/types';

const router = useRouter();
const store = useStore();

const handleLogout = () => {
  ElMessageBox.confirm('确认退出吗？', '退出提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(async () => {
      await logout();
      ElMessage.success('退出成功！');

      // 清除用户登录信息
      store.commit(SET_USER, null);

      router.push({ name: 'login' });
    })
    .catch(() => {
      ElMessage.info('已取消退出');
    });
};
</script>

<style lang="scss" scoped></style>
