
export enum AccountType {
  HEADQUARTERS = 'HEADQUARTERS',
  SUBSIDIARY_FACTORY = 'SUBSIDIARY_FACTORY',
  SUBSIDIARY_SALES = 'SUBSIDIARY_SALES',
  PASTURE_JV = 'PASTURE_JV',
  ESCROW = 'ESCROW' // 监管户
}

export enum Currency {
  CNY = 'CNY',
  USD = 'USD',
  EUR = 'EUR',
  AUD = 'AUD',
  NZD = 'NZD' // 新西兰元（乳业常用）
}

export interface BankAccount {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: Currency;
  bankName: string;
  accountNumber: string;
  status: 'NORMAL' | 'FROZEN' | 'DORMANT';
  lastUpdated: string;
  isPooled: boolean; // 是否加入资金池
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number; 
  counterparty: string;
  category: 'PROCUREMENT' | 'SALES' | 'LOGISTICS' | 'FINANCING' | 'TAX' | 'INTER_COMPANY';
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'AUDITING';
}

export interface LoanApplication {
  id: string;
  applicant: string;
  type: 'UPSTREAM_FARMER' | 'DOWNSTREAM_DISTRIBUTOR';
  amount: number;
  termMonths: number;
  collateral: string;
  riskScore: number;
  status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
}

export interface CashFlowForecast {
  date: string;
  inflow: number;
  outflow: number;
  net: number;
}

// 外汇风险敞口
export interface FXExposure {
  currency: Currency;
  amount: number; 
  rate: number;   
  type: 'IMPORT_PAYMENT' | 'EXPORT_RECEIVABLE' | 'DEBT'; 
  description: string;
  hedgedRatio: number; 
}

// 系统集成状态
export interface SystemIntegration {
  id: string;
  name: string; 
  status: 'CONNECTED' | 'SYNCING' | 'ERROR' | 'OFFLINE';
  lastSync: string;
  message: string;
}

// 新增：票据
export interface Bill {
  id: string;
  type: 'COMMERCIAL_ACCEPTANCE' | 'BANK_ACCEPTANCE'; // 商票/银票
  amount: number;
  drawer: string; // 出票人
  acceptor: string; // 承兑人
  issueDate: string;
  dueDate: string;
  status: 'HELD' | 'PLEDGED' | 'DISCOUNTED' | 'SETTLED';
}

// 新增：理财产品
export interface InvestmentProduct {
  id: string;
  name: string;
  type: 'STRUCTURED_DEPOSIT' | 'BOND_FUND' | 'MONEY_MARKET';
  amount: number;
  expectedYield: number;
  startDate: string;
  maturityDate: string;
  status: 'ACTIVE' | 'MATURED';
}

// 新增：风控指标
export interface RiskMetric {
  id: string;
  name: string;
  value: number;
  threshold: number;
  unit: string;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

// 新增：通知消息
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'RISK' | 'SYSTEM' | 'BUSINESS'; // 风险告警 | 系统通知 | 业务提醒
  level: 'HIGH' | 'MEDIUM' | 'INFO';
  timestamp: string;
  read: boolean;
}

// 新增：待办任务
export interface Task {
  id: string;
  title: string;
  description: string;
  module: string; // 来源模块
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  dueDate: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED';
}

// 导航标签类型
export type TabType = 'dashboard' | 'ai_agent' | 'financing' | 'investment' | 'fx' | 'internal_credit' | 'scf' | 'bill' | 'cash' | 'liquidity' | 'risk' | 'audit' | 'kpi' | 'crm' | 'ops' | 'help';