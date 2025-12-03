
import React from 'react';
import { CashFlowForecast } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarClock, BarChart3 } from 'lucide-react';

interface LiquidityProps {
  forecastData: CashFlowForecast[];
}

export const Liquidity: React.FC<LiquidityProps> = ({ forecastData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-blue-600" />
            现金流滚动预测 (Rolling Forecast)
          </h3>
          <div className="flex gap-2 text-sm">
            <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded">按日</button>
            <button className="px-3 py-1 text-slate-500 hover:bg-slate-100 rounded">按周</button>
            <button className="px-3 py-1 text-slate-500 hover:bg-slate-100 rounded">按月</button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                formatter={(value: number) => [`¥${(value/10000).toFixed(0)}万`, '净流量']}
              />
              <Area type="monotone" dataKey="net" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <h4 className="font-semibold mb-4">资金计划编制</h4>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
               <span>月度资金计划 (2023-11)</span>
               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">已审批</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
               <span>月度资金计划 (2023-12)</span>
               <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">编制中</span>
             </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <h4 className="font-semibold mb-4">预实分析</h4>
          <div className="flex items-center gap-4">
             <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center border-t-green-500">
               <span className="font-bold">95%</span>
             </div>
             <div>
               <p className="text-sm text-slate-500">上月预测准确率</p>
               <p className="text-sm font-medium">偏差金额: ¥520万</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
