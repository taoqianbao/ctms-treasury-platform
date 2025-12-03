
# AI 集成架构 (Gemini Service)

系统使用 Google Gemini 2.5 Flash 模型为司库管理提供智能分析能力。相关代码位于 `services/geminiService.ts`。

## 1. 角色设定 (Persona)
在 `SYSTEM_INSTRUCTION` 中定义了 AI 的角色：
> "你是大型乳业集团（如乳企或伊利）的智能司库助手... 语言风格要专业、数据驱动、符合中国企业司库管理规范。"

## 2. 核心功能点

| 功能 | 对应函数 | 调用位置 | 上下文数据 |
| :--- | :--- | :--- | :--- |
| **流动性日报** | `analyzeLiquidity` | `App.tsx` (初始化时) | 所有账户余额、近期大额交易 |
| **供应链风控** | `evaluateLoanRisk` | `SupplyChainFinance.tsx` | 申请人信息、抵押物(生物资产)、市场行情 |
| **外汇风险诊断** | `analyzeFXRisk` | `FXManagement.tsx` | 外汇敞口列表、汇率数据 |
| **智能助手对话** | `chatWithTreasuryAI` | `TreasuryChat.tsx` | 当前页面的全量业务数据 |

## 3. 开发注意事项

1. **Prompt 优化**: 若需调整 AI 输出风格，请修改 `geminiService.ts` 中的 Prompt 模板。
2. **上下文限制**: 传递给 AI 的 JSON 数据应避免过大，建议进行切片或只传递关键字段。
3. **错误处理**: 所有 API 调用均包含 `try-catch` 块，确保 AI 服务不可用时不影响主业务流程。
