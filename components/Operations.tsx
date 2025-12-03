
import React, { useState } from 'react';
import { SystemIntegration } from '../types';
import { 
  Server, Database, RefreshCw, CheckCircle2, Settings, Shield, 
  Globe, LayoutGrid, Network, Lock, FileText, Cpu, 
  MessageSquare, UserCog, Building2, CreditCard, Banknote, 
  FileCode, Sliders, Activity, Workflow, Key
} from 'lucide-react';

interface OpsProps {
  systems: SystemIntegration[];
}

export const Operations: React.FC<OpsProps> = ({ systems }) => {
  const [activeTab, setActiveTab] = useState<'integration' | 'management'>('integration');

  // 内部服务列表
  const internalServices = [
    { name: 'SAP ERP', status: 'normal', icon: Database, time: '实时' },
    { name: '数据中台', status: 'normal', icon: LayoutGrid, time: '5分钟前' },
    { name: '合同系统', status: 'normal', icon: FileText, time: '10分钟前' },
    { name: 'IAM (身份认证)', status: 'normal', icon: Lock, time: '实时' },
    { name: 'PS (项目管理)', status: 'idle', icon: Activity, time: '1小时前' },
    { name: 'CE (客户体验)', status: 'idle', icon: UserCog, time: '30分钟前' },
    { name: '电子签名', status: 'normal', icon: FileCode, time: '实时' },
    { name: 'IM 钉钉', status: 'normal', icon: MessageSquare, time: '实时' },
    { name: 'BPM (流程引擎)', status: 'normal', icon: Workflow, time: '实时' },
    { name: '人员中心 (HR)', status: 'normal', icon: UserCog, time: '2小时前' },
  ];

  // 外部服务列表
  const externalServices = [
    { name: '征信系统', status: 'normal', icon: SearchIcon, time: '按需' },
    { name: '金融机构 (银企直联)', status: 'syncing', icon: Building2, time: '同步中...' },
    { name: '人民银行 (PBOC)', status: 'normal', icon: Banknote, time: '每日' },
    { name: '外管局 (SAFE)', status: 'warning', icon: Globe, time: '连接超时' },
    { name: '电子发票', status: 'normal', icon: FileText, time: '实时' },
    { name: '票交所 (SHCPE)', status: 'normal', icon: CreditCard, time: '实时' },
    { name: '外汇服务', status: 'normal', icon: RefreshCw, time: '实时' },
    { name: '工商信息', status: 'idle', icon: Building2, time: '按需' },
    { name: '资讯信息', status: 'normal', icon: Network, time: '每小时' },
    { name: 'SWIFT', status: 'normal', icon: Globe, time: '实时' },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Server className="w-6 h-6 text-brand-600" />
            运维管理中心 (Operations)
          </h2>
          <p className="text-sm text-slate-500 mt-1">系统集成监控、基础数据配置与平台参数管理</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('integration')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'integration' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            系统集成监控
          </button>
          <button 
             onClick={() => setActiveTab('management')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'management' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            基础配置与参数
          </button>
        </div>
      </div>

      {activeTab === 'integration' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 内部服务 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-brand-50 border-b border-brand-100 flex justify-between items-center">
              <h3 className="font-bold text-brand-900 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-brand-600" />
                内部服务集成 (Internal)
              </h3>
              <span className="text-xs px-2 py-1 bg-white text-brand-600 rounded-full border border-brand-200">
                10/10 正常
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internalServices.map((svc, idx) => (
                <ServiceCard key={idx} service={svc} type="internal" />
              ))}
            </div>
          </div>

          {/* 外部服务 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex justify-between items-center">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                外部服务集成 (External)
              </h3>
              <span className="text-xs px-2 py-1 bg-white text-emerald-600 rounded-full border border-emerald-200">
                SWIFT 在线
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {externalServices.map((svc, idx) => (
                <ServiceCard key={idx} service={svc} type="external" />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'management' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 基础数据 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group hover:border-blue-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">基础数据管理</h3>
            <p className="text-sm text-slate-500 mb-4">管理客商档案、账户主数据、组织架构及科目映射关系。</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 客商名录维护</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 银行账户档案</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 汇率/利率字典</li>
            </ul>
          </div>

          {/* 工作流 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group hover:border-purple-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">工作流配置</h3>
            <p className="text-sm text-slate-500 mb-4">可视化配置资金支付、授信申请审批流程及节点权限。</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div> 流程模型设计器</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div> 审批节点与规则</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div> 待办/已办监控</li>
            </ul>
          </div>

          {/* 平台接口 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group hover:border-amber-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">平台接口管理</h3>
            <p className="text-sm text-slate-500 mb-4">API 网关配置、接口日志审计及第三方服务授权管理。</p>
             <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div> 接口授权与密钥</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div> 报文日志查询</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div> 异常重试策略</li>
            </ul>
          </div>

          {/* 系统配置 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group hover:border-slate-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-600 group-hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">系统配置</h3>
            <p className="text-sm text-slate-500 mb-4">全局角色权限管理、菜单配置、安全策略及审计日志。</p>
             <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> 角色与用户权限</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> 密码与安全策略</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> 系统操作日志</li>
            </ul>
          </div>

          {/* 平台参数 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group hover:border-green-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">平台参数配置</h3>
            <p className="text-sm text-slate-500 mb-4">业务规则参数、预警阈值设定及全局运行变量。</p>
             <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> 资金归集规则参数</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> 风险预警阈值</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> 定时任务调度</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

interface ServiceCardProps {
  service: any;
  type: 'internal' | 'external';
}

// Helper Component for Service Card
const ServiceCard: React.FC<ServiceCardProps> = ({ service, type }) => {
  const Icon = service.icon;
  const isInternal = type === 'internal';
  
  // Color logic
  const dotColor = service.status === 'normal' ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]' 
                 : service.status === 'syncing' ? 'bg-blue-500 animate-pulse'
                 : service.status === 'warning' ? 'bg-red-500'
                 : 'bg-slate-300';
  
  const textColor = service.status === 'warning' ? 'text-red-600' : 'text-slate-500';

  return (
    <div className="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
      <div className={`p-2 rounded-lg mr-3 ${isInternal ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium text-slate-800 text-sm truncate pr-2">{service.name}</h4>
          <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className={`${textColor}`}>{service.status === 'normal' ? '连接正常' : service.status === 'syncing' ? '同步中' : service.status === 'warning' ? '异常' : '空闲'}</span>
          <span className="text-slate-400 scale-90 origin-right">{service.time}</span>
        </div>
      </div>
    </div>
  );
};

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
