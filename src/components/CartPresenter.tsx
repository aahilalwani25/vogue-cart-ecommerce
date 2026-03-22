import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItemCard from './CartItemCard';
import { CartItem } from '../types';

interface CartPresenterProps {
  cart: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartPresenter: React.FC<CartPresenterProps> = ({
  cart,
  total,
  onUpdateQuantity,
  onRemove,
}) => (
  <div className="pt-24 pb-32 px-6 max-w-3xl mx-auto">
    <h1 className="text-3xl font-serif font-bold mb-8">Your Bag</h1>

    {cart.length === 0 ? (
      <div className="text-center py-20">
        <ShoppingBag className="w-16 h-16 text-zinc-200 mx-auto mb-4" />
        <p className="text-zinc-500 mb-8">Your bag is empty</p>
        <Link to="/" className="inline-block px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold">
          Start Shopping
        </Link>
      </div>
    ) : (
      <div className="space-y-6">
        {cart.map(item => (
          <CartItemCard 
            key={item.id} 
            item={item} 
            onUpdateQuantity={onUpdateQuantity} 
            onRemove={onRemove} 
          />
        ))}

        <div className="mt-12 p-8 bg-zinc-900 text-white rounded-[32px] space-y-6">
          <div className="flex justify-between text-zinc-400 text-sm">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-zinc-400 text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Link 
            to="/checkout"
            className="w-full bg-white text-zinc-900 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
          >
            Checkout <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )}
  </div>
);

export default CartPresenter;
