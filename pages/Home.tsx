
import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, MessageSquareCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, CATEGORIES } from '../constants';
import { getServiceRecommendation } from '../services/geminiService';

const Home: React.FC = () => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiConsult = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const recommendation = await getServiceRecommendation(aiPrompt);
    setAiResponse(recommendation || '');
    setIsAiLoading(false);
  };

  const featuredServices = SERVICES.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 text-orange-700 font-semibold text-sm border border-orange-100">
                <Zap className="w-4 h-4 mr-2" /> 
                New: AI-Powered Consultation 2.0
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Scale Your Business with <span className="text-orange-600">Digital Fire.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                Access premium development, design, and marketing services from top-tier digital artisans. Fast delivery, secure payments, and exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/services" className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all flex items-center justify-center">
                  Browse Services <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/about" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center">
                  How it Works
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 relative">
               <div className="bg-gradient-to-tr from-orange-500 to-red-600 rounded-3xl w-full aspect-square shadow-2xl overflow-hidden p-8 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full h-full border border-white/20">
                     <div className="flex items-center space-x-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                           <MessageSquareCode className="text-white w-6 h-6" />
                        </div>
                        <div className="h-4 w-32 bg-white/20 rounded-full" />
                     </div>
                     <div className="space-y-4">
                        <div className="h-6 w-full bg-white/30 rounded-lg animate-pulse" />
                        <div className="h-6 w-3/4 bg-white/20 rounded-lg animate-pulse" />
                        <div className="h-6 w-5/6 bg-white/20 rounded-lg animate-pulse" />
                     </div>
                  </div>
               </div>
               {/* Floating Badges */}
               <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                     <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 font-medium">Payment Secure</p>
                     <p className="text-sm font-bold text-slate-900">100% Protection</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-16 relative overflow-hidden text-white">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Not sure where to start?</h2>
            <p className="text-slate-400 mb-8">Tell our AI what your goal is, and we'll suggest the best services for you.</p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="I want to launch a new product online..."
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button 
                onClick={handleAiConsult}
                disabled={isAiLoading}
                className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
              >
                {isAiLoading ? 'Thinking...' : 'Consult AI'}
              </button>
            </div>

            {aiResponse && (
              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                <p className="text-orange-400 font-bold text-sm mb-2 uppercase tracking-wider">AI RECOMMENDATION</p>
                <p className="text-slate-200 italic leading-relaxed">"{aiResponse}"</p>
              </div>
            )}
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
             <div className="w-full h-full bg-gradient-to-bl from-orange-500 to-transparent" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Explore Categories</h2>
            <p className="text-slate-500 mt-2">Specialized services for every stage of your growth.</p>
          </div>
          <Link to="/services" className="text-orange-600 font-bold flex items-center hover:translate-x-1 transition-transform">
            View All <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat}
              to={`/services?category=${cat}`}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-50/50 hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                <Star className="text-orange-600 w-6 h-6 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-slate-900">{cat}</h3>
              <p className="text-xs text-slate-500 mt-1">10+ Services</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-orange-50/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Hot Deals & Trending</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Selected by businesses like yours for high performance and exceptional quality.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-orange-100 flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                    {service.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="text-sm font-bold text-slate-900">{service.rating}</span>
                    <span className="text-sm text-slate-400">({service.reviews})</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">${service.price}</span>
                      <span className="text-xs text-slate-400 block">per package</span>
                    </div>
                    <Link to={`/services/${service.id}`} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Active Users', val: '12K+' },
          { label: 'Services Completed', val: '45K+' },
          { label: 'Customer Rating', val: '4.9/5' },
          { label: 'Verified Experts', val: '250+' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2">{stat.val}</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
