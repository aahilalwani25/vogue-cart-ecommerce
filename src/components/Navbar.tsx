import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50 px-6 flex items-center justify-between">
    <Link to="/" className="font-serif text-2xl font-bold tracking-tight">VogueCart</Link>
    <div className="flex items-center gap-6">
      <Search className="w-5 h-5 text-zinc-500 cursor-pointer" />
      <Link to="/cart" className="relative">
        <ShoppingBag className="w-5 h-5 text-zinc-500" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  </nav>
);

export default Navbar;
