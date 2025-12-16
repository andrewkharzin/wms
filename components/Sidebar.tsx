import React from 'react';
import { LayoutDashboard, Package, Warehouse, Activity, AlertCircle, Settings, Users, Truck, Map, PanelLeft, LogOut, ShoppingBag } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'locations', label: 'Locations', icon: <Map size={20} /> },
    { id: 'warehouses', label: 'Warehouses', icon: <Warehouse size={20} /> },
    { id: 'movements', label: 'Movements', icon: <Truck size={20} /> },
    { id: 'moderation', label: 'Moderation', icon: <Activity size={20} /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertCircle size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div 
      className={`bg-slate-900/90 backdrop-blur-xl border-r border-white/10 text-white h-screen flex flex-col fixed left-0 top-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3 overflow-hidden whitespace-nowrap min-h-[88px]">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] flex-shrink-0">
          N
        </div>
        <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NexusAI</h1>
          <p className="text-xs text-slate-400">WMS v2.0</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden custom-scrollbar">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  activeTab === item.id
                    ? 'bg-blue-600/90 shadow-lg shadow-blue-500/20 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                {/* Active Indicator Glow */}
                 {activeTab === item.id && (
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent blur-md"></div>
                 )}

                <div className="relative z-10 flex-shrink-0">{item.icon}</div>
                
                <span className={`font-medium text-sm whitespace-nowrap transition-all duration-300 relative z-10 ${
                    isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}>
                    {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                        {item.label}
                    </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 bg-slate-800 border border-slate-600 text-slate-300 rounded-lg p-1.5 shadow-xl hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200 z-50 group"
      >
        <PanelLeft size={16} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative flex-shrink-0">
             <img src="https://picsum.photos/id/64/100/100" alt="User" className="w-9 h-9 rounded-full border-2 border-slate-600" />
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
          </div>
          
          <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
            <div className="flex items-center gap-2">
               <p className="text-sm font-medium text-white truncate">Alex Manager</p>
               <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">PRO</span>
            </div>
            <p className="text-xs text-slate-400 truncate">Central Hub</p>
          </div>
          
          {!isCollapsed && (
             <button className="text-slate-500 hover:text-white transition-colors">
                 <LogOut size={16} />
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;