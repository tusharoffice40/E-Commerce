
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Services from './pages/Services';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { CartItem, Service, User } from './types';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('e_services_user');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const handleLogin = (name: string, email: string) => {
    const newUser = { name, email, isLoggedIn: true };
    setUser(newUser);
    localStorage.setItem('e_services_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('e_services_user');
  };

  const handleAddToCart = (service: Service) => {
    setCart(prev => {
      const existing = prev.find(item => item.serviceId === service.id);
      if (existing) {
        return prev.map(item => 
          item.serviceId === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { serviceId: service.id, quantity: 1, service }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.serviceId !== id));
  };

  const handleUpdateQty = (id: string, qty: number) => {
    setCart(prev => prev.map(item => 
      item.serviceId === id ? { ...item, quantity: qty } : item
    ));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative bg-slate-50 text-slate-900">
        <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} user={user} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/checkout" element={<Checkout items={cart} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="col-span-2">
                 <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">E</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">E-Services</span>
                 </div>
                 <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                   Providing the highest quality digital services to businesses worldwide. Fueling your growth with digital fire.
                 </p>
                 <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-orange-600/20 transition-all border border-white/10 hover:border-orange-600/50 cursor-pointer flex items-center justify-center">
                      <Globe className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-orange-600/20 transition-all border border-white/10 hover:border-orange-600/50 cursor-pointer" />
                    <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-orange-600/20 transition-all border border-white/10 hover:border-orange-600/50 cursor-pointer" />
                 </div>
              </div>
              <div>
                <h4 className="font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Career</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Press Kit</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">Resources</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Support</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
              &copy; 2024 E-Services Inc. All rights reserved. Ignite your business potential.
            </div>
          </div>
        </footer>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cart} 
          onRemove={handleRemoveFromCart}
          onUpdateQty={handleUpdateQty}
        />
      </div>
    </Router>
  );
};

export default App;
