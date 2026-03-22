import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import HomeContainer from './containers/HomeContainer';
import ProductDetailContainer from './containers/ProductDetailContainer';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import SuccessView from './components/SuccessView';

const App: React.FC = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/product/:id" element={<ProductDetailContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/checkout" element={<CheckoutContainer />} />
          <Route path="/success" element={<SuccessView />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
