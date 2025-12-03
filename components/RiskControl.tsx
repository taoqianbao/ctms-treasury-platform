
import React from 'react';
import { ShieldAlert, AlertTriangle, Activity, AlertOctagon, TrendingUp } from 'lucide-react';

export const RiskControl: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-xl border border-red-100 mb-6">
        <h3 className="text-xl font-bold text-red-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-600" />
          风险管理驾驶舱 (Risk Management)
        </h3>
        <p className="text-red-700 mt-2 text-sm">实时监控市场风险、信用风险及流动性风险，保障资金安全。</p>
      </div>

      {/* 风险概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-red-200 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-16 h-16 text-red-600" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800">市场风险 (Market)</h4>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">外汇敞口未对冲率</span>
                <span className="font-bold text-red-600">35%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">阈值: 30% (已超限)</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">利率波动敏感度</span>
                <span className="font-bold text-slate-700">低</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-amber-200 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertOctagon className="w-16 h-16 text-amber-600" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800">信用风险 (Credit)</h4>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
               <span className="text-sm text-slate-600">授信额度预警</span>
               <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">2 家</span>
             </div>
             <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
               <span className="text-sm text-slate-600">逾期账款</span>
               <span className="text-xs font-bold text-slate-700">¥0</span>
             </div>
             <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
               <AlertTriangle className="w-3 h-3" /> 北京鲜达经销商信用分下降
             </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-16 h-16 text-blue-600" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800">流动性风险 (Liquidity)</h4>
          </div>
          <div className="space-y-2">
            <div className="text-center py-2">
              <span className="block text-3xl font-bold text-slate-800">安全</span>
              <span className="text-xs text-slate-500">未来30天头寸充足</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-slate-500 border-t border-slate-100 pt-3">
               <div>
                 <span className="block font-medium text-slate-700">1.8X</span>
                 流动比率
               </div>
               <div>
                 <span className="block font-medium text-slate-700">1.2X</span>
                 速动比率
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 风险事件日志 */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h4 className="font-bold text-slate-800 mb-4">风险事件监控日志</h4>
        <div className="overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-3">风险类型</th>
                <th className="p-3">事件描述</th>
                <th className="p-3">发生时间</th>
                <th className="p-3">严重程度</th>
                <th className="p-3">处理状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-red-50/30">
                <td className="p-3 font-medium text-red-700">市场风险</td>
                <td className="p-3 text-slate-700">美元汇率波动突破 7.15 预警线</td>
                <td className="p-3 text-slate-500">2023-11-20 09:30:45</td>
                <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">高</span></td>
                <td className="p-3"><span className="text-slate-500">待处理</span></td>
              </tr>
              <tr className="hover:bg-amber-50/30">
                <td className="p-3 font-medium text-amber-700">操作风险</td>
                <td className="p-3 text-slate-700">非工作时间大额支付尝试 (¥500万)</td>
                <td className="p-3 text-slate-500">2023-11-19 22:15:10</td>
                <td className="p-3"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">中</span></td>
                <td className="p-3"><span className="text-green-600">已阻断</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-700">合规风险</td>
                <td className="p-3 text-slate-700">子公司账户余额调节表未按时上传</td>
                <td className="p-3 text-slate-500">2023-11-15 17:00:00</td>
                <td className="p-3"><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">低</span></td>
                <td className="p-3"><span className="text-green-600">已解决</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
