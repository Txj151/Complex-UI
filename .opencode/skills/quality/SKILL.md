---
name: quality
description: 按正确顺序运行 lint、typecheck、build 和 test 命令，验证代码质量
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: quality-assurance
---

## 功能说明

为本 Vue 3 + Vite + TypeScript 项目运行完整的质量保证流程，并修复发现的问题。

## 质量检查命令

按顺序运行以下命令。如有任何步骤失败，先修复问题再继续：

1. **Lint** — 先运行 OxLint，再运行 ESLint，自动修复：
   ```bash
   npm run lint
   ```
   依次执行 `lint:oxlint`（`oxlint . --fix`）和 `lint:eslint`（`eslint . --fix --cache`）。

2. **类型检查** — 使用 `vue-tsc` 验证 TypeScript 类型：
   ```bash
   npm run typecheck
   ```
   执行 `vue-tsc --noEmit`。

3. **构建** — 通过 Vite 进行生产构建：
   ```bash
   npm run build
   ```

4. **测试**（可选，如果存在测试文件）：
   ```bash
   npm run test
   ```
   执行 `vitest run`。

## 完整验证

标准验证命令：

```bash
npm run lint && npm run typecheck && npm run build
```

## 常见问题及修复

- **ESLint 错误**：Linter 会自动修复大部分问题。如 `npm run lint` 后仍有错误，手动修复。
- **TypeScript 错误**：检查所有导入是否正确使用 `@/` 路径别名。确保 `defineProps` 和 `defineEmits` 具有正确的 TypeScript 泛型。
- **构建错误**：通常由 TypeScript 问题引起。先修复 typecheck 错误。

## 代码风格规则

- 无分号
- 字符串使用单引号
- 最大行宽 100 字符
- 2 空格缩进
- LF 换行
- 除非明确要求，否则不添加注释

## 何时使用

在以下场景使用此技能：
- 完成代码修改后验证一切正常
- 提交更改前确保代码质量
- 排查构建失败问题
- 需要解决类型错误时
- 需要修复 lint 错误时