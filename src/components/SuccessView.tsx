import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SuccessView: React.FC = () => (
  <div className="min-h-screen bg-white flex items-center justify-center px-6">
    <div className="text-center max-w-sm">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
      </motion.div>
      <h1 className="text-3xl font-serif font-bold mb-4">Order Placed!</h1>
      <p className="text-zinc-500 mb-12 leading-relaxed">
        Your luxury pieces are being prepared for delivery. We've sent a confirmation to your email.
      </p>
      <Link 
        to="/" 
        className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-zinc-200"
      >
        Continue Shopping <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  </div>
);

export default SuccessView;
