
import React from 'react';
import { ScrollText, QrCode, Archive, TrendingUp } from 'lucide-react';

const MOCK_BILLS = [
  { id: 'B001', type: '银票', amount: 5000000, due: '2024-06-30', issuer: '现代牧业', status: '持有中' },
  { id: 'B002', type: '商票', amount: 2000000, due: '2024-05-15', issuer: '永辉超市', status: '已贴现' },
  { id: 'B003', type: '银票', amount: 10000000, due: '2024-12-01', issuer: '利乐包装', status: '质押中' },
];

export const BillManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm">票据池总额</p>
          <p className="text-2xl font-bold text-slate-800">¥1.85亿</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm">持有银票</p>
          <p className="text-2xl font-bold text-indigo-600">¥1.20亿</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm">持有商票</p>
          <p className="text-2xl font-bold text-amber-600">¥6,500万</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm">即将到期 (7天)</p>
          <p className="text-2xl font-bold text-red-600">¥500万</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <h3 className="font-semibold flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-brand-600" />
            电票台账
          </h3>
          <div className="flex gap-2 ml-auto">
            <button className="px-3 py-1 text-sm bg-slate-100 rounded hover:bg-slate-200">开票申请</button>
            <button className="px-3 py-1 text-sm bg-slate-100 rounded hover:bg-slate-200">贴现申请</button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4 text-left">票号/票据类型</th>
              <th className="p-4 text-left">出票人/承兑人</th>
              <th className="p-4 text-right">票面金额</th>
              <th className="p-4 text-left">到期日</th>
              <th className="p-4 text-center">状态</th>
              <th className="p-4 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_BILLS.map(bill => (
              <tr key={bill.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-mono text-xs text-slate-500">{bill.id}</div>
                  <div className="font-medium">{bill.type}</div>
                </td>
                <td className="p-4 text-slate-700">{bill.issuer}</td>
                <td className="p-4 text-right font-bold">¥{(bill.amount/10000).toFixed(0)}万</td>
                <td className="p-4 text-slate-600">{bill.due}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    bill.status === '持有中' ? 'bg-green-100 text-green-700' :
                    bill.status === '已贴现' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'
                  }`}>{bill.status}</span>
                </td>
                <td className="p-4 text-center">
                   <button className="text-brand-600 hover:underline">详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h4 className="font-semibold mb-4 flex items-center gap-2">
             <QrCode className="w-4 h-4" /> 电子票据池
           </h4>
           <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
             票据池入池规则配置图表
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h4 className="font-semibold mb-4 flex items-center gap-2">
             <Archive className="w-4 h-4" /> 实物票据库存
           </h4>
           <div className="flex justify-between items-center p-3 border border-slate-100 rounded mb-2">
             <span>保险柜 A-01</span>
             <span className="text-sm text-slate-500">库存 0 张</span>
           </div>
           <div className="text-xs text-center text-slate-400 mt-2">集团已全面实现票据电子化</div>
        </div>
      </div>
    </div>
  );
};
