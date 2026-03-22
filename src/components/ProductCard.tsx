import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <Link to={`/product/${product.id}`}>
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            <Heart className="w-5 h-5 text-zinc-900" />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{product.category}</p>
        <h3 className="font-medium text-zinc-900 text-sm">{product.name}</h3>
        <p className="text-sm font-bold text-zinc-900">${product.price}</p>
      </div>
    </Link>
  </motion.div>
);

export default ProductCard;
