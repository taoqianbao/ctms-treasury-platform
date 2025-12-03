
import React, { useState } from 'react';
import { 
  Layers, Cpu, ShieldCheck, Zap, Database, Globe, 
  LayoutTemplate, Server, Bot, Box, Code, Lock, 
  BarChart3, CheckCircle2, Cloud
} from 'lucide-react';

export const HelpCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'architecture' | 'modules'>('intro');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">银河司库系统帮助中心</h1>
          <p className="text-brand-100 max-w-2xl text-lg">
            全方位了解系统架构、核心功能模块及产品价值，助力企业实现智慧资金管理。
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpenIcon className="w-48 h-48" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
        {[
          { id: 'intro', label: '产品优势与价值', icon: Zap },
          { id: 'modules', label: '核心功能模块', icon: LayoutTemplate },
          { id: 'architecture', label: '技术架构', icon: Code },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 min-h-[500px] p-8">
        
        {/* 1. 产品优势 */}
        {activeTab === 'intro' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">为什么选择银河司库？</h2>
              <p className="text-slate-500">
                专为大型乳制品制造企业打造，深度融合行业业务场景，采用最前沿的 AI 技术与微服务架构，
                保障资金安全，提升资本运作效率。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Bot className="w-6 h-6 text-purple-600" />}
                title="AI 智能驱动"
                desc="内置 Google Gemini 2.5 大模型，提供智能流动性预测、外汇风险诊断及自然语言交互助手，让数据会说话。"
                color="bg-purple-50"
              />
              <FeatureCard 
                icon={<Layers className="w-6 h-6 text-brand-600" />}
                title="全场景覆盖"
                desc="囊括融资、投资、现金、票据、供应链金融等 13 大核心业务模块，打通企业资金流转全脉络。"
                color="bg-brand-50"
              />
              <FeatureCard 
                icon={<Globe className="w-6 h-6 text-emerald-600" />}
                title="全球化视野"
                desc="支持多币种、多准则、多时区管理，无缝对接 SWIFT、CIPS 及境外银行，满足跨国集团管理需求。"
                color="bg-emerald-50"
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-6 h-6 text-red-600" />}
                title="金融级安全"
                desc="符合等保三级认证标准，提供全链路数据加密、风控预警及合规稽核，确保资金零风险。"
                color="bg-red-50"
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-amber-600" />}
                title="实时高效"
                desc="直连银行系统，实现账户余额、交易明细秒级同步，大额资金调拨实时到账，提升资金周转率。"
                color="bg-amber-50"
              />
              <FeatureCard 
                icon={<LayoutTemplate className="w-6 h-6 text-blue-600" />}
                title="行业定制化"
                desc="针对乳业特性（如牧场生物资产抵押、季节性原奶采购资金需求）深度定制业务流程与风控模型。"
                color="bg-blue-50"
              />
            </div>
          </div>
        )}

        {/* 2. 核心功能模块 */}
        {activeTab === 'modules' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
               <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <Box className="w-6 h-6 text-brand-600" /> 13 大核心功能版块
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[
                   { name: '融资管理', desc: '融资规划、策略模型、全流程执行及融后管理。' },
                   { name: '投资理财', desc: '理财产品台账、收益分析及结构性存款管理。' },
                   { name: '外汇管理', desc: '汇率风险敞口监控、锁汇对冲策略与交易。' },
                   { name: '内部信贷', desc: '成员单位内部借款、授信额度占用监控。' },
                   { name: '供应链金融', desc: '上下游（牧场/经销商）融资申请与 AI 风控。' },
                   { name: '票据管理', desc: '票据池全景视图、电票开票、贴现与托收。' },
                   { name: '现金管理', desc: '资金归集（现金池）、全球账户可视、收付结算。' },
                   { name: '流动性管理', desc: '现金流滚动预测、资金计划编制与预实分析。' },
                   { name: '风险管理', desc: '市场风险、信用风险及流动性风险驾驶舱。' },
                   { name: '稽核管理', desc: '资金业务合规检查、异常交易审计与整改追踪。' },
                   { name: '指标管理', desc: '建立多维度 KPI 体系，量化资金运营效率。' },
                   { name: '客户关系', desc: '金融机构评级授信与成员单位画像 (KYC)。' },
                   { name: '运维管理', desc: '系统集成监控 (SAP/SWIFT)、基础数据与配置。' },
                 ].map((mod, i) => (
                   <div key={i} className="flex items-start gap-3 p-4 border border-slate-100 rounded-lg hover:border-brand-200 hover:bg-slate-50 transition-colors group">
                     <div className="w-8 h-8 rounded bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm group-hover:bg-brand-600 group-hover:text-white transition-colors">
                       {i + 1}
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-800 mb-1">{mod.name}</h4>
                       <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* 3. 技术架构 */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-in fade-in duration-300">
             <div className="flex flex-col md:flex-row gap-8">
               
               {/* 左侧：架构图示 */}
               <div className="flex-1 space-y-6">
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <Server className="w-5 h-5 text-brand-600" /> 技术栈概览
                   </h3>
                   <ul className="space-y-3">
                     <TechItem label="前端框架" val="React 19 + TypeScript" desc="高性能组件化开发，类型安全" />
                     <TechItem label="UI 系统" val="Tailwind CSS" desc="原子化 CSS，快速构建现代化界面" />
                     <TechItem label="AI 引擎" val="Google Gemini 2.5" desc="Flash 模型，低延迟智能分析与对话" />
                     <TechItem label="数据可视化" val="Recharts" desc="响应式图表，支持复杂数据展示" />
                     <TechItem label="图标库" val="Lucide React" desc="轻量级、风格统一的 SVG 图标" />
                   </ul>
                 </div>

                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <Cloud className="w-5 h-5 text-blue-600" /> 部署与安全
                   </h3>
                   <ul className="space-y-3">
                     <li className="flex items-start gap-2 text-sm text-slate-600">
                       <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                       <span><strong>云原生架构</strong>：支持容器化部署 (Docker/K8s)，弹性伸缩。</span>
                     </li>
                     <li className="flex items-start gap-2 text-sm text-slate-600">
                       <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                       <span><strong>数据安全</strong>：传输层 SSL 加密，敏感数据 (PII) 脱敏存储。</span>
                     </li>
                     <li className="flex items-start gap-2 text-sm text-slate-600">
                       <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                       <span><strong>DevOps</strong>：集成 CI/CD 流水线，自动化测试与发布。</span>
                     </li>
                   </ul>
                 </div>
               </div>

               {/* 右侧：分层架构图 */}
               <div className="flex-1 bg-white p-6 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                  <h3 className="font-bold text-slate-400 mb-6 uppercase tracking-widest text-sm">系统分层架构图</h3>
                  
                  {/* Layer 1: Access */}
                  <div className="w-full max-w-sm bg-blue-50 border border-blue-200 rounded p-3 text-center mb-2">
                    <span className="text-xs font-bold text-blue-800">访问层 (Web / Mobile / API)</span>
                  </div>
                  <div className="h-4 w-0.5 bg-slate-300 mb-2"></div>

                  {/* Layer 2: Frontend */}
                  <div className="w-full max-w-sm bg-brand-50 border border-brand-200 rounded p-4 text-center mb-2 shadow-sm">
                    <span className="font-bold text-brand-800 block mb-2">前端应用层 (React SPA)</span>
                    <div className="grid grid-cols-3 gap-2 text-[10px]">
                      <div className="bg-white p-1 rounded border border-brand-100">路由管理</div>
                      <div className="bg-white p-1 rounded border border-brand-100">状态管理</div>
                      <div className="bg-white p-1 rounded border border-brand-100">UI 组件库</div>
                    </div>
                  </div>
                  <div className="h-4 w-0.5 bg-slate-300 mb-2"></div>

                  {/* Layer 3: Service */}
                  <div className="w-full max-w-sm bg-purple-50 border border-purple-200 rounded p-4 text-center mb-2 shadow-sm">
                    <span className="font-bold text-purple-800 block mb-2">服务集成层 (Service Layer)</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="bg-white p-1 rounded border border-purple-100 flex items-center justify-center gap-1">
                        <Bot className="w-3 h-3" /> Gemini AI Service
                      </div>
                      <div className="bg-white p-1 rounded border border-purple-100">Mock Data / API</div>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, desc, color }: any) => (
  <div className="p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const TechItem = ({ label, val, desc }: any) => (
  <div className="flex items-start gap-4 p-3 bg-white rounded-lg border border-slate-100">
    <div className="w-24 font-semibold text-slate-700 text-sm flex-shrink-0">{label}</div>
    <div>
      <div className="font-mono text-brand-700 text-sm font-bold">{val}</div>
      <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
    </div>
  </div>
);

function BookOpenIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
