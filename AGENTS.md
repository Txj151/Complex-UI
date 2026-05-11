# AGENTS.md

## 项目结构
- 单包 Vue 3 + Vite 应用（已迁移至 TypeScript）；包管理器使用 npm。
- 入口为 `src/main.ts`；全局安装 Pinia、Vue Router 和 Element Plus。
- `src/App.vue` 渲染 `@/views/formHome/home.vue`；`src/router/index.ts` 已创建但 `routes` 为空。
- 别名 `@/*` 配置在 `vite.config.ts` 和 `tsconfig.json` 中。

## 命令
- 安装依赖：`npm install`
- 开发服务器：`npm run dev`
- 生产构建：`npm run build`
- 预览构建结果：`npm run preview`
- 运行并修复全部 lint：`npm run lint`（依次执行 `lint:oxlint`、`lint:eslint`）。
- 格式化源码：`npm run format`（Prettier 只处理 `src/`）。
- 类型检查：`npm run typecheck`（`vue-tsc --noEmit`）

## 工具约束
- Node 版本必须满足 `package.json` 中的 `^20.19.0 || >=22.12.0`。
- 用 `npm run lint && npm run typecheck && npm run build` 验证改动。
- lint 命令会修改文件：`oxlint . --fix` 和 `eslint . --fix --cache`。
- 格式化规则：无分号、单引号、100 字符行宽、2 空格缩进、LF 换行。

## 注意事项
- ESLint flat config 使用 `typescript-eslint` 解析 `*.ts` 和 `*.vue`（`lang="ts"` 的 script 块），忽略 `dist`、`dist-ssr`、`coverage`。
- Oxlint 启用 `eslint`、`unicorn`、`oxc`、`vue` 插件，并将 `correctness` 类别设为 error。
