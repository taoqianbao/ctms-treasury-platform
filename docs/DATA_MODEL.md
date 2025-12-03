# 数据模型说明 (Data Models)

所有类型定义均位于 `types.ts` 文件中。以下是核心业务实体的说明。

## 1. 基础实体

### 银行账户 (BankAccount)
用于现金管理和资金池模块。
```typescript
interface BankAccount {
  id: string;
  name: string;
  type: AccountType; // 账户性质 (总部/工厂/销售/监管户)
  balance: number;   // 余额
  currency: Currency; // 币种
  isPooled: boolean; // 是否加入资金池
  // ...
}
```

### 交易记录 (Transaction)
用于结算管理和流水分析。
```typescript
interface Transaction {
  amount: number;    // 正数代表收入，负数代表支出
  category: 'PROCUREMENT' | 'SALES' | ...; // 交易分类
  status: 'COMPLETED' | 'AUDITING' | ...;  // 状态
}
```

## 2. 业务实体

### 融资申请 (LoanApplication)
用于供应链金融模块。
```typescript
interface LoanApplication {
  type: 'UPSTREAM_FARMER' | 'DOWNSTREAM_DISTRIBUTOR'; // 上游牧场 vs 下游经销商
  collateral: string; // 抵押物 (如：生物资产、应收账款)
  riskScore: number;  // 内部风险评分
}
```

### 外汇敞口 (FXExposure)
用于外汇管理模块。
```typescript
interface FXExposure {
  type: 'IMPORT_PAYMENT' | 'DEBT'; // 进口付汇 vs 境外债务
  hedgedRatio: number; // 已锁汇比例 (0-1)
}
```

### 现金流预测 (CashFlowForecast)
用于流动性管理和 Dashboard 图表。
```typescript
interface CashFlowForecast {
  date: string;
  inflow: number;
  outflow: number;
  net: number; // 净流量
}
```

### 系统集成 (SystemIntegration)
用于运维管理模块。
```typescript
interface SystemIntegration {
  status: 'CONNECTED' | 'SYNCING' | 'ERROR'; // 连接状态
  lastSync: string; // 最后同步时间
}
```
