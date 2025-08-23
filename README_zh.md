# Claude Code 子代理与命令集合

[![开源](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![npm 版本](https://img.shields.io/npm/v/bwc-cli.svg)](https://www.npmjs.com/package/bwc-cli)
[![许可证: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![欢迎 PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub stars](https://img.shields.io/github/stars/davepoon/claude-code-subagents-collection.svg?style=social&label=Star)](https://github.com/davepoon/claude-code-subagents-collection)

专为 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 设计的综合性 AI 子代理和斜杠命令集合，旨在通过特定领域的专业知识和强大的自动化功能来增强开发工作流程。

## 🌐 现在提供 Web UI 和 CLI 工具！

在 [buildwithclaude.com](https://www.buildwithclaude.com) 即时浏览、搜索和安装子代理与命令

![Claude Code 子代理主页](buildwithclaude-homepage.png)

![浏览子代理](buildwithclaude-subagents.png)

![浏览命令](buildwithclaude-commands.png)

### 🚀 CLI 工具，轻松安装

使用我们的新 CLI 工具直接从终端安装和管理子代理与命令：

```bash
# 为当前用户安装 CLI
npm install -g bwc-cli

# 初始化用户配置（默认）
bwc init

# 或初始化项目配置（团队共享）
bwc init --project

# 添加子代理或命令（如果项目配置存在，则添加到项目）
bwc add --agent python-pro
bwc add --command dockerize

# 交互式浏览和安装
bwc add

# 检查配置状态
bwc status
bwc status --verify-mcp  # 深度 MCP 服务器验证

# 列出可用项目
bwc list --agents
bwc list --commands
bwc list --mcps

# 搜索特定工具
bwc search python
```

在 [buildwithclaude.com/docs/cli](https://www.buildwithclaude.com/docs/cli) 了解更多关于 CLI 工具的信息

### 🔌 MCP 服务器支持（新功能！）- Docker 和远程

通过两个提供商连接 Claude 到外部工具：
- **Docker MCP**：100+ 个容器化服务器用于本地工具
- **远程 MCP**：用于云服务的 SSE/HTTP 端点

![MCP 服务器](buildwithclaude-mcps.png)

```bash
# Docker MCP 服务器（需要 Docker Desktop）
bwc add --mcp postgres --docker-mcp --scope project
bwc add --mcp redis --docker-mcp --scope user

# 远程 MCP 服务器（SSE/HTTP）
bwc add --mcp linear-server --transport sse \
  --url https://mcp.linear.app/sse --scope project

bwc add --mcp api-server --transport http \
  --url https://api.example.com --header "Authorization: Bearer token" \
  --scope project

# 验证安装
bwc status --verify-mcp

# 按范围列出服务器
bwc list --mcps              # 所有服务器
bwc list --mcps --user       # 用户安装的
bwc list --mcps --project    # 项目安装的
```

#### 安装范围
- **本地范围**：仅限当前机器（默认）
- **用户范围**：跨所有项目的个人服务器（存储在 `~/.bwc/config.json`）
- **项目范围**：团队共享的服务器（存储在 `./bwc.config.json` 和 `./.mcp.json`）
  - Docker 服务器：通过网关配置（不在 .mcp.json 中）
  - 远程服务器：保存到 .mcp.json 用于团队共享

**注意**：当使用 `bwc init --project` 时，所有子代理和命令默认安装到项目

#### MCP 提供商比较

**Docker MCP**：
- 🔒 **容器隔离** - 最大安全性
- 🔑 **受保护的密钥** - Docker 管理 API 密钥
- ✅ **验证镜像** - Docker 签名
- 📦 **100+ 服务器** - 预配置目录

**远程 MCP（Claude CLI）**：
- ☁️ **云服务** - 直接 API 连接
- 🔐 **自定义身份验证** - 标头和令牌
- 🌍 **SSE/HTTP** - 实时和 REST
- 🤝 **团队共享** - 通过 .mcp.json

了解更多：[buildwithclaude.com/mcp-servers](https://www.buildwithclaude.com/mcp-servers)

## 概述

此存储库包含：
- **43+ 专业化子代理**：特定领域的 AI 专家，根据上下文自动调用或在需要时显式调用
- **39+ 斜杠命令**：社区贡献的命令，用于自动化任务、管理项目和增强工作流程
- **100+ MCP 服务器**：通过 Docker 容器安全连接到数据库、API 和外部工具

## 快速开始

> **💡 提示**：为了更容易的安装和管理，请使用我们的 [CLI 工具](#-cli-工具，轻松安装)（`npm install -g bwc-cli`）

### 全部安装（推荐）
```bash
# 克隆存储库
git clone https://github.com/davepoon/claude-code-subagents-collection.git
cd claude-code-subagents-collection

# 安装所有子代理
find subagents -name "*.md" -exec cp {} ~/.claude/agents/ \;

# 安装所有命令
find commands -name "*.md" -exec cp {} ~/.claude/commands/ \;

# 重启 Claude Code 以加载所有内容
```

### 仅安装子代理
```bash
# 克隆并安装子代理
git clone https://github.com/davepoon/claude-code-subagents-collection.git
find claude-code-subagents-collection/subagents -name "*.md" -exec cp {} ~/.claude/agents/ \;
```

### 仅安装命令
```bash
# 克隆并安装命令
git clone https://github.com/davepoon/claude-code-subagents-collection.git
find claude-code-subagents-collection/commands -name "*.md" -exec cp {} ~/.claude/commands/ \;
```

## 可用子代理

### 🏗️ 开发与架构
- **backend-architect** - 设计 RESTful API、微服务边界和数据库架构
- **frontend-developer** - 使用 shadcn/ui、React 服务器组件和 Tailwind CSS 构建 Next.js 应用程序
- **mobile-developer** - 开发具有原生集成的 React Native 或 Flutter 应用
- **graphql-architect** - 设计 GraphQL 架构、解析器和联合
- **directus-developer** - 使用扩展、钩子和 API 集成构建和自定义 Directus 应用程序
- **drupal-developer** - 使用自定义模块、主题和集成构建和自定义 Drupal 应用程序

### 💻 语言专家
- **python-pro** - 编写具有高级功能和优化的地道 Python 代码
- **golang-pro** - 编写具有 goroutines、通道和接口的地道 Go 代码
- **rust-pro** - 编写具有所有权、生命周期和类型安全的地道 Rust 代码
- **typescript-expert** - 编写具有高级类型系统功能的类型安全 TypeScript

### 🚀 基础设施与运维
- **devops-troubleshooter** - 调试生产问题、分析日志和修复部署故障
- **deployment-engineer** - 配置 CI/CD 管道、Docker 容器和云部署
- **cloud-architect** - 设计 AWS/Azure/GCP 基础设施并优化云成本
- **database-optimizer** - 优化 SQL 查询、设计高效索引和处理数据库迁移

### 🛡️ 质量与安全
- **code-reviewer** - 专业代码审查，关注质量、安全性和可维护性
- **security-auditor** - 审查代码漏洞并确保 OWASP 合规性
- **test-automator** - 创建包含单元测试、集成测试和端到端测试的综合测试套件
- **performance-engineer** - 分析应用程序、优化瓶颈并实施缓存策略
- **debugger** - 错误、测试失败和意外行为的调试专家

### 📊 数据与 AI
- **data-scientist** - SQL 查询、BigQuery 操作和数据洞察的数据分析专家
- **data-engineer** - 构建 ETL 管道、数据仓库和流式架构
- **ai-engineer** - 构建 LLM 应用程序、RAG 系统和提示管道
- **ml-engineer** - 实施 ML 管道、模型服务和特征工程

### 🎯 专业领域
- **api-documenter** - 创建 OpenAPI/Swagger 规范并编写开发者文档
- **payment-integration** - 集成 Stripe、PayPal 和支付处理器
- **quant-analyst** - 构建金融模型、回测交易策略和分析市场数据
- **legacy-modernizer** - 重构遗留代码库并实施渐进式现代化
- **accessibility-specialist** - 确保 Web 应用程序符合 WCAG 2.1 AA/AAA 标准
- **blockchain-developer** - 开发智能合约、DeFi 协议和 Web3 应用程序
- **game-developer** - 使用 Unity、虚幻引擎或 Web 技术构建游戏
- **ui-ux-designer** - 使用现代设计原则和可访问性标准设计用户界面和体验
- **hyperledger-fabric-developer** - 使用 Hyperledger Fabric 开发企业区块链

### 💰 加密货币交易
- **crypto-trader** - 构建加密货币交易系统并与交易所 API 集成
- **defi-strategist** - 设计和实施 DeFi 收益策略和流动性提供
- **crypto-analyst** - 执行市场分析、链上分析和情绪分析
- **arbitrage-bot** - 识别和执行跨市场的加密货币套利机会
- **crypto-risk-manager** - 为加密货币投资组合实施风险管理系统

## 安装

### 先决条件
- 安装并配置 Claude Code
- 访问 `~/.claude/agents/` 和 `~/.claude/commands/` 目录

### 通过 Web UI 快速安装

访问我们的 [Web UI](https://www.buildwithclaude.com) 浏览所有子代理和命令：
- 📋 **复制** 任何子代理或命令的 Markdown 内容，一键操作
- 💾 **下载** 单个文件
- 🔍 按类别搜索和筛选
- 📖 预览完整文档
- 🤖 浏览专业 AI 子代理
- 🔪 探索用于自动化的斜杠命令

> **注意**：Web UI 自动与主分支同步。新合并的子代理和命令会在 PR 合并后几分钟内出现。

### 手动安装步骤

1. **克隆此存储库：**
   ```bash
   git clone https://github.com/davepoon/claude-code-subagents-collection.git
   cd claude-code-subagents-collection
   ```

2. **安装子代理：**

   **选项 A：安装为用户子代理（在所有项目中可用）：**
   ```bash
   # macOS/Linux - 从 subagents 目录复制所有子代理文件
   find subagents -name "*.md" -exec cp {} ~/.claude/agents/ \;
   
   # macOS/Linux 的替代方案（如果在存储库目录中）
   cp subagents/*.md ~/.claude/agents/
   
   # Windows - 从 subagents 目录复制所有子代理文件
   for %f in (subagents\*.md) do copy "%f" %USERPROFILE%\.claude\agents\
   ```

   **选项 B：安装为项目子代理（仅适用于当前项目）：**
   ```bash
   # 首先导航到您的项目目录
   cd /path/to/your/project
   
   # 如果不存在，创建 .claude/agents 目录
   mkdir -p .claude/agents
   
   # macOS/Linux - 复制您需要的特定子代理
   find /path/to/claude-code-subagents-collection/subagents -name "*.md" -exec cp {} .claude/agents/ \;
   
   # Windows - 复制您需要的特定子代理
   mkdir .claude\agents 2>nul
   for %f in (\path\to\claude-code-subagents-collection\subagents\*.md) do copy "%f" .claude\agents\
   ```
   
   > **注意**：项目子代理仅在安装它们的特定项目中可用。当您希望为特定项目定制子代理或测试新子代理时使用此选项。

3. **安装命令：**

   **选项 A：安装为用户命令（在所有项目中可用）：**
   ```bash
   # macOS/Linux - 从 commands 目录复制所有命令文件
   find commands -name "*.md" -exec cp {} ~/.claude/commands/ \;
   
   # macOS/Linux 的替代方案（如果在存储库目录中）
   cp commands/*.md ~/.claude/commands/
   
   # Windows - 从 commands 目录复制所有命令文件
   for %f in (commands\*.md) do copy "%f" %USERPROFILE%\.claude\commands\
   ```

   **选项 B：安装为项目命令（仅适用于当前项目）：**
   ```bash
   # 首先导航到您的项目目录
   cd /path/to/your/project
   
   # 如果不存在，创建 .claude/commands 目录
   mkdir -p .claude/commands
   
   # macOS/Linux - 复制您需要的特定命令
   find /path/to/claude-code-subagents-collection/commands -name "*.md" -exec cp {} .claude/commands/ \;
   
   # Windows - 复制您需要的特定命令
   mkdir .claude\commands 2>nul
   for %f in (\path\to\claude-code-subagents-collection\commands\*.md) do copy "%f" .claude\commands\
   ```
   
   > **注意**：项目命令仅在安装它们的特定项目中可用。对于项目特定的命令或测试新命令时使用此选项。

4. **验证安装：**
   ```bash
   # 用户子代理
   ls ~/.claude/agents/
   
   # 项目子代理
   ls .claude/agents/
   
   # 用户命令
   ls ~/.claude/commands/
   
   # 项目命令
   ls .claude/commands/
   ```

5. **重启 Claude Code** 以加载新的子代理和命令

## 使用

### 使用子代理

#### 自动调用
Claude Code 根据以下因素自动委托给适当的子代理：
- 任务上下文和要求
- 您请求中的关键字
- 正在处理的文件类型
- 遇到的错误消息或问题

#### 显式调用
您可以通过两种方式显式请求特定子代理：

**方法 1：自然语言**
```
"使用代码审查员检查我最近的更改"
"让安全审计员审查这个身份验证代码"
"让性能工程师优化这个函数"
```

**方法 2：@ 提及**
```
"@agent-code-reviewer 请检查我最近的更改"
"@agent-security-auditor 你能审查这个身份验证代码吗？"
"@agent-performance-engineer 帮助优化这个数据库查询"
```

### 使用命令

使用 `/` 前缀后跟命令名称调用命令：

```
/commit                     # 使用暂存的更改创建提交
/create_pr                  # 创建拉取请求
/todo add "修复 bug"         # 添加待办事项
/docs                       # 生成文档
/code_analysis              # 分析代码质量
```

命令可以接受参数：
```
/commit --no-verify         # 跳过预提交钩子
/todo list                  # 列出所有待办事项
/create_prd "用户认证"       # 为用户认证创建 PRD
```

### 示例

#### 子代理示例

**示例 1：自动代码审查**
```
用户："我刚刚完成了用户认证功能的实现"
Claude：[在检测到新代码后自动调用代码审查员]
```

**示例 2：调试帮助**
```
用户："我在 React 组件中遇到了 TypeError"
Claude：[自动调用调试器分析错误]
```

#### 命令示例

**示例 1：创建提交**
```
用户：/commit
Claude：[分析更改，创建传统提交消息]
```

**示例 2：管理待办事项**
```
用户：/todo add "实现用户认证"
Claude：[将待办事项添加到项目跟踪]
```

**示例 3：创建文档**
```
用户：/docs
Claude：[根据项目结构生成文档]
```

## 可用命令

### 🔧 版本控制与 Git
- `/commit` - 使用传统消息创建格式良好的提交
- `/create-pr` - 创建格式正确的拉取请求
- `/fix-pr` - 修复现有拉取请求中的问题
- `/update-branch-name` - 按照约定更新分支名称

### 🧪 代码分析与测试
- `/code_analysis` - 分析代码质量并建议改进
- `/optimize` - 优化代码性能
- `/tdd` - 开始测试驱动开发工作流程

### 📥 上下文加载与准备
- `/prime` - 将项目上下文加载到 Claude 中
- `/context-prime` - 使用特定上下文准备 Claude
- `/initref` - 初始化参考文档

### 📝 文档与变更日志
- `/docs` - 生成或更新文档
- `/create-docs` - 创建新文档文件
- `/add-to-changelog` - 向变更日志添加条目

### 📋 项目与任务管理
- `/todo` - 管理项目待办事项
- `/create-prd` - 创建产品需求文档
- `/create-jtbd` - 创建 Jobs-to-be-Done 文档

[在 Web UI 上查看所有 39+ 命令](https://www.buildwithclaude.com/commands)

## 子代理格式

每个子代理遵循以下结构：

```markdown
---
name: subagent-name
description: 何时应该调用此子代理
category: category-name  # 必需 - 有效类别请参见 CONTRIBUTING.md
tools: tool1, tool2  # 可选 - 默认为所有工具
---

定义子代理角色和能力的系统提示
```

### 子代理组件：
- **name**：子代理的唯一标识符
- **description**：触发自动调用
- **category**：组织类别（例如，development-architecture，quality-security）
- **tools**：子代理可以使用的特定工具（可选）
- **system prompt**：详细说明和专业知识

## 命令格式

每个命令遵循以下结构：

```markdown
---
description: 命令功能的简要说明
category: category-name  # 必需 - 类别请参见 commands/README.md
argument-hint: <optional-args>  # 可选
allowed-tools: tool1, tool2  # 可选
model: opus|sonnet|haiku  # 可选
---

命令说明和实现详细信息
```

### 命令组件：
- **description**：简要说明（10-200 个字符）
- **category**：命令的组织类别
- **argument-hint**：预期参数（可选）
- **allowed-tools**：限制可以使用哪些工具（可选）
- **model**：指定模型偏好（可选）

## 最佳实践

### 使用子代理
1. **信任自动委托** - Claude Code 知道何时使用每个专家
2. **需要时要具体** - 为有针对性的帮助明确提及子代理
3. **结合专家** - 复杂任务可能受益于多个专家
4. **提供上下文** - 更多信息有助于子代理有效工作

### 使用命令
1. **学习常用命令** - 熟悉常用命令
2. **检查参数** - 如果不确定参数，使用 `/command_name --help`
3. **链接命令** - 一些命令配合得很好（例如，`/code_analysis` 然后 `/optimize`）
4. **项目与用户范围** - 本地安装项目特定的命令，全局安装通用命令

### 开发
1. **单一职责** - 每个子代理/命令应该在一个领域中出色
2. **清晰的描述** - 帮助用户理解何时使用每个工具
3. **通用实现** - 命令应该适用于不同的项目类型
4. **彻底测试** - 确保与各种环境的兼容性

## 故障排除

### 子代理未加载
1. 检查安装目录：
   ```bash
   ls ~/.claude/agents/          # 用户子代理
   ls .claude/agents/            # 项目子代理
   ```
2. 确保文件具有 `.md` 扩展名
3. 重启 Claude Code
4. 检查文件权限

### 命令不工作
1. 验证安装：
   ```bash
   ls ~/.claude/commands/        # 用户命令
   ls .claude/commands/          # 项目命令
   ```
2. 检查命令语法 - 使用下划线：`/create_pr` 而不是 `/create-pr`
3. 确保前置内容有效
4. 安装后重启 Claude Code

### 子代理未被调用
1. 使用显式调用进行测试
2. 检查子代理的描述
3. 验证子代理文件是有效的 Markdown
4. 查找前置内容中的语法错误

### 命令错误
1. 检查是否需要参数
2. 验证允许的工具限制
3. 确保命令有正确的实现
4. 首先用更简单的参数测试

### 性能问题
1. 避免重叠的子代理描述
2. 保持系统提示专注
3. 在适当时使用特定的工具限制
4. 仅为项目安装需要的命令/子代理

## 贡献

我们欢迎对子代理和命令的贡献！

### 贡献子代理

要添加新子代理：

1. **在 `subagents/` 中创建新文件**：`subagent-name.md`
2. **遵循格式**：
   ```markdown
   ---
   name: your-subagent
   description: 何时使用的清晰描述
   category: appropriate-category
   ---
   
   您是一个 [角色描述]...
   ```

3. **提交 PR**，包含：
   - `subagents/` 目录中的新子代理文件
   - 更新的 README 列表
   - 示例使用场景

### 贡献命令

要添加新命令：

1. **在 `commands/` 中创建新文件**：`command-name.md`
2. **遵循格式**：
   ```markdown
   ---
   description: 命令的简要说明
   category: appropriate-category
   argument-hint: <optional-args>  # 如果适用
   ---
   
   命令实现详细信息...
   ```

3. **提交 PR**，包含：
   - `commands/` 目录中的新命令文件
   - 清晰的文档和示例

### 两者的指导原则：
- 使用小写、连字符分隔的名称
- 编写清晰、具体的描述
- 选择适当的类别（参见 CONTRIBUTING.md）
- 提交前彻底测试
- 包含使用示例

**自动部署**：一旦合并，您的贡献将在几分钟内在 [Web UI](https://www.buildwithclaude.com) 上自动可用。

## 高级配置

### 自定义工具限制
一些子代理指定它们可以使用哪些工具：

```markdown
---
name: documentation-writer
tools: Read, Write, Edit
---
```

这通过限制能力来改善性能和安全性。

### 子代理链接
Claude Code 可以按顺序使用多个子代理：
1. `code-reviewer` 识别问题
2. `debugger` 调查错误
3. `security-auditor` 检查漏洞

## 社区

- **问题**：报告错误或请求功能
- **讨论**：分享使用案例和技巧
- **贡献者**：参见 [CONTRIBUTORS.md](CONTRIBUTORS.md)

## 了解更多

- [Claude Code 文档](https://docs.anthropic.com/en/docs/claude-code)
- [子代理文档](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)

## 许可证

此集合在 MIT 许可证下提供。有关详细信息，请参见 [LICENSE](LICENSE)。

---

由 Dave Poon 用 ❤️ 制作