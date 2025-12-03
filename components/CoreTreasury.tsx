import React, { useState } from 'react';
import { CashFlowForecast, FXExposure } from '../types';
import { analyzeFXRisk } from '../services/geminiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, TrendingUp, ShieldAlert, Loader2, Sparkles } from 'lucide-react';

interface CoreTreasuryProps {
  forecastData: CashFlowForecast[];
  fxExposures: FXExposure[];
}

export const CoreTreasury: React.FC<CoreTreasuryProps> = ({ forecastData, fxExposures }) => {
  const [fxAnalysis, setFxAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeFX = async () => {
    setIsAnalyzing(true);
    const result = await analyzeFXRisk(fxExposures);
    setFxAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 外汇管理面板 - Priority 2 & 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                外汇风险管理 (FX Management)
              </h3>
              <p className="text-sm text-slate-500 mt-1">针对进口饲料/设备及境外融资</p>
            </div>
            <button 
              onClick={handleAnalyzeFX}
              disabled={isAnalyzing}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-100 transition-colors"
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              AI 风险诊断
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {fxExposures.map((fx, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded bg-white flex items-center justify-center font-bold text-slate-600 shadow-sm">
                     {fx.currency}
                   </div>
                   <div>
                     <p className="font-medium text-slate-800">{fx.type === 'IMPORT_PAYMENT' ? '进口付汇' : '境外债务'}</p>
                     <p className="text-xs text-slate-500">{fx.description}</p>
                   </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-slate-900">{fx.amount.toLocaleString()} {fx.currency}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${fx.hedgedRatio * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-500">已锁汇 {(fx.hedgedRatio * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Analysis Result */}
          {fxAnalysis && (
            <div className="mt-auto bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-sm">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Gemini 策略建议
              </h4>
              <div className="prose prose-sm prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: fxAnalysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          )}
        </div>

        {/* 流动性预测高级版 - Priority 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              流动性精细化预测
            </h3>
            <div className="flex gap-2">
               <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 预测值</span>
               <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-300"></div> 历史均值</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorNetCore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`¥${(value/10000).toFixed(0)}万`, '净现金流']}
                />
                <Area type="monotone" dataKey="net" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorNetCore)" />
                <Area type="monotone" dataKey="outflow" stroke="#cbd5e1" strokeWidth={1} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 风控稽核 - Priority 2 */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          风控与合规稽核 (Audit & Compliance)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-4 border border-red-100 bg-red-50 rounded-lg">
             <div className="text-red-800 font-medium mb-1">大额资金异常流出</div>
             <div className="text-3xl font-bold text-red-600">0</div>
             <p className="text-xs text-red-400 mt-2">实时监控中</p>
           </div>
           <div className="p-4 border border-amber-100 bg-amber-50 rounded-lg">
             <div className="text-amber-800 font-medium mb-1">银企直联中断警报</div>
             <div className="text-3xl font-bold text-amber-600">1</div>
             <p className="text-xs text-amber-500 mt-2">系统: 招商银行前置机</p>
           </div>
           <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
             <div className="text-blue-800 font-medium mb-1">授信额度占用率</div>
             <div className="text-3xl font-bold text-blue-600">68%</div>
             <p className="text-xs text-blue-500 mt-2">健康水平</p>
           </div>
        </div>
      </div>
    </div>
  );
};
