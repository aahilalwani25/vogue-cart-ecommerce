import React from 'react';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailPresenterProps {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
}

const ProductDetailPresenter: React.FC<ProductDetailPresenterProps> = ({
  product,
  onBack,
  onAddToCart,
}) => (
  <div className="pt-16 pb-32">
    <div className="relative aspect-[3/4] md:aspect-video overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    </div>

    <div className="px-6 -mt-10 relative z-10">
      <div className="bg-white rounded-t-[40px] p-8 shadow-2xl shadow-black/5 min-h-[50vh]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2">{product.category}</p>
            <h1 className="text-3xl font-serif font-bold text-zinc-900">{product.name}</h1>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${product.price}</p>
        </div>

        <p className="text-zinc-600 leading-relaxed mb-8 text-sm">
          {product.description}
        </p>

        <div className="space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Select Size</h3>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="w-12 h-12 rounded-xl border border-zinc-200 flex items-center justify-center font-medium hover:border-zinc-900 transition-colors">
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <button 
            onClick={onAddToCart}
            className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-200 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            <ShoppingBag className="w-6 h-6" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailPresenter;
