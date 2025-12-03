
import React, { useState } from 'react';
import { 
  Landmark, FileSignature, PieChart, CalendarDays, 
  GitBranch, Briefcase, Archive, Search, 
  ArrowRight, Building2, Wallet, FileText, CheckSquare, 
  AlertCircle
} from 'lucide-react';

type FinancingTab = 'planning' | 'strategy' | 'execution' | 'channels' | 'post_lending';

export const Financing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FinancingTab>('planning');

  const tabs = [
    { id: 'planning', label: '融资规划', icon: CalendarDays },
    { id: 'strategy', label: '融资策略', icon: GitBranch },
    { id: 'execution', label: '方案执行', icon: FileSignature },
    { id: 'channels', label: '渠道管理', icon: Landmark },
    { id: 'post_lending', label: '融后管理', icon: Archive },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FinancingTab)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-brand-600 text-brand-600 bg-brand-50/50' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[500px]">
        
        {/* 1. 融资规划 */}
        {activeTab === 'planning' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">融资需求与规划管理</h3>
              <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700">
                + 新增需求
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                 <p className="text-sm text-blue-600 font-bold">2024年度资金缺口预测</p>
                 <p className="text-2xl font-bold text-blue-900 mt-2">¥58.2亿</p>
                 <p className="text-xs text-blue-500 mt-2">基于流动性预测模型</p>
               </div>
               <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                 <p className="text-sm text-amber-600 font-bold">待规划项目数</p>
                 <p className="text-2xl font-bold text-amber-900 mt-2">3 个</p>
                 <p className="text-xs text-amber-500 mt-2">牧场扩建/冷链物流</p>
               </div>
               <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <p className="text-sm text-emerald-600 font-bold">已规划覆盖率</p>
                 <p className="text-2xl font-bold text-emerald-900 mt-2">85%</p>
                 <p className="text-xs text-emerald-500 mt-2">剩余缺口 ¥8.7亿</p>
               </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-700 mb-4">需求管理列表</h4>
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-3 rounded-l-lg">需求编号</th>
                    <th className="p-3">项目名称</th>
                    <th className="p-3">需求金额</th>
                    <th className="p-3">用款时间</th>
                    <th className="p-3">规划状态</th>
                    <th className="p-3 rounded-r-lg">责任部门</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500">REQ-2023-088</td>
                    <td className="p-3 font-medium">和林格尔六期牧场建设</td>
                    <td className="p-3">¥12.0亿</td>
                    <td className="p-3">2024-Q2</td>
                    <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">已规划</span></td>
                    <td className="p-3">基建部</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500">REQ-2023-092</td>
                    <td className="p-3 font-medium">进口奶粉战略储备采购</td>
                    <td className="p-3">¥5.0亿</td>
                    <td className="p-3">2024-01</td>
                    <td className="p-3"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">规划中</span></td>
                    <td className="p-3">采购中心</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. 融资策略 */}
        {activeTab === 'strategy' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">融资策略与价值管理</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" /> 策略模型 (WACC优化)
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">权益融资成本 (Ke)</span>
                    <span className="font-bold text-slate-800">8.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">债务融资成本 (Kd, 税后)</span>
                    <span className="font-bold text-slate-800">2.8%</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">当前加权平均资本成本 (WACC)</span>
                    <span className="text-xl font-bold text-brand-600">4.25%</span>
                  </div>
                  <p className="text-xs text-slate-400">建议策略：适当增加低息银行长期借款，置换高息非标融资。</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" /> 融资方案库
                </h4>
                <div className="space-y-3">
                  <div className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="font-medium text-slate-800">2024年第一期绿色中期票据</p>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">拟发行</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">规模: 20亿 | 期限: 3+2年 | 预计利率: 2.9%</p>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="font-medium text-slate-800">银团贷款置换方案 (美元)</p>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">论证中</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">规模: $1.5亿 | 挂钩 SOFR | 汇率风险对冲</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. 方案执行 */}
        {activeTab === 'execution' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">融资全流程执行</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { name: '事项审批', count: 2, color: 'bg-blue-100 text-blue-700' },
                { name: '招投标管理', count: 1, color: 'bg-amber-100 text-amber-700' },
                { name: '合同签署', count: 5, color: 'bg-purple-100 text-purple-700' },
                { name: '提款管理', count: 1, color: 'bg-green-100 text-green-700' },
                { name: '信用证管理', count: 3, color: 'bg-pink-100 text-pink-700' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm text-slate-600 mb-1">{item.name}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.color}`}>
                    {item.count} 笔进行中
                  </span>
                </div>
              ))}
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                 <h4 className="font-semibold text-slate-700">执行任务看板</h4>
                 <div className="flex gap-2 text-sm text-slate-500">
                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> 审批中</span>
                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 待签署</span>
                 </div>
              </div>
              <div className="p-0">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="group hover:bg-slate-50">
                      <td className="p-4 w-1/4">
                        <div className="font-medium text-slate-800">中国银行流动资金贷款</div>
                        <div className="text-xs text-slate-500">额度支用申请</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500" style={{width: '80%'}}></div>
                           </div>
                           <span className="text-xs text-slate-600">合同已签署，待提款</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">执行中</span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-brand-600 hover:underline">提款</button>
                      </td>
                    </tr>
                    <tr className="group hover:bg-slate-50">
                      <td className="p-4 w-1/4">
                        <div className="font-medium text-slate-800">超短期融资券 (SCP)</div>
                        <div className="text-xs text-slate-500">公开市场发行</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-amber-500" style={{width: '40%'}}></div>
                           </div>
                           <span className="text-xs text-slate-600">交易商协会注册中</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">审批中</span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-brand-600 hover:underline">跟进</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. 渠道管理 */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">内外部融资渠道管理</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 内部融资 */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                     <Building2 className="w-5 h-5" />
                   </div>
                   <h4 className="font-bold text-slate-800">内部融资 (资金池)</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">通过集团资金池归集资金，支持成员单位间调剂。</p>
                <div className="space-y-2">
                   <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                     <span className="text-sm font-medium">内部借款总额</span>
                     <span className="font-bold text-slate-800">¥45.2亿</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                     <span className="text-sm font-medium">平均内部利率</span>
                     <span className="font-bold text-slate-800">2.95%</span>
                   </div>
                </div>
              </div>

              {/* 外部融资 */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                     <Landmark className="w-5 h-5" />
                   </div>
                   <h4 className="font-bold text-slate-800">外部融资 (银行/市场)</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">银行授信、债券发行及资本市场融资。</p>
                <div className="space-y-2">
                   <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                     <span className="text-sm font-medium">外部授信总额</span>
                     <span className="font-bold text-slate-800">¥500亿</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                     <span className="text-sm font-medium">已用额度</span>
                     <span className="font-bold text-purple-600">¥128亿 (25.6%)</span>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4">
               <h4 className="font-bold text-slate-700 mb-3">主力合作银行</h4>
               <div className="flex gap-4">
                 {['中国工商银行', '农业银行', '招商银行', '汇丰银行'].map((bank, i) => (
                   <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded text-sm text-slate-600">
                     {bank}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* 5. 融后管理 */}
        {activeTab === 'post_lending' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">融后全生命周期管理</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
               <div className="p-4 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow cursor-pointer">
                 <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2">
                   <Wallet className="w-4 h-4 text-green-600" /> 台账管理
                 </h4>
                 <p className="text-xs text-slate-500 mb-2">融资合同、提款记录及还款计划表。</p>
                 <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">查看台账</span>
               </div>
               <div className="p-4 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow cursor-pointer">
                 <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2">
                   <CheckSquare className="w-4 h-4 text-blue-600" /> 监管备案
                 </h4>
                 <p className="text-xs text-slate-500 mb-2">外债备案登记、上市公司信息披露关联。</p>
                 <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">3 笔待备案</span>
               </div>
               <div className="p-4 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow cursor-pointer">
                 <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2">
                   <Archive className="w-4 h-4 text-amber-600" /> 档案管理
                 </h4>
                 <p className="text-xs text-slate-500 mb-2">合同扫描件、抵押物权证电子化归档。</p>
                 <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">进入档案室</span>
               </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" /> 近期还本付息提醒
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-200 border-l-4 border-l-red-500">
                   <div>
                     <p className="font-bold text-slate-800">招商银行流动资金贷款利息</p>
                     <p className="text-xs text-slate-500">2023-11-20 (3天后)</p>
                   </div>
                   <span className="font-bold text-slate-900">¥1,250,000.00</span>
                </div>
                 <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-200 border-l-4 border-l-amber-500">
                   <div>
                     <p className="font-bold text-slate-800">工银租赁本金偿还</p>
                     <p className="text-xs text-slate-500">2023-11-25 (8天后)</p>
                   </div>
                   <span className="font-bold text-slate-900">¥5,000,000.00</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
