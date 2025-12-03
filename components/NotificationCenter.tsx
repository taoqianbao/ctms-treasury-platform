
import React, { useState } from 'react';
import { 
  X, Bell, CheckSquare, AlertTriangle, Info, 
  Server, FileText, CheckCircle2, Clock, ArrowRight 
} from 'lucide-react';
import { Notification, Task } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  tasks: Task[];
  onMarkRead: (id: string) => void;
  onHandleTask: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  isOpen, onClose, notifications, tasks, onMarkRead, onHandleTask 
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'tasks'>('notifications');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-brand-600" />
              消息与任务中心
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">集中处理待办事项与风险告警</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'notifications' 
                ? 'text-brand-600 bg-white' 
                : 'text-slate-500 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            消息通知
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-3 right-8 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
            <div className={`absolute bottom-0 left-0 w-full h-0.5 ${activeTab === 'notifications' ? 'bg-brand-600' : 'bg-transparent'}`}></div>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'tasks' 
                ? 'text-brand-600 bg-white' 
                : 'text-slate-500 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            待办任务
            {tasks.filter(t => t.status === 'PENDING').length > 0 && (
              <span className="absolute top-2 right-10 bg-brand-100 text-brand-700 text-[10px] px-1.5 rounded-full">
                {tasks.filter(t => t.status === 'PENDING').length}
              </span>
            )}
            <div className={`absolute bottom-0 left-0 w-full h-0.5 ${activeTab === 'tasks' ? 'bg-brand-600' : 'bg-transparent'}`}></div>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/50">
          
          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Bell className="w-10 h-10 mx-auto mb-2 opacity-20" />
                  <p>暂无新消息</p>
                </div>
              ) : (
                notifications.map(item => (
                  <div 
                    key={item.id} 
                    className={`relative p-4 rounded-xl border transition-all ${
                      item.read ? 'bg-white border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    {!item.read && <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>}
                    
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        item.level === 'HIGH' ? 'bg-red-50 text-red-600' : 
                        item.level === 'MEDIUM' ? 'bg-amber-50 text-amber-600' : 
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {item.type === 'RISK' ? <AlertTriangle className="w-5 h-5" /> : 
                         item.type === 'SYSTEM' ? <Server className="w-5 h-5" /> : 
                         <Info className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1 pr-4">
                          <h4 className={`font-semibold text-sm ${item.read ? 'text-slate-600' : 'text-slate-800'}`}>
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{item.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                          {!item.read && (
                            <button 
                              onClick={() => onMarkRead(item.id)}
                              className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                            >
                              标为已读
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <CheckSquare className="w-10 h-10 mx-auto mb-2 opacity-20" />
                  <p>待办事项已全部完成</p>
                </div>
              ) : (
                tasks.map(task => (
                  <div 
                    key={task.id} 
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-brand-200 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${
                        task.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                        task.priority === 'HIGH' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {task.priority === 'URGENT' ? '紧急' : task.priority === 'HIGH' ? '重要' : '普通'}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 截止: {task.dueDate}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{task.title}</h4>
                    <p className="text-xs text-slate-500 mb-3">{task.description}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <span className="text-xs text-brand-600 font-medium bg-brand-50 px-2 py-0.5 rounded">
                        {task.module}
                      </span>
                      <button 
                        onClick={() => onHandleTask(task.id)}
                        className="flex items-center gap-1 text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        去处理 <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
