import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

const BottomNav: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-zinc-100 z-50 px-8 flex items-center justify-between md:hidden">
    <Link to="/" className="flex flex-col items-center gap-1 text-emerald-600">
      <Home className="w-6 h-6" />
      <span className="text-[10px] font-medium">Home</span>
    </Link>
    <div className="flex flex-col items-center gap-1 text-zinc-400">
      <Search className="w-6 h-6" />
      <span className="text-[10px] font-medium">Search</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-zinc-400">
      <ShoppingBag className="w-6 h-6" />
      <span className="text-[10px] font-medium">Orders</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-zinc-400">
      <User className="w-6 h-6" />
      <span className="text-[10px] font-medium">Profile</span>
    </div>
  </div>
);

export default BottomNav;
