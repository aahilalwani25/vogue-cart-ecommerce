import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import CartPresenter from '../components/CartPresenter';
import { withLayout } from '../hocs/withLayout';

const CartContainer: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id: string, delta: number) => {
    dispatch(updateQuantity({ id, delta }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <CartPresenter
      cart={cart}
      total={total}
      onUpdateQuantity={handleUpdateQuantity}
      onRemove={handleRemove}
    />
  );
};

export default withLayout(CartContainer);
