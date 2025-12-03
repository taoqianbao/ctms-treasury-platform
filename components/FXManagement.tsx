
import React from 'react';
import { FXExposure } from '../types';
import { Globe, TrendingUp, DollarSign } from 'lucide-react';
import { analyzeFXRisk } from '../services/geminiService';

interface FXProps {
  exposures: FXExposure[];
}

export const FXManagement: React.FC<FXProps> = ({ exposures }) => {
  const [report, setReport] = React.useState<string>('');

  const runAnalysis = async () => {
    setReport('正在生成分析...');
    const res = await analyzeFXRisk(exposures);
    setReport(res);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100">
         <div className="flex gap-4">
           <div>
             <span className="text-xs text-slate-500 block">USD/CNY</span>
             <span className="text-lg font-bold text-slate-800">7.1245</span>
             <span className="text-xs text-green-500 ml-1">+0.05%</span>
           </div>
           <div>
             <span className="text-xs text-slate-500 block">EUR/CNY</span>
             <span className="text-lg font-bold text-slate-800">7.8530</span>
             <span className="text-xs text-red-500 ml-1">-0.12%</span>
           </div>
           <div>
             <span className="text-xs text-slate-500 block">NZD/CNY</span>
             <span className="text-lg font-bold text-slate-800">4.3520</span>
             <span className="text-xs text-slate-400 ml-1">0.00%</span>
           </div>
         </div>
         <button onClick={runAnalysis} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
           外汇风险诊断
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" /> 外汇敞口监控
          </h3>
          <div className="space-y-4">
            {exposures.map((fx, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-bold text-slate-700">{fx.currency} {fx.type}</div>
                  <div className="text-xs text-slate-500">{fx.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">{fx.amount.toLocaleString()}</div>
                  <div className="text-xs text-indigo-600">已锁汇 {(fx.hedgedRatio * 100).toFixed(0)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" /> 交易与对冲
          </h3>
          <div className="flex-1 bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
             {report ? (
               <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br/>') }} />
             ) : (
               <div className="text-center py-10 text-slate-400">
                 点击上方按钮获取 AI 对冲策略建议
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
