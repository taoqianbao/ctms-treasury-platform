
import React, { useState, useRef, useEffect } from 'react';
import { chatWithTreasuryAI } from '../services/geminiService';
import { 
  Sparkles, Send, Bot, User, RefreshCw, 
  AlertTriangle, TrendingUp, FileText,
  Menu, X
} from 'lucide-react';

interface AIAgentProps {
  contextData: any;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIAgent: React.FC<AIAgentProps> = ({ contextData }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: '您好，我是银河司库 AI 智能体。我已经连接到系统的 **13 个功能模块**。\n\n我可以为您：\n1. **诊断** 当前资金池与流动性风险。\n2. **分析** 外汇敞口与对冲策略。\n3. **审查** 供应链融资申请与合规性。\n4. **生成** 运营日报或月度简报。\n\n请问您今天需要处理什么任务？', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
    const responseText = await chatWithTreasuryAI(history, contextData);

    const aiMsg: Message = { role: 'ai', content: responseText || '抱歉，我暂时无法回答。', timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const quickActions = [
    { label: '全盘流动性诊断', prompt: '请分析当前全集团的现金管理情况和未来30天的流动性预测，指出是否存在缺口风险。', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
    { label: '外汇风险巡检', prompt: '检查当前的外汇敞口和汇率波动情况，评估已锁汇比例是否合理，并给出操作建议。', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { label: '生成司库日报', prompt: '基于当前所有模块的数据，为集团CFO生成一份今日司库运营简报，包含资金头寸、重要融资进展和风控预警。', icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
    { label: '系统集成状态', prompt: '检查运维管理模块中所有内外部系统的连接状态，特别是 SWIFT 和 银企直联是否正常。', icon: RefreshCw, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden relative">
      {/* Left Sidebar - Session/History (Simulated) */}
      <div className={`${showSidebar ? 'w-64 translate-x-0' : 'w-64 -translate-x-full absolute h-full z-10'} bg-white border-r border-slate-200 transition-transform duration-300 flex flex-col md:relative md:translate-x-0 md:w-64 lg:w-64`}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Bot className="w-5 h-5 text-brand-600" /> 智能体会话
          </h3>
          <button onClick={() => setMessages([messages[0]])} className="text-slate-400 hover:text-brand-600" title="新建会话">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="p-2 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium cursor-pointer truncate">
            当前会话
          </div>
          <div className="p-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm cursor-pointer truncate">
            昨日：流动性压力测试
          </div>
          <div className="p-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm cursor-pointer truncate">
            上周：WACC 优化方案
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
        
        {/* Toggle Sidebar Button (Mobile) */}
        <div className="md:hidden absolute top-4 left-4 z-20">
           <button 
             onClick={() => setShowSidebar(!showSidebar)}
             className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500"
           >
             {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pt-16 md:pt-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-brand-600" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-br-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
              }`}>
                {msg.role === 'ai' ? (
                  <div className="prose prose-sm prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
                <p className={`text-[10px] mt-2 opacity-60 text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>

              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
              )}
            </div>
          ))}
          
          {loading && (
             <div className="flex gap-4 justify-start">
               <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-brand-600 animate-pulse" />
               </div>
               <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                 <span className="text-sm text-slate-400 ml-2">正在分析 13 个模块的数据...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Actions & Input */}
        <div className="bg-white border-t border-slate-200 p-6">
          
          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(action.prompt)}
                  className="flex flex-col items-start p-3 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all text-left group bg-slate-50/50 hover:bg-white"
                >
                  <div className={`p-2 rounded-lg mb-2 ${action.color}`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm group-hover:text-brand-700">{action.label}</span>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{action.prompt}</p>
                </button>
              ))}
            </div>
          )}

          <div className="relative max-w-4xl mx-auto">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="输入您的指令，例如：'检查下周是否存在资金缺口' 或 '分析当前的WACC成本'"
              className="w-full pl-4 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none resize-none shadow-sm text-slate-700 placeholder-slate-400"
              rows={2}
            />
            <button 
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="absolute right-3 bottom-3 p-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            AI 智能体可能会产生错误。重要决策请以系统报表为准。
          </p>
        </div>
      </div>
    </div>
  );
};
