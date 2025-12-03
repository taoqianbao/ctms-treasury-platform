
import React from 'react';
import { BarChart3, TrendingUp, Target, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const IndicatorManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100 mb-6">
        <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          指标管理 (KPI Management)
        </h3>
        <p className="text-blue-700 mt-2 text-sm">构建多维度司库评价体系，量化资金运营效率与效益。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 指标卡片 - 资金效率 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Target className="w-5 h-5 text-brand-600" /> 资金运营效率指标
           </h4>
           <div className="space-y-4">
             <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                <div>
                   <p className="text-sm text-slate-500">资金集中度</p>
                   <div className="flex items-end gap-2 mt-1">
                      <span className="text-2xl font-bold text-slate-800">92.5%</span>
                      <span className="text-xs text-green-500 font-medium mb-1 flex items-center"><ArrowUpRight className="w-3 h-3"/> 2.1%</span>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">目标值</p>
                  <p className="font-semibold text-slate-600">90.0%</p>
                </div>
             </div>
             
             <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                <div>
                   <p className="text-sm text-slate-500">支付结算自动化率</p>
                   <div className="flex items-end gap-2 mt-1">
                      <span className="text-2xl font-bold text-slate-800">88.0%</span>
                      <span className="text-xs text-amber-500 font-medium mb-1 flex items-center"><ArrowDownRight className="w-3 h-3"/> 1.5%</span>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">目标值</p>
                  <p className="font-semibold text-slate-600">95.0%</p>
                </div>
             </div>

             <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                <div>
                   <p className="text-sm text-slate-500">资金计划准确率</p>
                   <div className="flex items-end gap-2 mt-1">
                      <span className="text-2xl font-bold text-slate-800">91.0%</span>
                      <span className="text-xs text-green-500 font-medium mb-1 flex items-center"><ArrowUpRight className="w-3 h-3"/> 0.5%</span>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">目标值</p>
                  <p className="font-semibold text-slate-600">90.0%</p>
                </div>
             </div>
           </div>
        </div>

        {/* 指标卡片 - 融资效益 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <TrendingUp className="w-5 h-5 text-emerald-600" /> 融资与收益指标
           </h4>
           <div className="space-y-4">
             <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                <div>
                   <p className="text-sm text-slate-500">综合融资成本 (年化)</p>
                   <div className="flex items-end gap-2 mt-1">
                      <span className="text-2xl font-bold text-emerald-700">3.45%</span>
                      <span className="text-xs text-green-500 font-medium mb-1 flex items-center">优于大盘</span>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">预算值</p>
                  <p className="font-semibold text-slate-600">3.50%</p>
                </div>
             </div>

             <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                <div>
                   <p className="text-sm text-slate-500">闲置资金理财收益率</p>
                   <div className="flex items-end gap-2 mt-1">
                      <span className="text-2xl font-bold text-emerald-700">2.85%</span>
                      <span className="text-xs text-slate-400 font-medium mb-1 flex items-center">持平</span>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">目标值</p>
                  <p className="font-semibold text-slate-600">2.80%</p>
                </div>
             </div>

             <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                <div>
                   <p className="text-sm text-slate-500">票据电子化率</p>
                   <div className="flex items-end gap-2 mt-1">
                      <span className="text-2xl font-bold text-slate-800">100%</span>
                   </div>
                </div>
                <div className="text-right">
                   <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">已达标</span>
                </div>
             </div>
           </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
           <PieChart className="w-5 h-5 text-indigo-600" /> 指标趋势分析 (近12个月)
        </h4>
        <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
          此处展示资金集中度与融资成本的历史趋势图表 (Chart)
        </div>
      </div>
    </div>
  );
};
