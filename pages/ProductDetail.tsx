
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Clock, Share2, Heart, CheckCircle2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { generateServicePitch } from '../services/geminiService';

interface ProductDetailProps {
  onAddToCart: (service: Service) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);
  const [pitch, setPitch] = useState<string>('');
  const [isPitchLoading, setIsPitchLoading] = useState(false);

  useEffect(() => {
    const fetchPitch = async () => {
      if (service) {
        setIsPitchLoading(true);
        const p = await generateServicePitch(service.title);
        setPitch(p || '');
        setIsPitchLoading(false);
      }
    };
    fetchPitch();
  }, [service]);

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Service not found</h2>
        <Link to="/services" className="text-orange-600 font-bold">Back to services</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-500 hover:text-orange-600 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Images */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
             {[0,1,2].map(i => (
               <div key={i} className="aspect-video rounded-2xl bg-slate-200 overflow-hidden">
                 <img src={service.image} alt="Thumbnail" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
               <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider border border-orange-100">
                  {service.category}
               </span>
               <div className="flex items-center space-x-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100">
                  <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  <span>{service.rating} ({service.reviews} reviews)</span>
               </div>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{service.title}</h1>
            <p className="text-xl text-slate-500 leading-relaxed">{service.description}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden shadow-xl">
             <div className="relative z-10">
                <p className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-2">Our AI Take</p>
                <p className="italic text-slate-300">
                   {isPitchLoading ? 'Generating a customized pitch for you...' : `"${pitch}"`}
                </p>
             </div>
             <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600 blur-[60px] opacity-30" />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center">
               <CheckCircle2 className="w-5 h-5 mr-2 text-orange-600" /> Included in this package
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-slate-600 text-sm">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-4xl font-extrabold text-slate-900">${service.price}</span>
                <span className="text-slate-500 text-sm ml-2">Total Price</span>
              </div>
              <div className="flex items-center space-x-3">
                 <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                 </button>
                 <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
            
            <button 
              onClick={() => onAddToCart(service)}
              className="w-full flex items-center justify-center space-x-3 bg-orange-600 text-white py-5 rounded-3xl font-bold text-lg shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Add to Cart</span>
            </button>
            
            <div className="mt-6 flex flex-wrap gap-6 items-center justify-center text-slate-400 text-sm font-medium">
               <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Secure Payment</span>
               <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Express Delivery Available</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-24 pt-16 border-t border-slate-200">
         <h2 className="text-2xl font-bold text-slate-900 mb-8">Detailed Service Overview</h2>
         <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed text-lg">
               {service.longDescription}
            </p>
         </div>
      </section>
    </div>
  );
};

export default ProductDetail;
