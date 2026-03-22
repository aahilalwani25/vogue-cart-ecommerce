import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex gap-4 p-4 bg-white rounded-2xl border border-zinc-100">
    <img 
      src={item.image} 
      alt={item.name} 
      className="w-24 h-24 rounded-xl object-cover"
      referrerPolicy="no-referrer"
    />
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex justify-between">
        <h3 className="font-bold text-zinc-900 text-sm">{item.name}</h3>
        <button onClick={() => onRemove(item.id)}>
          <X className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
      <div className="flex justify-between items-end">
        <p className="font-bold text-emerald-600 text-sm">${item.price}</p>
        <div className="flex items-center gap-4 bg-zinc-50 rounded-lg px-3 py-1">
          <button onClick={() => onUpdateQuantity(item.id, -1)}>
            <Minus className="w-3 h-3 text-zinc-400" />
          </button>
          <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, 1)}>
            <Plus className="w-3 h-3 text-zinc-400" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CartItemCard;
