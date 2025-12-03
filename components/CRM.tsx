
import React from 'react';
import { Building, Users, CreditCard } from 'lucide-react';

export const CRM: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Building className="w-5 h-5 text-indigo-600" />
             金融机构管理 (Bank Relationship)
           </h3>
           <div className="space-y-4">
             {[
               { name: '工商银行', rating: 'AAA', limit: '200亿', used: '80亿', contact: '王经理 138xxxx' },
               { name: '招商银行', rating: 'AAA', limit: '150亿', used: '50亿', contact: '李行长 139xxxx' },
               { name: '农业银行', rating: 'AA+', limit: '100亿', used: '60亿', contact: '张主任 137xxxx' },
             ].map((bank, i) => (
               <div key={i} className="p-4 border border-slate-100 rounded-lg hover:shadow-sm transition-shadow">
                 <div className="flex justify-between items-start">
                   <div>
                     <h4 className="font-bold text-slate-800">{bank.name}</h4>
                     <p className="text-xs text-slate-500 mt-1">评级: {bank.rating} | 联系人: {bank.contact}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-medium text-slate-600">授信 {bank.limit}</p>
                      <p className="text-xs text-slate-400">已用 {bank.used}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Users className="w-5 h-5 text-brand-600" />
             成员单位画像 (Internal KYC)
           </h3>
            <div className="space-y-4">
             {[
               { name: '银河高科乳制品', role: '核心生产企业', account: 5, contribution: '高', risk: '低' },
               { name: '妙可蓝多食品', role: '控股子公司', account: 3, contribution: '中', risk: '中' },
               { name: '雅士利国际', role: '海外控股', account: 2, contribution: '低', risk: '中' },
             ].map((corp, i) => (
               <div key={i} className="p-4 border border-slate-100 rounded-lg bg-slate-50">
                 <div className="flex justify-between items-center">
                   <h4 className="font-bold text-slate-800">{corp.name}</h4>
                   <span className="text-xs px-2 py-1 bg-brand-100 text-brand-700 rounded">{corp.role}</span>
                 </div>
                 <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">账户数</p>
                      <p className="font-medium">{corp.account}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">资金贡献</p>
                      <p className="font-medium">{corp.contribution}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">风险等级</p>
                      <p className="font-medium">{corp.risk}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};
