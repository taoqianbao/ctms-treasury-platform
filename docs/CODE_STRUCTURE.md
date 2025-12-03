
# 代码结构说明 (按功能模块)

本文档旨在帮助开发人员快速定位业务逻辑对应的代码文件，方便进行二次开发和功能扩展。

## 1. 核心布局与公共组件
| 文件路径 | 描述 | 备注 |
| :--- | :--- | :--- |
| `App.tsx` | **主入口**。包含路由逻辑、全局 Mock 数据定义、状态管理。 | 修改 Mock 数据或新增页面请在此处修改。 |
| `components/Sidebar.tsx` | **侧边导航栏**。定义了系统的菜单结构。 | 修改菜单图标或名称请修改此处。 |
| `components/Dashboard.tsx` | **决策分析驾驶舱**。展示全局 KPI、现金流图表。 | 对应架构图顶部的“决策分析”。 |
| `components/AIAgent.tsx` | **AI 智能体**。全屏智能对话模块。 | 核心交互界面，支持 13 个模块的多轮对话。 |

---

## 2. 十三大司库功能模块
系统严格按照企业司库架构规划为 13 个核心模块，代码文件映射如下：

### 模块 1: 融资管理 (Financing)
*   **文件**: `components/Financing.tsx`
*   **功能**:
    *   融资规划 (需求/缺口预测)
    *   融资策略 (WACC 模型)
    *   方案执行 (审批/合同/提款)
    *   渠道管理 (内外部融资)
    *   融后管理 (台账/预警)
*   **结构**: 内部使用 Tab 页签切换 5 个子功能。

### 模块 2: 投资理财 (Investment)
*   **文件**: `components/Investment.tsx`
*   **功能**: 理财产品台账、收益率分析、结构性存款管理。

### 模块 3: 外汇管理 (FX Management)
*   **文件**: `components/FXManagement.tsx`
*   **功能**: 外汇敞口监控、汇率看板、锁汇比例分析、AI 风险诊断。

### 模块 4: 内部信贷 (Internal Credit)
*   **文件**: `components/InternalCredit.tsx`
*   **功能**: 成员单位内部借款台账、内部授信额度占用监控。

### 模块 5: 供应链金融 (Supply Chain Finance)
*   **文件**: `components/SupplyChainFinance.tsx`
*   **功能**:
    *   上下游 (牧场/经销商) 融资申请列表。
    *   融资详情与 AI 风险评估报告。

### 模块 6: 票据管理 (Bill Management)
*   **文件**: `components/BillManagement.tsx`
*   **功能**: 票据池概览、电票台账、持有/贴现状态管理。

### 模块 7: 现金管理 (Cash Management)
*   **文件**: `components/CashManagement.tsx`
*   **功能**:
    *   **现金池**: 资金归集、下拨、贡献度分析。
    *   **账户管理**: 全集团银行账户列表与状态。
    *   **结算管理**: 收付款待办、日结对账。
*   **结构**: 内部使用 Tab 页签切换 3 个子功能。

### 模块 8: 流动性管理 (Liquidity)
*   **文件**: `components/Liquidity.tsx`
*   **功能**: 现金流滚动预测 (Rolling Forecast)、资金计划编制状态、预实分析。

### 模块 9: 风险管理 (Risk Control)
*   **文件**: `components/RiskControl.tsx`
*   **功能**: 市场/信用/流动性风险驾驶舱、风险事件日志。

### 模块 10: 稽核管理 (Audit)
*   **文件**: `components/AuditManagement.tsx`
*   **功能**: 稽核任务进度追踪、问题整改台账、合规性检查。

### 模块 11: 指标管理 (KPI)
*   **文件**: `components/IndicatorManagement.tsx`
*   **功能**: 资金运营效率指标、融资效益指标的量化展示。

### 模块 12: 客户关系管理 (CRM)
*   **文件**: `components/CRM.tsx`
*   **功能**:
    *   **金融机构**: 银行授信、评级管理。
    *   **成员单位**: 内部企业画像 (KYC)、资金贡献度。

### 模块 13: 运维管理 (Operations)
*   **文件**: `components/Operations.tsx`
*   **功能**:
    *   **系统集成**: 监控 SAP, SWIFT, CIPS, 银企直联等接口状态。
    *   **基础设置**: 基础数据、工作流、系统配置入口。
*   **结构**: 分为“系统集成监控”和“配置管理”两个面板。

---

## 3. 二次开发指南

### 如何新增一个功能页面？
1. 在 `components/` 下新建 `NewModule.tsx`。
2. 在 `types.ts` 的 `TabType` 中添加新类型。
3. 在 `Sidebar.tsx` 中添加 `NavItem`。
4. 在 `App.tsx` 的 `renderContent` 方法中添加渲染逻辑。

### 如何修改数据模型？
1. 修改 `types.ts` 中的接口定义。
2. 更新 `App.tsx` 中的 `MOCK_DATA` 常量。
3. 如果涉及 AI 分析，请同步更新 `services/geminiService.ts` 中的 Prompt 结构。