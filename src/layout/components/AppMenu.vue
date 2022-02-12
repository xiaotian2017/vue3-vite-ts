<template>
  <el-menu
    active-text-color="#3585f0"
    background-color="#304156"
    class="aside-menu-vertical"
    default-active="2"
    text-color="#fff"
    router
    :collapse="$store.state.isCollapse"
  >
    <el-menu-item index="/">
      <el-icon><Menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Sell /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">商品列表</el-menu-item>
      <el-menu-item index="/product/add_product">添加商品</el-menu-item>
      <el-menu-item index="/product/product_classify">商品分类</el-menu-item>
      <el-menu-item index="/product/product_attr">商品规格</el-menu-item>
      <el-menu-item index="/product/product_reply">商品评论</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><List /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">订单列表</el-menu-item>
      <el-menu-item index="/order/offline">订单</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><turn-off /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/admin">管理员</el-menu-item>
      <el-menu-item index="/permission/role">角色</el-menu-item>
      <el-menu-item index="/permission/rule">规则</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <el-icon><picture-filled /></el-icon>
      <span>媒体</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
</script>

<style lang="scss" scoped>
.aside-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
