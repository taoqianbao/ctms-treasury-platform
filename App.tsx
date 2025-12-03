
import React, { useState, useEffect } from 'react';
import { Search, UserCircle, Bell, Landmark, Menu } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { SupplyChainFinance } from './components/SupplyChainFinance';
import { AIAgent } from './components/AIAgent';
import { CashManagement } from './components/CashManagement';
import { BillManagement } from './components/BillManagement';
import { FXManagement } from './components/FXManagement';
import { Liquidity } from './components/Liquidity';
import { Financing } from './components/Financing';
import { Investment } from './components/Investment';
import { InternalCredit } from './components/InternalCredit';
import { RiskControl } from './components/RiskControl';
import { AuditManagement } from './components/AuditManagement';
import { IndicatorManagement } from './components/IndicatorManagement';
import { CRM } from './components/CRM';
import { Operations } from './components/Operations';
import { HelpCenter } from './components/HelpCenter';
import { Sidebar } from './components/Sidebar';
import { NotificationCenter } from './components/NotificationCenter';
import { LoginPage } from './components/LoginPage';
import { analyzeLiquidity } from './services/geminiService';
import { 
  AccountType, Currency, BankAccount, Transaction, CashFlowForecast, 
  LoanApplication, FXExposure, SystemIntegration, TabType, Notification, Task 
} from './types';

// --- MOCK DATA ---

const MOCK_ACCOUNTS: BankAccount[] = [
  { id: '1', name: '乳企总部资金中心', type: AccountType.HEADQUARTERS, balance: 145000000, currency: Currency.CNY, bankName: '中国工商银行', accountNumber: '***8888', status: 'NORMAL', lastUpdated: '10 分钟前', isPooled: true },
  { id: '2', name: '内蒙古生产基地', type: AccountType.SUBSIDIARY_FACTORY, balance: 23000000, currency: Currency.CNY, bankName: '中国农业银行', accountNumber: '***1234', status: 'NORMAL', lastUpdated: '2 分钟前', isPooled: true },
  { id: '3', name: '上海销售分公司', type: AccountType.SUBSIDIARY_SALES, balance: 45000000, currency: Currency.CNY, bankName: '招商银行', accountNumber: '***5678', status: 'NORMAL', lastUpdated: '5 分钟前', isPooled: true },
  { id: '4', name: '新西兰采购中心', type: AccountType.SUBSIDIARY_FACTORY, balance: 5000000, currency: Currency.USD, bankName: 'ANZ Bank', accountNumber: '***9999', status: 'NORMAL', lastUpdated: '1 小时前', isPooled: false },
  { id: '5', name: '和林格尔联营牧场', type: AccountType.PASTURE_JV, balance: 8500000, currency: Currency.CNY, bankName: '农村信用社', accountNumber: '***3333', status: 'NORMAL', lastUpdated: '15 分钟前', isPooled: false },
  { id: '6', name: '资金监管户 (债券)', type: AccountType.ESCROW, balance: 200000000, currency: Currency.CNY, bankName: '建设银行', accountNumber: '***7777', status: 'FROZEN', lastUpdated: '30 分钟前', isPooled: false },
];

const MOCK_FORECAST: CashFlowForecast[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const baseInflow = 5000000 + (Math.random() * 2000000);
  const baseOutflow = 4000000 + (Math.random() * 1500000);
  
  return {
    date: date.toISOString().split('T')[0].slice(5),
    inflow: isWeekend ? baseInflow * 1.5 : baseInflow,
    outflow: baseOutflow,
    net: (isWeekend ? baseInflow * 1.5 : baseInflow) - baseOutflow
  };
});

const MOCK_LOANS: LoanApplication[] = [
  { id: 'L001', applicant: '绿草地生态牧场', type: 'UPSTREAM_FARMER', amount: 2500000, termMonths: 12, collateral: '350头荷斯坦奶牛（生物资产）', riskScore: 25, status: 'UNDER_REVIEW' },
  { id: 'L002', applicant: '北京鲜达冷链物流', type: 'DOWNSTREAM_DISTRIBUTOR', amount: 5000000, termMonths: 6, collateral: '应收账款质押（家乐福/沃尔玛）', riskScore: 15, status: 'UNDER_REVIEW' },
  { id: 'L003', applicant: '阳光牧业有限公司', type: 'UPSTREAM_FARMER', amount: 8000000, termMonths: 24, collateral: '进口挤奶设备及 500 头奶牛', riskScore: 65, status: 'UNDER_REVIEW' },
];

const MOCK_FX_EXPOSURES: FXExposure[] = [
  { currency: Currency.USD, amount: 1500000, rate: 7.12, type: 'IMPORT_PAYMENT', description: '新西兰全脂奶粉进口采购 (信用证)', hedgedRatio: 0.8 },
  { currency: Currency.EUR, amount: 800000, rate: 7.85, type: 'IMPORT_PAYMENT', description: '德国 GEA 生产线设备尾款', hedgedRatio: 0.3 },
  { currency: Currency.NZD, amount: 2000000, rate: 4.35, type: 'DEBT', description: '新西兰子公司流动资金贷款', hedgedRatio: 0.5 },
];

