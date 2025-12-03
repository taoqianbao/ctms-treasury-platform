import React from 'react';
import { SystemIntegration } from '../types';
import { Server, Database, RefreshCw, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface IntegrationPortalProps {
  systems: SystemIntegration[];
}

export const IntegrationPortal: React.FC<IntegrationPortalProps> = ({ systems }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">融合集成控制中心</h2>
        <p className="text-slate-300">监控 SAP, SWIFT, CIPS 及银企直联状态，管理 EAS 历史数据迁移。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 系统连接状态 - Priority 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Server className="w-5 h-5 text-brand-600" />
            外部服务连接状态
          </h3>
          <div className="space-y-4">
            {systems.map(sys => (
              <div key={sys.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    sys.status === 'CONNECTED' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 
                    sys.status === 'SYNCING' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{sys.name}</h4>
                    <p className="text-xs text-slate-500">{sys.lastSync} • {sys.message}</p>
                  </div>
                </div>
                <div>
                   {sys.status === 'CONNECTED' ? (
                     <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-medium">正常运行</span>
                   ) : sys.status === 'SYNCING' ? (
                     <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                       <RefreshCw className="w-3 h-3 animate-spin" /> 同步中
                     </span>
                   ) : (
                     <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-medium">连接断开</span>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EAS 历史数据迁移 - Priority 4 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-amber-600" />
            EAS 历史数据迁移 (近三年)
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">总体进度</span>
                <span className="font-bold text-brand-600">85%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-brand-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">2021 财年数据</span>
                </div>
                <span className="text-xs text-green-700">完成归档</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">2022 财年数据</span>
                </div>
                <span className="text-xs text-green-700">完成归档</span>
              </div>

              <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm font-medium text-blue-900">2023 财年电子回单</span>
                </div>
                <span className="text-xs text-blue-700">正在校验哈希...</span>
              </div>

               <div className="flex items-center justify-between p-3 border border-slate-200 bg-slate-50 rounded-lg opacity-60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">数据一致性审计</span>
                </div>
                <span className="text-xs text-slate-500">等待迁移完成</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
