
import React from 'react';
import { ShoppingCart, User, Search, Globe, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User as UserType } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  user: UserType | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
              <Globe className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              E-Services
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Services</Link>
            <Link to="/about" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Contact</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-orange-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenCart}
              className="p-2 text-slate-500 hover:text-orange-600 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user?.isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 p-2 text-slate-700 font-bold text-sm">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center space-x-1 p-2 text-slate-500 hover:text-orange-600 transition-colors">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
            
            <button 
              className="md:hidden p-2 text-slate-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-4">
          <Link to="/services" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/about" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          {user?.isLoggedIn ? (
            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block w-full text-left text-red-600 font-bold">Logout</button>
          ) : (
            <Link to="/login" className="block text-orange-600 font-bold" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
