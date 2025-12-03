
import React from 'react';
import { 
  LayoutDashboard, Wallet, Tractor, ShieldAlert, FileSearch, Target, 
  Menu, Landmark, Briefcase, Globe, Users, ScrollText, 
  CalendarClock, Building2, Server, Bot, HelpCircle
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-brand-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}>
      <div className="h-16 flex items-center justify-center border-b border-brand-800">
        {isOpen ? (
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-900">
              银
            </div>
            银河司库平台
          </div>
        ) : (
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-900 font-bold">银</div>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto custom-scrollbar">
        <NavItem icon={<LayoutDashboard />} label="决策分析" isActive={activeTab === 'dashboard'} isExpanded={isOpen} onClick={() => setActiveTab('dashboard')} />
        
        {/* New AI Agent Menu Item */}
        <div className="my-2">
          <NavItem 
            icon={<Bot />} 
            label="AI 智能体" 
            isActive={activeTab === 'ai_agent'} 
            isExpanded={isOpen} 
            onClick={() => setActiveTab('ai_agent')} 
            isSpecial={true}
          />
        </div>
        
        <div className="py-2">
          {isOpen && <p className="px-3 text-[10px] font-bold text-brand-400 uppercase tracking-wider mb-1">融资与资本</p>}
          <NavItem icon={<Landmark />} label="融资管理" isActive={activeTab === 'financing'} isExpanded={isOpen} onClick={() => setActiveTab('financing')} />
          <NavItem icon={<Briefcase />} label="投资理财" isActive={activeTab === 'investment'} isExpanded={isOpen} onClick={() => setActiveTab('investment')} />
          <NavItem icon={<Globe />} label="外汇管理" isActive={activeTab === 'fx'} isExpanded={isOpen} onClick={() => setActiveTab('fx')} />
        </div>

        <div className="py-2">
          {isOpen && <p className="px-3 text-[10px] font-bold text-brand-400 uppercase tracking-wider mb-1">信贷与供应链</p>}
          <NavItem icon={<Users />} label="内部信贷" isActive={activeTab === 'internal_credit'} isExpanded={isOpen} onClick={() => setActiveTab('internal_credit')} />
          <NavItem icon={<Tractor />} label="供应链金融" isActive={activeTab === 'scf'} isExpanded={isOpen} onClick={() => setActiveTab('scf')} />
          <NavItem icon={<ScrollText />} label="票据管理" isActive={activeTab === 'bill'} isExpanded={isOpen} onClick={() => setActiveTab('bill')} />
        </div>

        <div className="py-2">
           {isOpen && <p className="px-3 text-[10px] font-bold text-brand-400 uppercase tracking-wider mb-1">资金与流动性</p>}
           <NavItem icon={<Wallet />} label="现金管理" isActive={activeTab === 'cash'} isExpanded={isOpen} onClick={() => setActiveTab('cash')} />
           <NavItem icon={<CalendarClock />} label="流动性管理" isActive={activeTab === 'liquidity'} isExpanded={isOpen} onClick={() => setActiveTab('liquidity')} />
        </div>

        <div className="py-2">
           {isOpen && <p className="px-3 text-[10px] font-bold text-brand-400 uppercase tracking-wider mb-1">风控与中后台</p>}
           <NavItem icon={<ShieldAlert />} label="风险管理" isActive={activeTab === 'risk'} isExpanded={isOpen} onClick={() => setActiveTab('risk')} />
           <NavItem icon={<FileSearch />} label="稽核管理" isActive={activeTab === 'audit'} isExpanded={isOpen} onClick={() => setActiveTab('audit')} />
           <NavItem icon={<Target />} label="指标管理" isActive={activeTab === 'kpi'} isExpanded={isOpen} onClick={() => setActiveTab('kpi')} />
           <NavItem icon={<Building2 />} label="客户关系" isActive={activeTab === 'crm'} isExpanded={isOpen} onClick={() => setActiveTab('crm')} />
           <NavItem icon={<Server />} label="运维管理" isActive={activeTab === 'ops'} isExpanded={isOpen} onClick={() => setActiveTab('ops')} />
        </div>

        {/* System & Help */}
        <div className="py-2 border-t border-brand-800 mt-2">
          {isOpen && <p className="px-3 text-[10px] font-bold text-brand-400 uppercase tracking-wider mb-1">系统支持</p>}
          <NavItem icon={<HelpCircle />} label="帮助中心" isActive={activeTab === 'help'} isExpanded={isOpen} onClick={() => setActiveTab('help')} />
        </div>
      </nav>

      <div className="p-4 border-t border-brand-800">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-brand-800 text-brand-100 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

// Sub-component for navigation items
const NavItem = ({ icon, label, isActive, isExpanded, onClick, isSpecial }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 mb-1 ${
      isActive 
        ? isSpecial ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' : 'bg-brand-600 text-white shadow-md shadow-brand-900/20' 
        : isSpecial ? 'text-purple-300 hover:bg-brand-800 hover:text-white' : 'text-brand-300 hover:bg-brand-800 hover:text-white'
    }`}
  >
    <div className={`${isActive ? 'text-white' : isSpecial ? 'text-purple-300' : 'text-brand-300'}`}>
      {React.cloneElement(icon, { size: 18 })}
    </div>
    {isExpanded && (
      <span className="font-medium text-sm whitespace-nowrap opacity-100 transition-opacity duration-300 flex items-center gap-2">
        {label}
        {isSpecial && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span></span>}
      </span>
    )}
  </button>
);
