import React, { useState } from 'react';
import { LoanApplication } from '../types';
import { evaluateLoanRisk } from '../services/geminiService';
import { Loader2, AlertCircle, CheckCircle, XCircle, Tractor, Store } from 'lucide-react';

interface SCFProps {
  loans: LoanApplication[];
}

export const SupplyChainFinance: React.FC<SCFProps> = ({ loans }) => {
  const [selectedLoan, setSelectedLoan] = useState<LoanApplication | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (loan: LoanApplication) => {
    setSelectedLoan(loan);
    setIsAnalyzing(true);
    setAiAnalysis('');
    
    // Simulate market context in Chinese
    const marketContext = "全球全脂奶粉价格保持稳定。国内饲料成本（玉米/豆粕）在上季度上涨了 5%。消费者对有机牛奶的需求呈上升趋势，高端液态奶市场表现强劲。";
    
    const analysis = await evaluateLoanRisk(loan, marketContext);
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Loan List */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">融资申请列表</h3>
          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{loans.length} 笔待处理</span>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {loans.map(loan => (
            <div 
              key={loan.id}
              onClick={() => handleAnalyze(loan)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedLoan?.id === loan.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {loan.type === 'UPSTREAM_FARMER' ? (
                    <Tractor className="w-4 h-4 text-green-600" />
                  ) : (
                    <Store className="w-4 h-4 text-orange-600" />
                  )}
                  <span className="font-medium text-slate-800">{loan.applicant}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">¥{(loan.amount / 10000).toFixed(0)}万</span>
              </div>
              <p className="text-xs text-slate-500 mb-2 truncate">{loan.collateral}</p>
              <div className="flex items-center justify-between text-xs">
                 <span className={`px-2 py-0.5 rounded text-white ${
                   loan.riskScore < 30 ? 'bg-green-500' : loan.riskScore < 70 ? 'bg-amber-500' : 'bg-red-500'
                 }`}>
                   风险分: {loan.riskScore}
                 </span>
                 <span className="text-slate-400">期限: {loan.termMonths} 个月</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail & AI Analysis */}
      <div className="flex-[1.5] bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
        {!selectedLoan ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Tractor className="w-16 h-16 mb-4 opacity-20" />
            <p>请选择一笔融资申请以查看 AI 风险评估</p>
          </div>
        ) : (
          <div className="p-6 flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{selectedLoan.applicant}</h2>
              <div className="flex gap-4 text-sm text-slate-500">
                <span>编号: {selectedLoan.id}</span>
                <span>类型: {selectedLoan.type === 'UPSTREAM_FARMER' ? '上游合作牧场' : '下游经销商'}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 uppercase">申请金额</p>
                <p className="text-lg font-semibold">¥{selectedLoan.amount.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 uppercase">抵押物</p>
                <p className="text-lg font-semibold truncate" title={selectedLoan.collateral}>{selectedLoan.collateral}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 uppercase">内部评分</p>
                <p className="text-lg font-semibold">{selectedLoan.riskScore}/100</p>
              </div>
            </div>

            <div className="flex-1 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <h3 className="font-semibold text-slate-800">Gemini 智能风控评估</h3>
              </div>

              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-3">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="text-sm text-slate-500 animate-pulse">正在分析生物资产估值及市场波动风险...</p>
                </div>
              ) : (
                <div className="prose prose-sm prose-slate max-w-none bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-y-auto max-h-[400px]">
                   {aiAnalysis ? (
                     <div dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   ) : (
                     <p className="text-slate-400 italic">等待分析...</p>
                   )}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="flex items-center px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                <XCircle className="w-4 h-4 mr-2" />
                驳回申请
              </button>
              <button className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm shadow-blue-200">
                <CheckCircle className="w-4 h-4 mr-2" />
                批准放款
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};