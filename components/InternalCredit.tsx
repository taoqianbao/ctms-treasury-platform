
import React from 'react';
import { ArrowLeftRight, Users, Wallet } from 'lucide-react';

export const InternalCredit: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          内部信贷管理 (Internal Credit)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-700 mb-2">内部借款总览</h4>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-indigo-600">¥45.2亿</span>
              <span className="text-sm text-slate-500 mb-1">成员单位借款余额</span>
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-700 mb-2">内部授信占用</h4>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-slate-800">72%</span>
              <span className="text-sm text-slate-500 mb-1">总授信额度 ¥60亿</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-700 flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" /> 借款台账
          </h4>
          <div className="space-y-2">
            {[
              { borrower: '内蒙古生产基地', amount: 50000000, rate: '3.0%', term: '1年', status: '正常' },
              { borrower: '华南销售公司', amount: 20000000, rate: '3.0%', term: '6个月', status: '即将到期' },
              { borrower: '低温奶事业部', amount: 15000000, rate: '3.0%', term: '3个月', status: '正常' },
            ].map((loan, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                     <Wallet className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="font-medium text-slate-800">{loan.borrower}</p>
                     <p className="text-xs text-slate-500">利率 {loan.rate} • 期限 {loan.term}</p>
                   </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">¥{(loan.amount/10000).toLocaleString()}万</p>
                  <p className={`text-xs ${loan.status === '即将到期' ? 'text-red-500' : 'text-green-500'}`}>{loan.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
