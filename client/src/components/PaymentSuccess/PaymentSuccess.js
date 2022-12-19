import React, { useState } from 'react';
import Stripe from '@stripe/react-stripe-js';

export const PaymentSuccess = () => {
  const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSubmit = async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntent.create({
        amount: parseInt(req.body.price)*100,
        currency: 'usd',
          
      });
      paymentIntent(true);
      setPaymentSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (paymentSuccess) {
    return (
      <div>
        <h1>Payment Successful</h1>
        <p>Thank you for your payment!</p>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={handlePaymentSubmit}>Submit Payment</button>
      </div>
    );
  }
};

export default PaymentSuccess;

