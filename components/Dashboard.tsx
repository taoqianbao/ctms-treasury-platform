
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, CheckSquare, Bell, Clock, AlertTriangle, Info, Server, ArrowRight } from 'lucide-react';
import { CashFlowForecast, BankAccount, Notification, Task } from '../types';

interface DashboardProps {
  forecastData: CashFlowForecast[];
  accounts: BankAccount[];
  notifications: Notification[];
  tasks: Task[];
}

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(val);

export const Dashboard: React.FC<DashboardProps> = ({ forecastData, accounts, notifications, tasks }) => {
  
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const overseasBalance = accounts.filter(a => a.currency !== 'CNY').reduce((sum, acc) => sum + (acc.balance * 7.1), 0); // Mock exchange rate

  const liquidityData = accounts.map(acc => ({
    name: acc.name, // Names are now Chinese in mock data
    value: acc.balance,
    type: acc.type
  })).sort((a, b) => b.value - a.value);

  const COLORS = ['#0c4a6e', '#0369a1', '#0ea5e9', '#38bdf8', '#bae6fd'];

  // Filter top items for dashboard
  const pendingTasks = tasks.filter(t => t.status === 'PENDING').slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">全球资金头寸 (Total Cash)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(totalBalance)}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span className="font-medium">4.2%</span>
            <span className="text-slate-400 ml-1">较上周</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">境外资金 (折合人民币)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(overseasBalance)}</h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Activity className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-500">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span className="font-medium">1.8%</span>
            <span className="text-slate-400 ml-1">汇率影响</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">待审批付款</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">¥4,520万</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-500">
            <span>28 笔款项待批</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">供应链融资余额</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">¥1.28亿</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-500">
            <span>已支持 340 个牧场/经销商</span>
          </div>
        </div>
      </div>

      {/* Task & Notification Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks Widget */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h4 className="font-bold text-slate-800 flex items-center gap-2">
               <CheckSquare className="w-5 h-5 text-brand-600" /> 紧急待办任务
             </h4>
             <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{tasks.filter(t=>t.status==='PENDING').length} 待处理</span>
          </div>
          <div className="flex-1 space-y-3">
             {pendingTasks.length === 0 ? (
               <div className="text-center text-slate-400 py-4">无紧急待办</div>
             ) : (
               pendingTasks.map(task => (
                 <div key={task.id} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                       <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${task.priority === 'URGENT' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></span>
                         <h5 className="text-sm font-semibold text-slate-800">{task.title}</h5>
                       </div>
                       <span className="text-xs text-slate-400 flex items-center gap-1">
                         <Clock className="w-3 h-3" /> {task.dueDate}
                       </span>
                    </div>
                    <p className="text-xs text-slate-500 pl-4 mb-2 line-clamp-1">{task.description}</p>
                    <div className="pl-4 flex items-center justify-between">
                       <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">{task.module}</span>
                       <span className="text-xs text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                         处理 <ArrowRight className="w-3 h-3" />
                       </span>
                    </div>
                 </div>
               ))
             )}
          </div>
        </div>

        {/* Notifications Widget */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h4 className="font-bold text-slate-800 flex items-center gap-2">
               <Bell className="w-5 h-5 text-amber-600" /> 最新消息通知
             </h4>
             <button className="text-xs text-brand-600 hover:underline">查看全部</button>
          </div>
          <div className="flex-1 space-y-3">
            {recentNotifications.map(note => (
              <div key={note.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-slate-50 transition-colors">
                 <div className={`mt-0.5 p-1.5 rounded-full flex-shrink-0 ${
                    note.type === 'RISK' ? 'bg-red-100 text-red-600' :
                    note.type === 'SYSTEM' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                 }`}>
                   {note.type === 'RISK' ? <AlertTriangle className="w-4 h-4" /> :
                    note.type === 'SYSTEM' ? <Server className="w-4 h-4" /> :
                    <Info className="w-4 h-4" />}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <h5 className={`text-sm font-medium truncate ${note.read ? 'text-slate-500' : 'text-slate-800'}`}>
                         {note.title}
                       </h5>
                       <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{note.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{note.message}</p>
                 </div>
                 {!note.read && <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">流动性预测 (未来30天)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`¥${(value/10000).toFixed(0)}万`, '净现金流']}
                  labelFormatter={(label) => `日期: ${label}`}
                />
                <Area type="monotone" dataKey="net" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">资金归集分布</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={liquidityData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={110} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}} 
                  formatter={(value: number) => [formatCurrency(value), '余额']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {liquidityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
