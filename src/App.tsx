import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Home, 
  ChevronLeft, 
  Plus, 
  Minus, 
  X, 
  CreditCard, 
  Truck,
  CheckCircle2,
  ArrowRight,
  Heart
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PRODUCTS, Product, CartItem } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { addToCart, updateQuantity, removeFromCart, clearCart } from './store/cartSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Invalid zip code'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// --- Components ---

const Navbar = ({ cartCount }: { cartCount: number }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50 px-6 flex items-center justify-between">
    <Link to="/" className="font-serif text-2xl font-bold tracking-tight">VogueCart</Link>
    <div className="flex items-center gap-6">
      <Search className="w-5 h-5 text-zinc-500 cursor-pointer" />
      <Link to="/cart" className="relative">
        <ShoppingBag className="w-5 h-5 text-zinc-500" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  </nav>
);

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-zinc-100 z-50 px-8 flex items-center justify-between md:hidden">
    <Link to="/" className="flex flex-col items-center gap-1 text-emerald-600">
      <Home className="w-6 h-6" />
      <span className="text-[10px] font-medium">Home</span>
    </Link>
    <div className="flex flex-col items-center gap-1 text-zinc-400">
      <Search className="w-6 h-6" />
      <span className="text-[10px] font-medium">Search</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-zinc-400">
      <ShoppingBag className="w-6 h-6" />
      <span className="text-[10px] font-medium">Orders</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-zinc-400">
      <User className="w-6 h-6" />
      <span className="text-[10px] font-medium">Profile</span>
    </div>
  </div>
);

const ProductCard = ({ product }: { product: Product; key?: string }) => (
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

// --- Pages ---

const HomeView = () => {
  const categories = ['All', 'Apparel', 'Footwear', 'Accessories'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
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
              onClick={() => setActiveCategory(cat)}
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
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="pt-16 pb-32">
      <div className="relative aspect-[3/4] md:aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => navigate(-1)}
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
              onClick={() => {
                dispatch(addToCart(product));
                navigate('/cart');
              }}
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
};

const CartView = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
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
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-zinc-100">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <h3 className="font-bold text-zinc-900 text-sm">{item.name}</h3>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    <X className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <p className="font-bold text-emerald-600 text-sm">${item.price}</p>
                  <div className="flex items-center gap-4 bg-zinc-50 rounded-lg px-3 py-1">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}>
                      <Minus className="w-3 h-3 text-zinc-400" />
                    </button>
                    <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}>
                      <Plus className="w-3 h-3 text-zinc-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
};

const CheckoutForm = ({ total, formData }: { total: number; formData: CheckoutFormData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod'>('stripe');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (paymentMethod === 'cod') {
      await new Promise(r => setTimeout(r, 1500));
      dispatch(clearCart());
      navigate('/success');
      return;
    }

    if (!stripe || !elements) return;

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as any,
          billing_details: {
            name: formData.fullName,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.zipCode,
            }
          }
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        dispatch(clearCart());
        navigate('/success');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('stripe')}
            className={cn(
              "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
              paymentMethod === 'stripe' ? "border-emerald-600 bg-emerald-50/50" : "border-zinc-100 hover:border-zinc-200"
            )}
          >
            <CreditCard className={cn("w-6 h-6", paymentMethod === 'stripe' ? "text-emerald-600" : "text-zinc-400")} />
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", paymentMethod === 'stripe' ? "text-emerald-600" : "text-zinc-500")}>Stripe</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('cod')}
            className={cn(
              "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
              paymentMethod === 'cod' ? "border-emerald-600 bg-emerald-50/50" : "border-zinc-100 hover:border-zinc-200"
            )}
          >
            <Truck className={cn("w-6 h-6", paymentMethod === 'cod' ? "text-emerald-600" : "text-zinc-400")} />
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", paymentMethod === 'cod' ? "text-emerald-600" : "text-zinc-500")}>Cash on Delivery</span>
          </button>
        </div>
      </div>

      {paymentMethod === 'stripe' && (
        <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#18181b',
                fontFamily: 'Inter, sans-serif',
                '::placeholder': { color: '#a1a1aa' },
              },
            },
          }} />
        </div>
      )}

      {error && <p className="text-red-500 text-xs font-medium bg-red-50 p-4 rounded-xl">{error}</p>}

      <button
        type="submit"
        disabled={loading || (paymentMethod === 'stripe' && !stripe)}
        className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] transition-all"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>Pay ${total}</>
        )}
      </button>
    </form>
  );
};

const CheckoutView = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  return (
    <div className="pt-24 pb-32 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Shipping Address</h3>
          <div className="space-y-3">
            <div>
              <input 
                {...register('fullName')}
                type="text" 
                placeholder="Full Name" 
                className={cn(
                  "w-full p-4 bg-white rounded-xl border focus:outline-none transition-colors",
                  errors.fullName ? "border-red-500" : "border-zinc-100 focus:border-zinc-900"
                )} 
              />
              {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <input 
                {...register('email')}
                type="email" 
                placeholder="Email Address" 
                className={cn(
                  "w-full p-4 bg-white rounded-xl border focus:outline-none transition-colors",
                  errors.email ? "border-red-500" : "border-zinc-100 focus:border-zinc-900"
                )} 
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div>
              <input 
                {...register('address')}
                type="text" 
                placeholder="Street Address" 
                className={cn(
                  "w-full p-4 bg-white rounded-xl border focus:outline-none transition-colors",
                  errors.address ? "border-red-500" : "border-zinc-100 focus:border-zinc-900"
                )} 
              />
              {errors.address && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input 
                  {...register('city')}
                  type="text" 
                  placeholder="City" 
                  className={cn(
                    "w-full p-4 bg-white rounded-xl border focus:outline-none transition-colors",
                    errors.city ? "border-red-500" : "border-zinc-100 focus:border-zinc-900"
                  )} 
                />
                {errors.city && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.city.message}</p>}
              </div>

              <div>
                <input 
                  {...register('zipCode')}
                  type="text" 
                  placeholder="Zip Code" 
                  className={cn(
                    "w-full p-4 bg-white rounded-xl border focus:outline-none transition-colors",
                    errors.zipCode ? "border-red-500" : "border-zinc-100 focus:border-zinc-900"
                  )} 
                />
                {errors.zipCode && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.zipCode.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {isFormValid ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm total={total} formData={getValues()} />
          </Elements>
        ) : (
          <div className="p-8 bg-zinc-100 rounded-2xl text-center">
            <p className="text-zinc-400 text-sm">Please complete the shipping address to proceed to payment</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SuccessView = () => (
  <div className="h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 12 }}
      className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8"
    >
      <CheckCircle2 className="w-12 h-12" />
    </motion.div>
    <h1 className="text-3xl font-serif font-bold mb-4">Order Confirmed!</h1>
    <p className="text-zinc-500 mb-12 max-w-xs text-sm leading-relaxed">
      Thank you for your purchase. We've sent a confirmation email with your order details.
    </p>
    <Link to="/" className="w-full max-w-xs bg-zinc-900 text-white py-5 rounded-2xl font-bold shadow-xl shadow-zinc-200">
      Back to Shop
    </Link>
  </div>
);

// --- Main App ---

export default function App() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-50 flex flex-col">
        <Navbar cartCount={cartCount} />
        
        <main className="flex-1 pb-20 md:pb-0">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/checkout" element={<CheckoutView />} />
              <Route path="/success" element={<SuccessView />} />
            </Routes>
          </AnimatePresence>
        </main>

        <BottomNav />
      </div>
    </Router>
  );
}
