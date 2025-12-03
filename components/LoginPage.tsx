
import React, { useState } from 'react';
import { User, Lock, QrCode, Building2, ArrowRight, Loader2, Smartphone, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<'account' | 'qrcode'>('account');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const handleSSO = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Left Brand Side - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-900 relative overflow-hidden items-center justify-center">
        {/* Abstract Background Overlay */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-600 to-purple-900 mix-blend-overlay"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        
        <div className="relative z-10 text-white p-12 max-w-lg">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl">
            <span className="text-4xl font-bold">银</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">银河司库</h1>
          <h2 className="text-2xl font-light text-brand-200 mb-6">智慧资金 · 价值创造</h2>
          <p className="text-lg text-brand-100 font-light leading-relaxed opacity-90">
            专为乳业集团打造的全球资金管理平台。<br/>
            集成资金归集、供应链金融与 AI 智能风控，<br/>保障企业资金安全，提升资本运营效率。
          </p>
          <div className="mt-12 flex flex-col gap-3 text-sm text-brand-300">
             <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-green-400" /> 通过等保三级安全认证</div>
             <div className="flex items-center gap-2"><Building2 className="w-5 h-5 text-blue-400" /> 支持集团多级账户体系</div>
          </div>
        </div>
      </div>

      {/* Right Login Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 lg:hidden">
             <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">银</div>
             <h2 className="text-2xl font-bold text-brand-900">银河司库管理系统</h2>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">欢迎回来</h2>
            <p className="text-slate-500">请选择登录方式进入司库工作台</p>
          </div>

          {/* Login Method Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button 
              onClick={() => setMethod('account')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                method === 'account' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User className="w-4 h-4" /> 账号登录
            </button>
            <button 
              onClick={() => setMethod('qrcode')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                method === 'qrcode' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <QrCode className="w-4 h-4" /> 扫码登录
            </button>
          </div>

          {method === 'account' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">企业账号 / 邮箱</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all"
                    placeholder="请输入员工账号"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">密码</label>
                  <a href="#" className="text-xs text-brand-600 hover:text-brand-700 font-medium">忘记密码?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all"
                    placeholder="请输入密码"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>安全登录 <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center py-6 animate-in fade-in zoom-in duration-300">
              <div className="bg-white p-4 rounded-2xl border-2 border-brand-100 shadow-sm mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="w-10 h-10 bg-white p-1 rounded-lg shadow-sm">
                      <div className="w-full h-full bg-brand-600 rounded flex items-center justify-center text-white font-bold">银</div>
                   </div>
                </div>
                {/* Mock QR Code Pattern */}
                <div className="w-40 h-40 bg-slate-900 opacity-90" style={{
                    maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M10 10h30v30h-30zM60 10h30v30h-30zM10 60h30v30h-30zM50 50h10v10h-10zM70 50h20v10h-20zM50 70h10v20h-10zM70 70h20v20h-20z\' fill=\'black\'/%3E%3C/svg%3E")',
                    maskSize: 'cover',
                    backgroundColor: '#0f172a'
                }}></div>
              </div>
              <p className="text-sm text-slate-500 mb-6 text-center">
                请使用 <span className="text-brand-600 font-bold">钉钉</span> 或 <span className="text-brand-600 font-bold">企业微信</span> <br/>扫描二维码安全登录
              </p>
              
              <div className="flex gap-4 w-full px-8">
                 <button onClick={handleSSO} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0089FF]/10 text-[#0089FF] rounded-lg text-sm font-medium hover:bg-[#0089FF]/20 transition-colors">
                   <Smartphone className="w-4 h-4" /> 钉钉
                 </button>
                 <button onClick={handleSSO} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4C84FC]/10 text-[#4C84FC] rounded-lg text-sm font-medium hover:bg-[#4C84FC]/20 transition-colors">
                   <Smartphone className="w-4 h-4" /> 企业微信
                 </button>
              </div>
            </div>
          )}

          {/* IAM SSO Separator */}
          <div className="mt-10 pt-6 border-t border-slate-100">
             <button 
                onClick={handleSSO}
                className="w-full group flex items-center justify-center gap-3 text-slate-600 hover:text-brand-600 transition-all py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-brand-200"
             >
               <div className="p-1 bg-slate-100 rounded group-hover:bg-brand-100 transition-colors">
                 <Building2 className="w-4 h-4" />
               </div>
               <span className="font-medium text-sm">使用集团 IAM 统一身份认证</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