const MOCK_SYSTEMS: SystemIntegration[] = [
  { id: 'S1', name: 'SAP ERP (核心财务)', status: 'CONNECTED', lastSync: '1分钟前', message: '凭证实时同步中' },
  { id: 'S2', name: 'SWIFT (全球支付)', status: 'CONNECTED', lastSync: '实时', message: '通道正常' },
  { id: 'S3', name: 'CIPS (人民币跨境)', status: 'CONNECTED', lastSync: '实时', message: '通道正常' },
  { id: 'S4', name: '银企直联 (招商银行)', status: 'SYNCING', lastSync: '30秒前', message: '正在拉取电子回单' },
  { id: 'S5', name: '金蝶 EAS (历史库)', status: 'OFFLINE', lastSync: '2小时前', message: '数据迁移作业进行中' },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'T1', date: '2023-10-25', description: '支付原奶采购款', amount: -250000, counterparty: '现代牧业', category: 'PROCUREMENT', status: 'AUDITING' },
  { id: 'T2', date: '2023-10-25', description: '支付设备维护费', amount: -50000, counterparty: '利乐中国', category: 'PROCUREMENT', status: 'COMPLETED' },
  { id: 'T3', date: '2023-10-24', description: '收到华东大区货款', amount: 1200000, counterparty: '永辉超市', category: 'SALES', status: 'COMPLETED' },
  { id: 'T4', date: '2023-10-24', description: '归还工行流贷利息', amount: -150000, counterparty: '中国工商银行', category: 'FINANCING', status: 'COMPLETED' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: '外汇风险预警', message: '欧元汇率波动超过 0.5%，建议检查未锁定敞口。', type: 'RISK', level: 'HIGH', timestamp: '10分钟前', read: false },
  { id: 'n2', title: '银企直联系统维护', message: '招商银行系统将于今晚 22:00-23:00 进行例行维护。', type: 'SYSTEM', level: 'INFO', timestamp: '2小时前', read: false },
  { id: 'n3', title: '大额资金到账提醒', message: '收到上海销售分公司上划资金 ¥2,500万。', type: 'BUSINESS', level: 'MEDIUM', timestamp: '3小时前', read: true },
];

const MOCK_TASKS: Task[] = [
  { id: 't1', title: '审批 11 月采购付款计划', description: '涉及原奶采购及包材供应商共 28 笔款项，总额 ¥4,520万。', module: '资金计划', priority: 'URGENT', dueDate: '今天 17:00', status: 'PENDING' },
  { id: 't2', title: '处理供应链融资申请', description: '绿草地生态牧场申请 ¥250万 生物资产抵押贷款。', module: '供应链金融', priority: 'HIGH', dueDate: '明天 12:00', status: 'PENDING' },
  { id: 't3', title: '确认 EAS 数据迁移进度', description: '核对 2023 财年电子回单迁移数量及一致性。', module: '运维管理', priority: 'NORMAL', dueDate: '本周五', status: 'PENDING' },
];

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotifOpen, setNotifOpen] = useState(false);
  
  // State for Notifications & Tasks
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleTaskAction = (id: string) => {
    // For demo, just mark as processing/completed toggle or remove
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'COMPLETED' } : t));
  };

  // Run initial AI analysis on mount (optional demo)
  useEffect(() => {
    if (isAuthenticated) {
      analyzeLiquidity(MOCK_ACCOUNTS, MOCK_TRANSACTIONS);
    }
  }, [isAuthenticated]);

  const globalContext = {
    accounts: MOCK_ACCOUNTS,
    forecast: MOCK_FORECAST,
    loans: MOCK_LOANS,
    fx: MOCK_FX_EXPOSURES,
    systems: MOCK_SYSTEMS,
    transactions: MOCK_TRANSACTIONS,
    tasks: tasks,
    notifications: notifications,
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
                 forecastData={MOCK_FORECAST} 
                 accounts={MOCK_ACCOUNTS} 
                 notifications={notifications}
                 tasks={tasks}
               />;
      case 'ai_agent':
        return <AIAgent contextData={globalContext} />;
      case 'financing':
        return <Financing />;
      case 'investment':
        return <Investment />;
      case 'fx':
        return <FXManagement exposures={MOCK_FX_EXPOSURES} />;
      case 'internal_credit':
        return <InternalCredit />;
      case 'scf':
        return <SupplyChainFinance loans={MOCK_LOANS} />;
      case 'bill':
        return <BillManagement />;
      case 'cash':
        return <CashManagement accounts={MOCK_ACCOUNTS} transactions={MOCK_TRANSACTIONS} />;
      case 'liquidity':
        return <Liquidity forecastData={MOCK_FORECAST} />;
      case 'risk':
        return <RiskControl />;
      case 'audit':
        return <AuditManagement />;
      case 'kpi':
        return <IndicatorManagement />;
      case 'crm':
        return <CRM />;
      case 'ops':
        return <Operations systems={MOCK_SYSTEMS} />;
      case 'help':
        return <HelpCenter />;
      default:
        return <Dashboard 
                 forecastData={MOCK_FORECAST} 
                 accounts={MOCK_ACCOUNTS} 
                 notifications={notifications}
                 tasks={tasks}
               />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-10">
          
          {/* Mobile Menu Toggle (only visible when sidebar closed on mobile logic, simplified here) */}
          <div className="flex items-center gap-4">
             {!isSidebarOpen && (
               <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-brand-600 md:hidden">
                 <Menu className="w-6 h-6" />
               </button>
             )}
             
             {/* Search Bar */}
             <div className="relative hidden md:block">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
               <input 
                 type="text"
                 placeholder="搜索功能、账号或交易..."
                 className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-500 w-64 transition-all"
               />
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => setNotifOpen(true)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-700">张总监</p>
                <p className="text-xs text-slate-500">集团司库部</p>
              </div>
              <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center border border-brand-200 text-brand-700">
                <UserCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth custom-scrollbar">
          <div className="w-full h-full min-w-0">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Notification Drawer */}
      <NotificationCenter 
        isOpen={isNotifOpen} 
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        tasks={tasks}
        onMarkRead={handleMarkRead}
        onHandleTask={handleTaskAction}
      />
    </div>
  );
};
