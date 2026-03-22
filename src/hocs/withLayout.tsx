import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col">
        <Navbar cartCount={cartCount} />
        <main className="flex-1 pb-20 md:pb-0">
          <WrappedComponent {...props} />
        </main>
        <BottomNav />
      </div>
    );
  };
};
