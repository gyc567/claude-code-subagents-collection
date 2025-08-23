# 贡献给 Claude Code 子代理与命令集合

感谢您对贡献 Claude Code 子代理与命令集合的兴趣！本指南将帮助您创建高质量的子代理和命令，与 Claude Code 无缝集成。

## 目录
- [开始之前](#开始之前)
- [贡献子代理](#贡献子代理)
  - [创建新子代理](#创建新子代理)
  - [子代理结构](#子代理结构)
  - [测试您的子代理](#测试您的子代理)
- [贡献命令](#贡献命令)
  - [创建新命令](#创建新命令)
  - [命令结构](#命令结构)
  - [测试您的命令](#测试您的命令)
- [文件命名约定](#文件命名约定)
- [编写指南](#编写指南)
- [提交拉取请求](#提交拉取请求)
- [自动检查的工作原理](#自动检查的工作原理)
- [行为准则](#行为准则)

## 开始之前

1. **阅读文档**：
   - 子代理：[Claude Code 的子代理文档](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
   - 命令：[Claude Code 的斜杠命令文档](https://docs.anthropic.com/en/docs/claude-code/slash-commands)
2. **检查现有贡献**：确保您的想法与现有子代理或命令没有显著重叠
3. **每个贡献一个目的**：每个子代理或命令应该有一个单一、清晰的职责

## 贡献子代理

### 创建新子代理

1. **在 `subagents/` 目录中创建您的文件**
2. **适当命名**：`your-subagent-name.md`
3. **遵循所需结构**（见下文）
4. **提交前彻底测试**

### 子代理结构

每个子代理必须遵循这个确切的结构：

```markdown
---
name: subagent-name
description: 何时应该调用此子代理的清晰、具体描述
category: category-name  # 必需 - 见下面的有效类别
tools: tool1, tool2  # 可选 - 省略则使用所有工具
---

您是一个 [角色/专业知识描述]。

当被调用时：
1. [第一个动作 - 分析/理解需求]
2. [第二个动作 - 识别模式/结构]
3. [第三个动作 - 规划方法]
4. [第四个动作 - 开始实施]
5. [可选的第五个动作]

流程：
- [关键原则或方法论]
- [要遵循的最佳实践]
- [重要考虑因素]
- [质量标准]

提供：
- [具有格式的特定交付物]
- [测试或验证]
- [文档或示例]
- [性能或优化说明]

[可选：对关键原则或约束的一行强调]
```

### 字段要求

#### 前置内容（必需）
- **name**：
  - 必须与文件名匹配（不含 .md）
  - 小写，连字符分隔
  - 在所有子代理中唯一
  
- **description**：
  - 自动调用的清晰触发条件
  - 包含用户可能使用的关键字
  - 提及是否需要主动使用
  - 保持在 500 个字符以下

- **category**（必需）：
  - 必须是以下有效类别之一：
    - `development-architecture` - 后端、前端、移动端、API 设计
    - `language-specialists` - 特定语言专业知识（Python、Go、Rust 等）
    - `infrastructure-operations` - DevOps、云、部署、数据库
    - `quality-security` - 代码审查、安全、测试、性能
    - `data-ai` - 数据科学、ML/AI 工程、分析
    - `specialized-domains` - 领域特定工具（支付、区块链等）
    - `crypto-trading` - 加密货币和 DeFi 应用

- **tools**（可选）：
  - 仅在限制工具时包含
  - 使用逗号分隔的列表
  - 有效工具：Read, Write, Edit, MultiEdit, Bash, WebSearch, WebFetch, Task, TodoWrite, Grep, Glob, LS, NotebookRead, NotebookEdit

#### 系统提示要求

**开始语句**：
- 必须以 "您是一个..." 开始
- 清楚说明角色和专业领域

**当被调用时部分**：
- 提供 3-5 个有序的动作步骤
- 从分析/理解开始
- 以实施/交付结束

**流程部分**：
- 列出关键原则和最佳实践
- 包含重要的考虑因素
- 强调质量和标准

**提供部分**：
- 指定具体的交付物
- 包含测试或验证要求
- 提及文档需求

### 测试您的子代理

1. **安装测试**：
   ```bash
   cp subagents/your-subagent.md ~/.claude/agents/
   # 重启 Claude Code
   ```

2. **功能测试**：
   - 通过自然描述测试自动调用
   - 使用 `@agent-your-subagent` 测试显式调用
   - 验证它按预期响应

3. **验证**：
   ```bash
   npm run validate  # 从项目根目录运行
   ```

## 贡献命令

### 创建新命令

1. **在 `commands/` 目录中创建您的文件**
2. **适当命名**：`your-command-name.md`
3. **遵循所需结构**（见下文）
4. **提交前彻底测试**

### 命令结构

每个命令必须遵循这个结构：

```markdown
---
description: 命令功能的简要说明（10-200 个字符）
category: category-name  # 必需 - 见下面的有效类别
argument-hint: <optional-args>  # 可选 - 如果命令接受参数
allowed-tools: tool1, tool2  # 可选 - 如果限制工具使用
model: opus|sonnet|haiku  # 可选 - 如果需要特定模型
---

# Claude 命令：[命令名称]

此命令 [命令功能的详细说明]。

## 使用方法

基本使用：
```
/your-command
```

带参数：
```
/your-command [参数说明]
```

## 此命令的功能

1. [第一个功能或步骤]
2. [第二个功能或步骤]
3. [第三个功能或步骤]

## 示例

### 示例 1：[场景描述]
```
/your-command example-arg
```
预期输出：[描述会发生什么]

### 示例 2：[另一个场景]
```
/your-command --option value
```
预期输出：[描述会发生什么]

## 选项/参数

- `argument1`：[描述此参数的作用]
- `--option`：[描述此选项]
- `--flag`：[描述此标志]

## 注意事项

- [任何重要的使用注意事项]
- [兼容性要求]
- [局限性或警告]
```

### 字段要求

#### 前置内容（必需）
- **description**：
  - 10-200 个字符的简洁说明
  - 清楚表达命令的作用
  - 避免技术术语

- **category**（必需）：
  - 必须是以下有效类别之一：
    - `version-control-git` - Git 操作、提交、分支、合并
    - `code-analysis-testing` - 代码质量、linting、测试、审查
    - `context-loading-priming` - 加载项目上下文、准备会话
    - `documentation-changelogs` - 生成文档、更新变更日志
    - `project-task-management` - 任务跟踪、项目管理、计划
    - `ci-deployment` - 持续集成、部署、构建管道
    - `miscellaneous` - 其他不适合上述类别的命令

- **argument-hint**（可选）：
  - 显示预期的参数格式
  - 使用 `<required>` 表示必需参数
  - 使用 `[optional]` 表示可选参数
  - 示例：`<filename> [--force]`

- **allowed-tools**（可选）：
  - 仅当需要限制工具访问时使用
  - 逗号分隔的工具列表
  - 有助于安全性和性能

- **model**（可选）：
  - 指定 `opus`、`sonnet` 或 `haiku`
  - 仅当命令需要特定模型能力时使用

### 测试您的命令

1. **安装测试**：
   ```bash
   cp commands/your-command.md ~/.claude/commands/
   # 重启 Claude Code
   ```

2. **功能测试**：
   ```bash
   # 在 Claude Code 中测试
   /your-command
   /your-command arg1 arg2
   /your-command --help
   ```

3. **验证**：
   ```bash
   npm run validate  # 从项目根目录运行
   ```

## 文件命名约定

### 子代理文件名
- **格式**：`subagent-name.md`
- **规则**：
  - 小写字母
  - 单词间用连字符分隔
  - 必须与前置内容中的 `name` 字段匹配
  - 描述性但简洁（2-3 个单词）

**好的示例**：
- `python-expert.md`
- `security-auditor.md`
- `database-optimizer.md`

**不好的示例**：
- `PythonExpert.md`（大写字母）
- `python_expert.md`（下划线）
- `expert.md`（太通用）

### 命令文件名
- **格式**：`command-name.md`
- **规则**：
  - 小写字母
  - 单词间用连字符分隔
  - 反映命令的功能
  - 简短但清晰

**好的示例**：
- `create-pr.md`
- `analyze-code.md`
- `setup-testing.md`

**不好的示例**：
- `CreatePR.md`（大写字母）
- `create_pr.md`（下划线）
- `pr.md`（太短/不清楚）

## 编写指南

### 语调和风格
- **专业但友好**：保持专业的语调，但易于理解
- **行动导向**：使用主动语态和清晰的动词
- **简洁**：避免不必要的措辞或行话
- **一致性**：在所有贡献中保持风格一致

### 技术写作最佳实践
- **具体性**：提供具体的例子和使用场景
- **结构化**：使用标题、列表和代码块进行组织
- **完整性**：包含错误处理和边缘情况
- **可测试性**：提供足够的细节供其他人测试

### 避免的内容
- **重叠功能**：不要创建与现有工具过于相似的内容
- **过于通用**：避免试图做所有事情的子代理/命令
- **硬编码值**：使参数和配置可配置
- **不安全的操作**：避免可能造成伤害的操作

## 提交拉取请求

### PR 清单
在提交之前，确保：

- [ ] 文件命名遵循约定
- [ ] 前置内容包含所有必需字段
- [ ] 内容遵循所需结构
- [ ] 本地测试通过
- [ ] 验证脚本通过（`npm run validate`）
- [ ] 包含使用示例
- [ ] 在本地测试功能

### PR 描述模板
```markdown
## 类型
- [ ] 新子代理
- [ ] 新命令
- [ ] 错误修复
- [ ] 改进现有项

## 描述
[此子代理/命令的作用的简要描述]

## 测试
- [ ] 本地安装并测试
- [ ] 验证脚本通过
- [ ] 在多个场景中测试

## 其他注意事项
[任何额外信息、设计决策或需要审查者知道的事项]
```

### 审查过程
1. **自动检查**：PR 将运行验证脚本
2. **手动审查**：维护者将审查内容和结构
3. **反馈**：您可能会收到改进建议
4. **合并**：一旦批准，您的贡献将自动部署到 [buildwithclaude.com](https://www.buildwithclaude.com)

## 自动检查的工作原理

我们的验证系统检查：

### 结构验证
- JSON Schema 合规性
- 必需字段存在
- 正确的文件命名
- 有效的类别值

### 内容质量
- 描述长度和清晰度
- 重复名称检测
- Markdown 格式
- 工具列表有效性

### 运行验证
```bash
# 从项目根目录
npm run validate

# 仅验证子代理
npm run validate:subagents

# 仅验证命令
npm run validate:commands
```

### 常见验证错误
1. **文件名不匹配**：确保 filename.md 与 `name` 字段匹配
2. **无效类别**：使用上面列出的确切类别名称之一
3. **缺少描述**：包含有意义的描述
4. **重复名称**：选择唯一的子代理名称

## 行为准则

我们致力于维护一个受欢迎和包容的社区。参与此项目即表示您同意：

- **尊重**：对所有贡献者友善和尊重
- **合作**：帮助他人并接受建设性反馈
- **质量**：致力于提供高质量的贡献
- **学习**：对从他人那里学习和分享知识持开放态度

### 报告问题
如果您遇到行为问题，请通过 [GitHub Issues](https://github.com/davepoon/claude-code-subagents-collection/issues) 报告。

---

感谢您帮助使 Claude Code 对每个人都更加强大！您的贡献使开发人员社区更加高效和富有生产力。