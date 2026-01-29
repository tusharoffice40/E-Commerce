
import React from 'react';
import { X, Trash2, ChevronRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + item.service.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-slate-900">Shopping Cart</h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <ShoppingBag className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-orange-600 font-bold hover:text-orange-700"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.serviceId} className="flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200">
                        <img src={item.service.image} alt={item.service.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-slate-900">
                          <h3 className="line-clamp-1 group-hover:text-orange-600 transition-colors">{item.service.title}</h3>
                          <p className="ml-4">${(item.service.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{item.service.category}</p>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border border-slate-200 rounded-md">
                            <button 
                              onClick={() => onUpdateQty(item.serviceId, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 hover:bg-orange-50 text-slate-600"
                            >-</button>
                            <span className="px-3 py-1 font-medium text-slate-900">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQty(item.serviceId, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-orange-50 text-slate-600"
                            >+</button>
                          </div>
                          <button 
                            onClick={() => onRemove(item.serviceId)}
                            className="flex items-center text-red-500 hover:text-red-600 font-medium"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <div className="border-t border-slate-200 py-6 px-4 sm:px-6 bg-slate-50">
              <div className="flex justify-between text-base font-semibold text-slate-900">
                <p>Subtotal</p>
                <p className="text-orange-600">${total.toLocaleString()}</p>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">Service fees and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-xl bg-orange-600 px-6 py-4 text-white font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all group"
                >
                  Checkout
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
