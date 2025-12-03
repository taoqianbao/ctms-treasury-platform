
import React from 'react';
import { TrendingUp, PieChart, Briefcase } from 'lucide-react';

export const Investment: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          投资理财管理 (Wealth Management)
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
              <p className="text-sm text-emerald-700">当前理财余额</p>
              <p className="text-3xl font-bold text-emerald-900 mt-1">¥12.80亿</p>
              <p className="text-xs text-emerald-600 mt-2">年化收益率 2.85%</p>
           </div>
           <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
              <p className="text-sm text-slate-600">结构性存款</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">¥8.00亿</p>
              <p className="text-xs text-slate-400 mt-2">保本型</p>
           </div>
           <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
              <p className="text-sm text-slate-600">货币基金</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">¥4.80亿</p>
              <p className="text-xs text-slate-400 mt-2">高流动性</p>
           </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
             <Briefcase className="w-4 h-4" /> 存续理财产品
          </h4>
          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-3 text-left">产品名称</th>
                  <th className="p-3 text-left">类型</th>
                  <th className="p-3 text-right">金额</th>
                  <th className="p-3 text-right">预期收益</th>
                  <th className="p-3 text-center">起息日</th>
                  <th className="p-3 text-center">到期日</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-medium">工银理财·法人"添利宝"</td>
                  <td className="p-3 text-slate-500">货币型</td>
                  <td className="p-3 text-right">¥20,000万</td>
                  <td className="p-3 text-right text-emerald-600">2.1%</td>
                  <td className="p-3 text-center">2023-11-01</td>
                  <td className="p-3 text-center">无固定期限</td>
                </tr>
                 <tr className="hover:bg-slate-50">
                  <td className="p-3 font-medium">招商银行结构性存款 (挂钩黄金)</td>
                  <td className="p-3 text-slate-500">结构性存款</td>
                  <td className="p-3 text-right">¥50,000万</td>
                  <td className="p-3 text-right text-emerald-600">1.85% - 3.0%</td>
                  <td className="p-3 text-center">2023-10-15</td>
                  <td className="p-3 text-center">2024-01-15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
