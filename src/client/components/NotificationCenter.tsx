
import React from 'react';
import { useAppContext } from '../AppContext';

const NotificationCenter: React.FC = () => {
  const { notifications, clearNotification } = useAppContext();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 w-full max-w-[340px] pointer-events-none px-4 sm:px-0">
      {notifications.map(n => (
        <div 
          key={n.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border animate-in slide-in-from-right-full duration-500 ease-out ${
            n.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' :
            n.type === 'alert' ? 'bg-rose-50 border-rose-100 text-rose-900' :
            n.type === 'match' ? 'bg-indigo-600 border-indigo-700 text-white ring-4 ring-indigo-500/20' :
            'bg-white border-slate-100 text-slate-800'
          }`}
        >
          {n.type === 'match' && (
            <div className="mt-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          )}
          <div className="flex-1 text-sm font-bold leading-tight">
            {n.message}
          </div>
          <button 
            onClick={() => clearNotification(n.id)}
            className={`p-1 rounded-full transition-colors ${n.type === 'match' ? 'hover:bg-white/20' : 'hover:bg-slate-100'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
