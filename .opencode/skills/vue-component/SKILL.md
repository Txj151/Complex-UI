---
name: vue-component
description: 按照项目约定创建 Vue 3 SFC 组件，使用 script setup、TypeScript 和 Element Plus
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: vue3
---

## 功能说明

创建符合本项目编码标准和架构模式的 Vue 3 单文件组件（SFC）。

## 项目约定

- 所有 `<script>` 块必须使用 `<script setup lang="ts">`。
- 组件文件结构：`src/components/<组件名>/index.vue`。
- 视图页面文件结构：`src/views/<功能名>Home/home.vue`。
- 路径别名 `@/` 映射到 `src/`。
- 代码风格：无分号、单引号、100 字符行宽、2 空格缩进、LF 换行。
- Element Plus 组件全局注册，无需单独 import。
- 除非明确要求，禁止在代码中添加注释。
- 状态管理使用 `src/stores/` 中的 Pinia store。
- 导航使用 `src/router/index.ts` 中的 Vue Router。

## 组件模板

创建新组件时，遵循以下结构：

```vue
<template>
  <!-- Element Plus 组件可直接使用，无需引入 -->
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// 使用 @/ 别名引入
// import MyStore from '@/stores/myStore'
// import type { MyType } from '@/types/myType'
</script>

<style scoped>
/* 使用 scoped 样式 */
</style>
```

## 何时使用

在以下场景使用此技能：
- 创建新的 Vue 3 组件
- 添加新的视图页面
- 重构现有组件以遵循项目约定
- 使用 TypeScript 定义组件 props 和 emits

## 检查清单

1. 确定组件类型（视图页面 vs 可复用组件）
2. 按照命名约定将文件放置在正确的目录中
3. 使用 `<script setup lang="ts">`
4. 使用 `@/` 别名路径进行导入
5. 直接使用 Element Plus 组件，无需导入
6. 添加 `<style scoped>` 用于组件样式
7. 使用 `defineProps<T>()` 定义 props，使用 `defineEmits<T>()` 定义 emits
8. 如有需要，使用 `defineExpose()` 暴露公共方法