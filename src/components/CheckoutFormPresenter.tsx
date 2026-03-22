import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';

interface CheckoutFormPresenterProps {
  paymentMethod: 'stripe' | 'cod';
  onPaymentMethodChange: (method: 'stripe' | 'cod') => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  total: number;
  register: any;
  errors: any;
  isValid: boolean;
}

const CheckoutFormPresenter: React.FC<CheckoutFormPresenterProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  onSubmit,
  loading,
  total,
  register,
  errors,
  isValid,
}) => (
  <form onSubmit={onSubmit} className="space-y-8">
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Shipping Details</h3>
      <div className="grid gap-4">
        <input 
          {...register('fullName')}
          placeholder="Full Name" 
          className="w-full p-4 rounded-xl border border-zinc-200 focus:border-zinc-900 outline-none transition-colors"
        />
        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        
        <input 
          {...register('email')}
          type="email" 
          placeholder="Email Address" 
          className="w-full p-4 rounded-xl border border-zinc-200 focus:border-zinc-900 outline-none transition-colors"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        
        <input 
          {...register('address')}
          placeholder="Street Address" 
          className="w-full p-4 rounded-xl border border-zinc-200 focus:border-zinc-900 outline-none transition-colors"
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input 
              {...register('city')}
              placeholder="City" 
              className="w-full p-4 rounded-xl border border-zinc-200 focus:border-zinc-900 outline-none transition-colors"
            />
            {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
          </div>
          <div>
            <input 
              {...register('zipCode')}
              placeholder="Zip Code" 
              className="w-full p-4 rounded-xl border border-zinc-200 focus:border-zinc-900 outline-none transition-colors"
            />
            {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode.message}</p>}
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-bold text-lg">Payment Method</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onPaymentMethodChange('stripe')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            paymentMethod === 'stripe' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-500'
          }`}
        >
          <CreditCard className="w-6 h-6" />
          <span className="text-xs font-bold">Stripe</span>
        </button>
        <button
          type="button"
          onClick={() => onPaymentMethodChange('cod')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            paymentMethod === 'cod' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-500'
          }`}
        >
          <Truck className="w-6 h-6" />
          <span className="text-xs font-bold">Cash on Delivery</span>
        </button>
      </div>
    </div>

    {isValid && paymentMethod === 'stripe' && (
      <div className="space-y-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
        <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">Card Details</h3>
        <div className="p-4 bg-white rounded-xl border border-zinc-200">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#18181b',
                '::placeholder': { color: '#a1a1aa' },
              },
            },
          }} />
        </div>
      </div>
    )}

    <button
      type="submit"
      disabled={loading || !isValid}
      className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-zinc-200"
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          Pay ${total} <CheckCircle2 className="w-5 h-5" />
        </>
      )}
    </button>
  </form>
);

export default CheckoutFormPresenter;
