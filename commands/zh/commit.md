---
description: 使用传统提交消息和表情符号创建格式良好的 git 提交
category: version-control-git
allowed-tools: Bash, Read, Glob
---

# Claude 命令：提交

此命令帮助您创建格式良好的提交，使用传统提交消息和表情符号。

## 使用方法

创建提交，只需输入：
```
/commit
```

或带选项：
```
/commit --no-verify
```

## 此命令的功能

1. 除非使用 `--no-verify` 指定，否则自动运行预提交检查：
   - 检测包管理器（npm、pnpm、yarn、bun）并运行适当的命令
   - 如果可用，运行 lint/format 检查
   - 如果存在构建脚本，运行构建验证
   - 如果存在生成脚本，更新文档
2. 使用 `git status` 检查哪些文件已暂存
3. 如果暂存了 0 个文件，自动使用 `git add` 添加所有修改和新文件
4. 执行 `git diff` 以了解正在提交的更改
5. 分析差异以确定是否存在多个不同的逻辑更改
6. 如果检测到多个不同的更改，建议将提交拆分为多个较小的提交
7. 对于每个提交（或如果不拆分则为单个提交），使用表情符号传统提交格式创建提交消息

## 提交的最佳实践

- **提交前验证**：确保代码已 lint、正确构建并更新了文档
- **原子性提交**：每个提交应包含服务于单一目的的相关更改
- **拆分大型更改**：如果更改涉及多个关注点，将它们拆分为单独的提交
- **传统提交格式**：使用格式 `<type>: <description>`，其中 type 是以下之一：
  - `feat`：新功能
  - `fix`：错误修复
  - `docs`：文档更改
  - `style`：代码样式更改（格式等）
  - `refactor`：既不修复错误也不添加功能的代码更改
  - `perf`：性能改进
  - `test`：添加或修复测试
  - `chore`：对构建过程、工具等的更改
- **现在时，命令式语气**：将提交消息写成命令（例如，"添加功能"而非"已添加功能"）
- **简洁的第一行**：保持第一行在 72 个字符以下
- **表情符号**：每个提交类型都配有适当的表情符号：
  - ✨ `feat`：新功能
  - 🐛 `fix`：错误修复
  - 📚 `docs`：文档
  - 💎 `style`：格式、缺少分号等；无生产代码更改
  - 📦 `refactor`：重构生产代码
  - 🚀 `perf`：性能优化
  - 🚨 `test`：添加测试、重构测试；无生产代码更改
  - 🔧 `chore`：更新构建任务等；无生产代码更改

## 示例

### 基本提交
```
用户：/commit
```

系统将：
1. 检查预提交钩子
2. 分析暂存的更改
3. 创建适当的提交消息

### 跳过预提交钩子
```
用户：/commit --no-verify
```

系统将跳过所有预提交检查并直接创建提交。

## 预提交检查

命令自动检测并运行以下检查（除非使用 --no-verify）：

### 包管理器检测
- **npm**：运行 `npm run lint`、`npm run format`、`npm run build`（如果存在）
- **pnpm**：运行 `pnpm lint`、`pnpm format`、`pnpm build`（如果存在）
- **yarn**：运行 `yarn lint`、`yarn format`、`yarn build`（如果存在）
- **bun**：运行 `bun run lint`、`bun run format`、`bun run build`（如果存在）

### 构建验证
检查并运行（如果存在）：
- `build` 脚本
- `typecheck` 脚本
- `generate` 或 `docs:generate` 脚本

## 提交消息格式

生成的提交消息遵循以下格式：

```
<emoji> <type>: <description>

[可选的详细说明]

🤖 使用 Claude Code 生成
```

### 示例输出
```
✨ feat: add user authentication system

Implements JWT-based authentication with refresh tokens
- Add login/logout endpoints
- Create middleware for protected routes
- Add user session management

🤖 使用 Claude Code 生成
```

## 故障排除

### 预提交失败
如果预提交检查失败：
1. 查看错误消息
2. 修复 lint/格式问题
3. 确保构建成功
4. 重新运行 `/commit`

### 无更改可提交
如果没有暂存更改：
- 命令将自动暂存所有修改的文件
- 如果仍然没有更改，将显示消息

### 大型提交
如果检测到多个不相关的更改：
- 系统将建议拆分提交
- 考虑使用 `git add -p` 进行部分暂存
- 或手动暂存相关文件并多次运行 `/commit`