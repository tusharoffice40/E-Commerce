
import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, ChevronRight, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ items }) => {
  const [step, setStep] = useState(1);
  const total = items.reduce((sum, item) => sum + item.service.price * item.quantity, 0);
  const tax = total * 0.08;
  const finalTotal = total + tax;

  if (items.length === 0 && step !== 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Add some premium services to start your journey.</p>
        <button onClick={() => window.location.hash = '#/services'} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-100">Go to Shop</button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Order Confirmed!</h1>
          <p className="text-slate-500">Thank you for choosing E-Services. We've sent an order confirmation and details to your email address.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left">
           <div className="flex justify-between text-sm font-medium mb-2">
             <span className="text-slate-500">Order ID</span>
             <span className="text-slate-900 font-bold">#ES-98234-X</span>
           </div>
           <div className="flex justify-between text-sm font-medium">
             <span className="text-slate-500">Estimated Delivery</span>
             <span className="text-slate-900 font-bold">3-5 Business Days</span>
           </div>
        </div>
        <button 
          onClick={() => window.location.hash = '#/'}
          className="bg-slate-900 text-white w-full py-4 rounded-2xl font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress */}
          <div className="flex items-center space-x-4 mb-8">
             <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-slate-200 text-slate-500'}`}>1</div>
                <span className="font-bold text-sm text-slate-900">Shipping</span>
             </div>
             <div className="h-px w-8 bg-slate-200" />
             <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-slate-200 text-slate-500'}`}>2</div>
                <span className={`font-bold text-sm ${step >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>Payment</span>
             </div>
          </div>

          {step === 1 ? (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 animate-in fade-in slide-in-from-left duration-300">
               <h2 className="text-2xl font-bold mb-6 text-slate-900">Contact Information</h2>
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">First Name</label>
                   <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Last Name</label>
                   <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-sm font-bold text-slate-700">Email Address</label>
                   <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-sm font-bold text-slate-700">Business Name (Optional)</label>
                   <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                 </div>
               </div>
               <button 
                 onClick={() => setStep(2)}
                 className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 flex items-center justify-center group"
               >
                 Continue to Payment <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 animate-in fade-in slide-in-from-right duration-300">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-slate-900">Payment Method</h2>
                 <div className="flex space-x-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                 </div>
               </div>
               <div className="space-y-6">
                  <div className="p-4 border-2 border-orange-600 bg-orange-50 rounded-2xl flex items-center shadow-sm">
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4">
                       <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <p className="font-bold text-slate-900">Credit or Debit Card</p>
                       <p className="text-xs text-orange-600">Safe, secure, and encrypted</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Expiry Date</label>
                         <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">CVV</label>
                         <input type="text" placeholder="123" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                       </div>
                    </div>
                  </div>
               </div>
               <button 
                 onClick={() => setStep(3)}
                 className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-3 hover:bg-orange-700 transition-colors"
               >
                 <ShieldCheck className="w-5 h-5" />
                 <span>Pay ${finalTotal.toLocaleString()} Securely</span>
               </button>
               <button 
                 onClick={() => setStep(1)}
                 className="w-full text-slate-500 font-bold py-2 hover:text-orange-600 transition-colors"
               >
                 Back to Shipping
               </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-6 text-slate-900">Order Summary</h2>
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.serviceId} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                       <p className="font-bold text-slate-900 line-clamp-1">{item.service.title}</p>
                       <p className="text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900">${(item.service.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-slate-100 mb-8">
                 <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-slate-500 text-sm">
                    <span>Estimated Tax</span>
                    <span>${tax.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-slate-900 text-lg font-extrabold pt-3 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-orange-600">${finalTotal.toLocaleString()}</span>
                 </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-2xl text-xs text-orange-700 font-medium border border-orange-100">
                Our services are delivered digitally within the agreed timeframe. For refunds, please see our policy.
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
