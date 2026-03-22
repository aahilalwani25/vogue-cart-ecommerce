import React from 'react';
import { motion } from 'motion/react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HomePresenterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  products: Product[];
}

const HomePresenter: React.FC<HomePresenterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  products,
}) => (
  <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
    <header className="mb-12">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-serif font-bold text-zinc-900 leading-tight"
      >
        Luxury <br />
        <span className="italic text-zinc-400">Redefined</span>
      </motion.h1>
      
      <div className="mt-8 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              activeCategory === cat 
                ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" 
                : "bg-white text-zinc-500 border border-zinc-100 hover:border-zinc-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default HomePresenter;
