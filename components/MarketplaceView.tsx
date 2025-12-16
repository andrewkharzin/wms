import React, { useState } from 'react';
import { Search, ShoppingBag, Star, Heart, Filter, ChevronRight } from 'lucide-react';
import { MOCK_ITEMS, MOCK_CATEGORIES } from '../constants';
import { Item } from '../types';

const MarketplaceView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

  const featuredItems = MOCK_ITEMS.filter(item => item.is_featured);
  const allItems = MOCK_ITEMS.filter(item => 
    (activeCategory === 'all' || item.category_id === activeCategory) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.seller_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-8 overflow-y-auto pr-2">
      
      {/* Search Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             <ShoppingBag className="text-blue-600" /> Marketplace
           </h2>
           <p className="text-slate-500 text-sm">Find equipment, parts, and materials from trusted sellers.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search marketplace..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
           </div>
           <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
             <Filter size={20} />
           </button>
        </div>
      </div>

      {/* Featured Section */}
      {featuredItems.length > 0 && !searchTerm && activeCategory === 'all' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={18} /> Featured Collection
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
               View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredItems.map(item => (
              <div key={item.id} className="relative group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                 {/* Background decoration */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 
                 <div className="relative z-10 flex flex-row gap-6 h-full items-center">
                    <div className="flex-1 space-y-4">
                       <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-200 text-xs font-bold rounded-full border border-blue-500/30">
                          FEATURED DEAL
                       </span>
                       <h4 className="text-2xl font-bold leading-tight">{item.title}</h4>
                       <p className="text-slate-300 text-sm line-clamp-2">{item.condition.replace('_', ' ')} condition. Sold by {item.seller_name}.</p>
                       <div className="flex items-center gap-4 pt-2">
                          <span className="text-2xl font-bold text-white">${item.price}</span>
                          <button className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                             View Details
                          </button>
                       </div>
                    </div>
                    <div className="w-1/3 aspect-square bg-white/10 rounded-xl p-2 backdrop-blur-sm border border-white/10">
                       <img src={item.image_url} alt={item.title} className="w-full h-full object-cover rounded-lg mix-blend-overlay opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categories Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
         <button 
           onClick={() => setActiveCategory('all')}
           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
             activeCategory === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
           }`}
         >
           All Items
         </button>
         {MOCK_CATEGORIES.map(cat => (
           <button 
             key={cat.id}
             onClick={() => setActiveCategory(cat.id)}
             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
               activeCategory === cat.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
             }`}
           >
             {cat.name}
           </button>
         ))}
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
        {allItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden rounded-t-xl">
               <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-colors">
                     <Heart size={16} />
                  </button>
               </div>
               {item.is_featured && (
                   <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> FEATURED
                   </div>
               )}
            </div>
            
            <div className="p-4 flex flex-col flex-1">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {item.category_id === 1 ? 'Electronics' : item.category_id === 2 ? 'Industrial' : 'Materials'}
                  </span>
               </div>
               
               <h3 className="font-bold text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
               
               {/* Seller Info */}
               <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <span>By {item.seller_name || 'NexusAI'}</span>
                  {item.seller_rating && (
                     <span className="flex items-center text-amber-500 font-medium">
                        <Star size={10} fill="currentColor" className="mr-0.5" /> {item.seller_rating}
                     </span>
                  )}
               </div>

               <div className="mt-auto flex items-end justify-between border-t border-slate-50 pt-4">
                  <div>
                     <span className="text-xs text-slate-400 block mb-0.5">Price</span>
                     <span className="text-xl font-bold text-slate-900">${item.price.toLocaleString()}</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                     Buy Now
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceView;