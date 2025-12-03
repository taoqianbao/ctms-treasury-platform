
import React, { useState } from 'react';
import { BankAccount, Transaction } from '../types';
import { Building2, ArrowRightLeft, Layers, FileCheck, Wallet, Receipt } from 'lucide-react';

interface CashManagementProps {
  accounts: BankAccount[];
  transactions: Transaction[];
}

export const CashManagement: React.FC<CashManagementProps> = ({ accounts, transactions }) => {
  const [activeTab, setActiveTab] = useState<'accounts' | 'settlement' | 'cashpool'>('cashpool');
  const pooledBalance = accounts.filter(a => a.isPooled).reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex border-b border-slate-200 bg-white px-6 rounded-t-xl">
        {[
          { id: 'cashpool', label: '现金池管理', icon: Layers },
          { id: 'accounts', label: '账户管理', icon: Building2 },
          { id: 'settlement', label: '结算管理', icon: Receipt },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors ${
              activeTab === tab.id 
                ? 'border-brand-600 text-brand-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-b-xl shadow-sm border border-slate-100 border-t-0 mt-0">
        
        {activeTab === 'cashpool' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brand-50 p-6 rounded-xl border border-brand-100 text-center">
                <p className="text-sm text-brand-600 mb-1">资金归集总额</p>
                <p className="text-3xl font-bold text-brand-900">¥{(pooledBalance / 100000000).toFixed(2)}亿</p>
                <p className="text-xs text-brand-500 mt-2">归集率 92.5%</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                <p className="text-sm text-slate-600 mb-1">今日下拨金额</p>
                <p className="text-3xl font-bold text-slate-800">¥2,450万</p>
                <p className="text-xs text-slate-400 mt-2">共 12 笔业务</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                <p className="text-sm text-slate-600 mb-1">内部计息收益</p>
                <p className="text-3xl font-bold text-slate-800">¥128万</p>
                <p className="text-xs text-slate-400 mt-2">本月累计</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">成员单位资金贡献度</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accounts.filter(a => a.isPooled).map(acc => (
                  <div key={acc.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                    <p className="font-medium text-slate-700 truncate">{acc.name}</p>
                    <p className="text-lg font-bold text-slate-900 mt-1">¥{(acc.balance / 10000).toFixed(0)}万</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                      <ArrowRightLeft className="w-3 h-3" />
                      已归集
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div>
            <div className="flex justify-between mb-4">
              <h4 className="font-semibold text-slate-800">全集团账户视图</h4>
              <div className="flex gap-2">
                 <button className="px-3 py-1.5 text-xs bg-brand-50 text-brand-700 rounded-md">账户年检</button>
                 <button className="px-3 py-1.5 text-xs bg-brand-600 text-white rounded-md">新增账户</button>
              </div>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-3">账户名称</th>
                  <th className="p-3">银行/账号</th>
                  <th className="p-3">性质</th>
                  <th className="p-3 text-right">余额</th>
                  <th className="p-3 text-center">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accounts.map(acc => (
                  <tr key={acc.id} className="hover:bg-slate-50">
                    <td className="p-3 font-medium">{acc.name}</td>
                    <td className="p-3 text-slate-500">{acc.bankName}<br/><span className="text-xs">{acc.accountNumber}</span></td>
                    <td className="p-3"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{acc.type}</span></td>
                    <td className="p-3 text-right font-mono">¥{acc.balance.toLocaleString()}</td>
                    <td className="p-3 text-center"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">正常</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settlement' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="border border-slate-200 rounded-lg p-4">
                 <h4 className="font-semibold mb-3 flex items-center gap-2">
                   <FileCheck className="w-4 h-4 text-brand-600" /> 
                   收付款待办
                 </h4>
                 <div className="space-y-3">
                   {transactions.map(tx => (
                     <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-50 rounded text-sm">
                       <div>
                         <p className="font-medium">{tx.description}</p>
                         <p className="text-xs text-slate-500">{tx.counterparty} | {tx.date}</p>
                       </div>
                       <div className="text-right">
                         <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                           {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                         </p>
                         <span className="text-xs text-amber-600 bg-amber-50 px-1 rounded">{tx.status}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               
               <div className="border border-slate-200 rounded-lg p-4">
                 <h4 className="font-semibold mb-3 flex items-center gap-2">
                   <Wallet className="w-4 h-4 text-purple-600" /> 
                   日结与对账
                 </h4>
                 <div className="space-y-2">
                   {['中国工商银行', '招商银行', '中国农业银行'].map((bank, i) => (
                     <div key={i} className="flex justify-between items-center p-2 border-b border-slate-100 last:border-0">
                       <span className="text-sm">{bank}</span>
                       <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">余额调节表平</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
