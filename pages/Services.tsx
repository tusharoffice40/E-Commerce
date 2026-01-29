
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Star, ChevronDown } from 'lucide-react';
import { SERVICES, CATEGORIES } from '../constants';

const Services: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return 0; // Default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Professional Services</h1>
        <p className="text-slate-500">Find exactly what your project needs from our curated marketplace.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2 text-orange-600" /> Categories
              </h3>
              <div className="space-y-2">
                {['All', ...CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedCategory === cat 
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' 
                      : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
               <div className="bg-orange-600 rounded-2xl p-6 text-white text-center shadow-xl shadow-orange-100">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Need Custom Quote?</p>
                  <p className="text-sm mb-4">Can't find what you're looking for?</p>
                  <button className="w-full py-2 bg-white text-orange-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">Contact Support</button>
               </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
              />
            </div>

            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
              <div className="relative group">
                 <button className="flex items-center justify-between w-full sm:w-48 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all group-hover:border-orange-200">
                    {sortBy} <ChevronDown className="w-4 h-4 ml-2" />
                 </button>
                 <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden hidden group-hover:block z-20">
                    {['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating'].map(option => (
                      <button 
                        key={option}
                        onClick={() => setSortBy(option)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Link 
                key={service.id} 
                to={`/services/${service.id}`}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-orange-600 uppercase">
                    {service.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                    <span className="text-xs font-bold">{service.rating}</span>
                    <span className="text-xs text-slate-400">({service.reviews})</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-xs mb-4 line-clamp-2">{service.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xl font-bold text-slate-900">${service.price}</span>
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">View Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
               <p className="text-slate-500 font-medium">No services match your criteria.</p>
               <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-orange-600 font-bold"
               >
                 Clear all filters
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
