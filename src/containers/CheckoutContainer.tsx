import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RootState } from '../store';
import { clearCart } from '../store/cartSlice';
import CheckoutFormPresenter from '../components/CheckoutFormPresenter';
import { withLayout } from '../hocs/withLayout';
import { withStripe } from '../hocs/withStripe';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Invalid zip code'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod'>('stripe');

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      if (paymentMethod === 'stripe') {
        if (!stripe || !elements) return;

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total * 100, email: data.email }),
        });

        const { clientSecret } = await response.json();

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement) as any,
            billing_details: {
              name: data.fullName,
              email: data.email,
              address: { line1: data.address, city: data.city, postal_code: data.zipCode },
            },
          },
        });

        if (result.error) {
          alert(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
          dispatch(clearCart());
          navigate('/success');
        }
      } else {
        // COD logic
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch(clearCart());
        navigate('/success');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>
      <CheckoutFormPresenter
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        onSubmit={handleSubmit(onSubmit)}
        loading={loading}
        total={total}
        register={register}
        errors={errors}
        isValid={isValid}
      />
    </div>
  );
};

export default withLayout(withStripe(CheckoutContainer));
