---
name: git
description: 执行 Git 版本控制操作，包括提交、分支管理、标签、代码审查准备等
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: version-control
---

## 功能说明

为本项目执行 Git 版本控制操作，遵循项目的提交规范和分支策略。

## 项目 Git 规约

- 仓库根目录：`D:\my-vue\vue-study`
- 所有文件使用 LF 换行（`.gitattributes` 已配置）
- `node_modules`、`dist`、`coverage`、`.eslintcache` 等已在 `.gitignore` 中忽略
- 提交信息使用中文描述，格式：`--<简短描述>`（如 `--封装form`、`--初始化提交`）
- 禁止提交前运行 `npm run lint`

## 常用操作

### 查看状态

```bash
git status
git diff
git diff --staged
```

### 提交

提交前务必执行质量检查：

```bash
npm run lint && npm run typecheck && npm run build
```

检查通过后提交：

```bash
git add -A
git commit -m "--描述信息"
```

### 提交信息规范

- 格式：`--<简短描述>`，使用中文
- 示例：
  - `--新增级联选择器字段类型`
  - `--修复表单验证重置问题`
  - `--重构导出工具函数`
  - `--初始化项目配置`

### 撤销

```bash
# 撤销工作区改动
git checkout -- <文件>

# 撤销暂存区改动
git reset HEAD <文件>

# 撤销最近一次提交（保留改动）
git reset --soft HEAD~1

# 撤销最近一次提交（丢弃改动）
git reset --hard HEAD~1
```

### 分支

```bash
# 创建并切换到新分支
git checkout -b feature/<功能名>

# 查看分支列表
git branch -a

# 合并分支
git checkout main
git merge feature/<功能名>

# 删除已合并分支
git branch -d feature/<功能名>
```

### 日志

```bash
git log --oneline -20
git log --graph --oneline --all
```

## 质量检查流程

在提交前必须执行完整检查：

```bash
npm run lint
if ($?) { npm run typecheck }
if ($?) { npm run build }
```

检查全部通过后才执行 `git commit`。如有失败，先修复再重试。

## 何时使用

在以下场景使用此技能：
- 提交代码改动
- 创建功能分支
- 查看仓库状态和历史
- 准备 Pull Request
- 撤销错误的改动
- 合并分支和解决冲突
- 创建版本标签