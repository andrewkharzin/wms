import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Package, AlertTriangle, Activity, Calendar, MoreHorizontal, TrendingUp, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const data = [
  { name: 'Mon', stock: 4000, orders: 240 },
  { name: 'Tue', stock: 3000, orders: 139 },
  { name: 'Wed', stock: 2000, orders: 980 },
  { name: 'Thu', stock: 2780, orders: 390 },
  { name: 'Fri', stock: 1890, orders: 480 },
  { name: 'Sat', stock: 2390, orders: 380 },
  { name: 'Sun', stock: 3490, orders: 430 },
];

const categoryData = [
  { name: 'Electronics', value: 400, color: '#6366f1' },
  { name: 'Industrial', value: 300, color: '#8b5cf6' },
  { name: 'Office', value: 300, color: '#ec4899' },
  { name: 'Materials', value: 200, color: '#10b981' },
];

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 p-3 rounded-xl shadow-2xl text-white">
        <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <p className="text-sm font-bold font-mono">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  isUp: boolean;
  icon: React.ReactNode;
  colorClass: string; // e.g., 'blue', 'emerald'
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, isUp, icon, colorClass, delay = 0 }) => {
  // Map color names to actual Tailwind classes for dynamic usage
  const bgSoft = {
    emerald: 'bg-emerald-50',
    blue: 'bg-blue-50',
    amber: 'bg-amber-50',
    purple: 'bg-purple-50',
  }[colorClass] || 'bg-slate-50';

  const textDark = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    amber: 'text-amber-600',
    purple: 'text-purple-600',
  }[colorClass] || 'text-slate-600';
  
  const ringColor = {
    emerald: 'ring-emerald-100',
    blue: 'ring-blue-100',
    amber: 'ring-amber-100',
    purple: 'ring-purple-100',
  }[colorClass] || 'ring-slate-100';

  return (
    <div 
      className="relative bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${bgSoft} opacity-50 blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-700`}></div>
      
      <div className="relative flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${bgSoft} ${textDark} ring-1 ${ringColor} shadow-sm group-hover:shadow-md transition-all`}>
            {icon}
          </div>
          <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${isUp ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend}
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
            <Calendar size={16} />
            <span>{currentDate}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Dashboard <span className="text-slate-300 font-light">Overview</span>
          </h1>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                <Calendar size={16} />
                <span>Last 7 Days</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                <Zap size={16} />
                <span>Quick Action</span>
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Inventory Value" 
          value="$1.2M" 
          trend="+12.5%" 
          isUp={true} 
          icon={<DollarSign size={24} />} 
          colorClass="emerald"
          delay={0}
        />
        <StatCard 
          title="Active Items" 
          value="1,452" 
          trend="+3.2%" 
          isUp={true} 
          icon={<Package size={24} />} 
          colorClass="blue"
          delay={100}
        />
        <StatCard 
          title="Critical Alerts" 
          value="12" 
          trend="Action Needed" 
          isUp={false} 
          icon={<AlertTriangle size={24} />} 
          colorClass="amber"
          delay={200}
        />
        <StatCard 
          title="Moderation Queue" 
          value="24" 
          trend="8 Pending" 
          isUp={false} 
          icon={<Activity size={24} />} 
          colorClass="purple"
          delay={300}
        />
      </div>

      {/* Bento Grid Layout for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-lg font-bold text-slate-900">Inventory Movement</h3>
                <p className="text-sm text-slate-500">Stock levels vs Order volume trends</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div className="h-80 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                    type="monotone" 
                    dataKey="stock" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorStock)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart & Secondary Widgets */}
        <div className="flex flex-col gap-6">
             {/* Category Chart */}
            <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex-1 min-h-[300px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Distrubution</h3>
                    <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        <TrendingUp size={12} />
                        <span>Optimized</span>
                    </div>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false}
                            tick={{fill: '#64748b', fontSize: 11, fontWeight: 500}} 
                            width={70}
                        />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                return (
                                    <div className="bg-slate-900 text-white text-xs py-1 px-2 rounded shadow-lg">
                                    {payload[0].value} Items
                                    </div>
                                );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Quick Stats / Mini Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Activity size={20} className="text-blue-300" />
                        </div>
                        <span className="text-sm font-medium text-slate-300">System Status</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <h4 className="text-2xl font-bold">98.9%</h4>
                        <span className="text-xs text-emerald-400 mb-1">Operational</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-400 to-emerald-400 w-[98%] h-full rounded-full"></div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardStats;