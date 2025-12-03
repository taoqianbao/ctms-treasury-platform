
import React from 'react';
import { FileSearch, CheckCircle2, Clock, AlertCircle, FileCheck } from 'lucide-react';

export const AuditManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-xl border border-amber-100 mb-6">
        <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
          <FileSearch className="w-6 h-6 text-amber-600" />
          稽核管理中心 (Audit & Compliance)
        </h3>
        <p className="text-amber-700 mt-2 text-sm">全流程资金业务合规性检查、异常交易审计及整改追踪。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
           <div className="text-slate-500 text-sm mb-1">本月稽核任务</div>
           <div className="text-2xl font-bold text-slate-800">12 项</div>
           <div className="text-xs text-green-600 mt-2 flex items-center">
             <CheckCircle2 className="w-3 h-3 mr-1" /> 已完成 8 项
           </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
           <div className="text-slate-500 text-sm mb-1">发现问题数</div>
           <div className="text-2xl font-bold text-red-600">3 个</div>
           <div className="text-xs text-slate-400 mt-2">较上月减少 2 个</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
           <div className="text-slate-500 text-sm mb-1">整改完成率</div>
           <div className="text-2xl font-bold text-amber-600">85%</div>
           <div className="text-xs text-slate-400 mt-2">1 个待整改</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
           <div className="text-slate-500 text-sm mb-1">制度合规率</div>
           <div className="text-2xl font-bold text-blue-600">99.8%</div>
           <div className="text-xs text-slate-400 mt-2">资金支付流程</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
           <FileCheck className="w-5 h-5 text-slate-600" /> 在线稽核计划执行表
        </h4>
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 text-left">稽核项目名称</th>
                <th className="p-4 text-left">稽核对象/部门</th>
                <th className="p-4 text-center">开始时间</th>
                <th className="p-4 text-center">进度</th>
                <th className="p-4 text-center">状态</th>
                <th className="p-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-medium text-slate-800">资金支付审批流程合规性专项</div>
                  <div className="text-xs text-slate-400 mt-0.5">编号: AUD-2023-11-01</div>
                </td>
                <td className="p-4 text-slate-600">全集团 / 内控部</td>
                <td className="p-4 text-center text-slate-500">2023-11-01</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full">
                       <div className="bg-green-500 h-1.5 rounded-full" style={{width: '100%'}}></div>
                    </div>
                    <span className="text-xs">100%</span>
                  </div>
                </td>
                <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">已完成</span></td>
                <td className="p-4 text-center text-brand-600 cursor-pointer hover:underline">查看报告</td>
              </tr>
              
              <tr className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-medium text-slate-800">银行账户年检与久悬户清理</div>
                  <div className="text-xs text-slate-400 mt-0.5">编号: AUD-2023-11-05</div>
                </td>
                <td className="p-4 text-slate-600">资金结算中心</td>
                <td className="p-4 text-center text-slate-500">2023-11-10</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full">
                       <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-xs">45%</span>
                  </div>
                </td>
                <td className="p-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center justify-center gap-1"><Clock className="w-3 h-3"/> 进行中</span></td>
                <td className="p-4 text-center text-brand-600 cursor-pointer hover:underline">跟进</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-medium text-slate-800">大额资金调拨事后抽查</div>
                  <div className="text-xs text-slate-400 mt-0.5">编号: AUD-2023-11-08</div>
                </td>
                <td className="p-4 text-slate-600">财务共享中心</td>
                <td className="p-4 text-center text-slate-500">--</td>
                <td className="p-4 text-center">
                   <div className="flex items-center justify-center gap-2">
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full"></div>
                    <span className="text-xs text-slate-400">0%</span>
                  </div>
                </td>
                <td className="p-4 text-center"><span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs">未开始</span></td>
                <td className="p-4 text-center text-brand-600 cursor-pointer hover:underline">启动</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
         <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
         <div>
           <h5 className="font-bold text-red-800 text-sm">待整改问题 (2)</h5>
           <ul className="list-disc list-inside text-sm text-red-700 mt-1 space-y-1">
             <li>子公司 A 银行印鉴卡保管不符合双人双锁规定。</li>
             <li>部分银企直联付款单据缺少电子回单附件。</li>
           </ul>
         </div>
      </div>
    </div>
  );
};
