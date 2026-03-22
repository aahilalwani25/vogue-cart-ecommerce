import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { PRODUCTS } from '../types';
import ProductDetailPresenter from '../components/ProductDetailPresenter';
import { withLayout } from '../hocs/withLayout';

const ProductDetailContainer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  return (
    <ProductDetailPresenter
      product={product}
      onBack={() => navigate(-1)}
      onAddToCart={handleAddToCart}
    />
  );
};

export default withLayout(ProductDetailContainer);
