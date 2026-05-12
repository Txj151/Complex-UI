<template>
  <div class="app">
    <el-menu :default-active="route.path" mode="horizontal" :ellipsis="false" router>
      <el-menu-item index="/export">JSON 导出</el-menu-item>
      <el-menu-item index="/form">动态表单</el-menu-item>
      <el-menu-item index="/table">动态表格</el-menu-item>
    </el-menu>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
