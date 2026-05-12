# AGENTS.md

## 语言规则

除代码（命令、配置、代码块）外，其余所有回答一律使用中文。

## 项目概述

Vue 3 + Vite + TypeScript 学习项目，使用 Pinia 状态管理、Vue Router 路由、Element Plus UI 框架。项目包含动态表单和 JSON 导出两大功能模块。

## 项目结构

```
src/
├── main.ts                  # 入口，全局注册 Pinia / Router / Element Plus
├── App.vue                  # 根组件，水平菜单 + router-view
├── router/index.ts          # 路由定义 (/export, /form)
├── stores/counter.ts        # Pinia 示例 store
├── types/formType.ts        # 表单类型定义 (FormItem 联合类型、枚举等)
├── utils/
│   └── export.ts            # JSON/TXT 文件导出工具函数
│   └── __tests__/           # vitest 测试
├── components/
│   ├── formx/index.vue      # 动态表单核心组件
│   ├── slot/                # Slot 示例组件
│   ├── watch/index.vue      # Watch 示例组件
│   ├── vmodel/useVmodel.vue # v-model 示例
│   └── templatex/index.vue  # Template 示例
└── views/
    ├── exportHome/home.vue   # JSON 导出页面
    ├── formHome/home.vue     # 动态表单页面
    ├── slotHome/home.vue
    ├── watchHome/home.vue
    ├── templateHome/home.vue
    └── vmodelHome/home.vue
```

## 代码约定

- 所有 `<script>` 块使用 `<script setup lang="ts">`。
- 组件文件名使用 PascalCase 或 camelCase 目录名 + `index.vue`。
- 视图页面统一在 `src/views/<feature>Home/home.vue`。
- 类型定义集中在 `src/types/`。
- 工具函数集中在 `src/utils/`。
- Pinia store 集中在 `src/stores/`。
- 路径别名 `@/` 映射到 `src/`。
- 无分号、单引号、100 字符行宽、2 空格缩进、LF 换行（遵循 `.editorconfig` + `.prettierrc.json`）。
- 禁止在代码中添加注释，除非用户明确要求。
- Element Plus 组件直接使用全局注册（无须单独 import）。

## 命令

- 安装依赖：`npm install`
- 开发服务器：`npm run dev`
- 生产构建：`npm run build`
- 预览构建结果：`npm run preview`
- 运行全部 lint：`npm run lint`（依次 `lint:oxlint` → `lint:eslint`，会修改文件）
- 格式化源码：`npm run format`（Prettier 只处理 `src/`）
- 类型检查：`npm run typecheck`（`vue-tsc --noEmit`）
- 运行测试：`npm run test`（`vitest run`）
- 监听测试：`npm run test:watch`

## 验证改动

完成任何改动后，执行以下命令确保没有问题：

```bash
npm run lint && npm run typecheck && npm run build
```

## 工具约束

- Node 版本必须满足 `package.json` 中的 `^20.19.0 || >=22.12.0`。
- ESLint flat config 使用 `typescript-eslint` 解析 `*.ts` 和 `*..vue`（`lang="ts"` 的 script 块），忽略 `dist`、`dist-ssr`、`coverage`。
- Oxlint 启用 `eslint`、`unicorn`、`oxc`、`vue` 插件，并将 `correctness` 类别设为 error。
- Lint 命令会自动修复文件：`oxlint . --fix` 和 `eslint . --fix --cache`。

## 动态表单架构

动态表单系统由以下部分组成：

1. **`FormItem` 联合类型**（`src/types/formType.ts`）：定义了 `input`、`textarea`、`select`、`date`、`switch`、`checkboxgroup`、`radiogroup` 七种字段类型，每种类型有独立的 `events` 和 `options` 定义。
2. **`formx` 组件**（`src/components/formx/index.vue`）：接收 `FormInstance` 数组 props，内部通过 `watch` 动态构建 `form` 响应式对象和 `rules` 校验规则，通过 `defineExpose` 暴露 `validate()` 和 `resetFields()`。
3. **页面**：在 `views/formHome/home.vue` 中组装 `FormItem[]` 配置并传入组件。

添加新的字段类型时需要：在 `formType.ts` 中新增接口 → 扩展 `FormItem` 联合类型 → 在 `formx/index.vue` 模板中新增对应渲染分支。

## MCP 使用

- 使用 `context7` 搜索 Vue 3、Element Plus、Pinia、Vue Router 等库的最新文档。
- 使用 `gh_grep` 搜索 GitHub 上的代码示例，确认用法和最佳实践。

## Agent 使用

- 代码审查时使用 `@code-reviewer` 子代理，它会只读检查代码质量、TypeScript 类型和 Element Plus 使用规范。
- 需要搜索文档时使用 `context7` 工具。
- 需要搜索 GitHub 代码示例时使用 `gh_grep` 工具。