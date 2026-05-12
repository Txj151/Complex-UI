---
name: feature
description: 向动态表单系统添加新功能，包括新字段类型、视图页面和路由条目
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: form-system
---

## 功能说明

指导向本 Vue 3 项目添加新功能，重点关注动态表单系统和视图页面。

## 动态表单系统架构

动态表单系统分为三层：

1. **类型定义**（`src/types/formType.ts`）：
   - `FormItem` 是可辨识联合类型，包含 7 种变体：`input`、`textarea`、`select`、`date`、`switch`、`checkboxgroup`、`radiogroup`
   - 每种变体拥有独立的 `events` 接口（如 `InputEvents`、`SelectEvents`）
   - `FormOption` 定义了 select/checkbox/radio 选项的 `label?`、`value`、`name?`
   - `RuleFormItem` 定义了验证规则，包含 `required`、`message`、`trigger`

2. **表单组件**（`src/components/formx/index.vue`）：
   - 接收 `FormInstance` prop（`FormItem` 数组）
   - 通过 `watch` 动态构建 `form` 响应式对象和 `rules` 校验规则
   - 根据 `item.type` 渲染对应的 Element Plus 表单控件
   - 通过 `defineExpose` 暴露 `validate()` 和 `resetFields()`

3. **使用页面**（`src/views/formHome/home.vue`）：
   - 组装 `FormItem[]` 配置数组
   - 通过 `FormInstance` prop 传递给 `formx` 组件
   - 处理事件和表单提交

## 添加新的字段类型

以添加 `cascader` 类型为例：

1. **在 `src/types/formType.ts` 中定义类型**：
   - 创建相应的 `events` 接口（如 `CascaderEvents`）
   - 创建继承 `FormItemBase` 的接口，设置 `type: 'cascader'`
   - 将其添加到 `FormItem` 联合类型中

2. **在 `src/components/formx/index.vue` 中添加渲染分支**：
   - 为新类型添加 `v-if` 块
   - 正确绑定 `v-model`、事件和选项
   - 使用正确的 Element Plus 组件（如 `el-cascader`）

3. **在 `src/views/formHome/home.vue` 中更新页面**：
   - 在 `Instance` 数组中添加新的 `FormItem` 条目
   - 配置 label、name、type、options、events 和 rules

## 添加新的视图页面

以添加 `tableHome` 为例：

1. 在 `src/views/tableHome/home.vue` 中创建视图
2. 在 `src/components/tablex/index.vue` 中创建组件
3. 在 `src/router/index.ts` 中添加路由：
   ```ts
   {
     path: '/table',
     name: 'table',
     component: () => import('@/views/tableHome/home.vue'),
   }
   ```
4. 在 `src/App.vue` 中添加菜单项：
   ```html
   <el-menu-item index="/table">表格</el-menu-item>
   ```

## 何时使用

在以下场景使用此技能：
- 向动态表单添加新的字段类型
- 创建带有独立路由和视图的功能模块
- 扩展表单类型系统
- 添加新的 Pinia store 用于状态管理
- 在 `src/utils/` 中创建新的工具函数

## 检查清单

1. 明确范围：新字段类型、新页面还是新模块
2. 先更新类型定义（`src/types/`）
3. 实现组件逻辑（`src/components/`）
4. 创建或更新视图页面（`src/views/`）
5. 注册路由（`src/router/index.ts`）
6. 如有需要，添加导航项（`src/App.vue`）
7. 运行验证：`npm run lint && npm run typecheck && npm run build`