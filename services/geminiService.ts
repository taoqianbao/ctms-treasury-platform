import { GoogleGenAI } from "@google/genai";
import { BankAccount, Transaction, LoanApplication, FXExposure } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction to set the persona
const SYSTEM_INSTRUCTION = `
你是银河司库系统的核心 AI 智能体（Galaxy Treasury AI Agent），服务于大型乳业集团（如乳企、伊利）。
你拥有“上帝视角”，可以访问系统内 13 个功能模块的所有实时数据。

你的职责：
1. **全域数据分析**：跨模块关联数据（例如：关联“现金管理”的余额与“融资管理”的缺口）。
2. **风险预警**：主动识别流动性、外汇、信用等潜在风险。
3. **业务建议**：基于数据提供专业的司库管理建议（如WACC优化、对冲策略）。
4. **多轮对话**：与用户进行深入的交互，解释你的分析逻辑。

你需要处理的 13 个核心模块上下文：
1. 融资管理 (Financing)
2. 投资理财 (Investment)
3. 外汇管理 (FX)
4. 内部信贷 (Internal Credit)
5. 供应链金融 (SCF)
6. 票据管理 (Bill)
7. 现金管理 (Cash)
8. 流动性管理 (Liquidity)
9. 风险管理 (Risk)
10. 稽核管理 (Audit)
11. 指标管理 (KPI)
12. 客户关系 (CRM)
13. 运维管理 (Ops)

回复要求：
- 使用 Markdown 格式。
- 语言专业、简洁、数据驱动。
- 在涉及金额时，注意单位换算（如将大额数字转换为“亿”或“万”）。
- 如果数据中发现异常（如风险分高、连接断开），请重点提示。
`;

export const analyzeLiquidity = async (accounts: BankAccount[], transactions: Transaction[]) => {
  try {
    const prompt = `
      请根据账户数据生成简报。
      重点关注：
      1. 资金集中度 (Cash Pooling Efficiency)。
      2. 近期大额支出的流动性压力。
      
      账户余额总览: ${JSON.stringify(accounts.map(a => ({name: a.name, bal: a.balance})))}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "系统忙，无法生成分析。";
  }
};

export const evaluateLoanRisk = async (loan: LoanApplication, marketContext: string) => {
  try {
    const prompt = `
      评估供应链金融贷款风险。
      申请方: ${loan.applicant} (${loan.type})
      金额: ${loan.amount}
      抵押: ${loan.collateral}
      市场背景: ${marketContext}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, 
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini loan evaluation failed:", error);
    return "无法评估风险。";
  }
};

export const analyzeFXRisk = async (exposures: FXExposure[]) => {
  try {
    const prompt = `
      分析当前外汇敞口风险。
      敞口列表: ${JSON.stringify(exposures)}
      请给出对冲建议（远期/期权/自然对冲）。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini FX analysis failed:", error);
    return "无法生成外汇报告。";
  }
};

export const chatWithTreasuryAI = async (history: {role: string, content: string}[], contextData: any) => {
  try {
    // Construct the chat history for the model
    // Note: In a real app, we would use the proper `Content` object structure for history.
    // Here we append the context to the latest prompt for simplicity in this demo.
    
    const lastMessage = history[history.length - 1].content;
    const contextString = JSON.stringify(contextData).slice(0, 15000); // Increased limit for full context

    const prompt = `
      [系统上下文数据 - 13个模块实时快照]:
      ${contextString}

      [用户历史对话]:
      ${history.slice(0, -1).map(h => `${h.role}: ${h.content}`).join('\n')}

      [当前用户问题]:
      ${lastMessage}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini chat failed:", error);
    return "智能体连接中断，请检查网络或 API Key 设置。";
  }
};