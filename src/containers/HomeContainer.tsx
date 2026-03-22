import React, { useState } from 'react';
import HomePresenter from '../components/HomePresenter';
import { PRODUCTS } from '../types';
import { withLayout } from '../hocs/withLayout';

const HomeContainer: React.FC = () => {
  const categories = ['All', 'Apparel', 'Footwear', 'Accessories'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <HomePresenter
      categories={categories}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      products={filteredProducts}
    />
  );
};

export default withLayout(HomeContainer);
