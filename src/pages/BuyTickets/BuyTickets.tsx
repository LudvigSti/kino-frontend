import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './buyTickets.css';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51QNt6A06aKVVhEveouzbYOMqgZzb93iRcisbeJijBnC3QRgzQQxVHRYbV6dZegTHqkJfIozGgTdmgZst8FZ4jXWl00HZhpwHup');

const BuyTickets: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
        billing_details: {
          name: formData.name,
          email: formData.email
        }
      });

      if (error) {
        setError(error.message || 'An error occurred');
        setSuccess(null);
      } else {
        setError(null);
        setSuccess('Payment successful!');
        console.log('PaymentMethod:', paymentMethod);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess(null);
    }
  };
  
  const cardElementOptions = {
    style: {
      base: {
        color: '#ffffff', // Change text color
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <div className='buy-tickets-page'>
      <div className='buy-tickets-card'>
        <h2>Buy Tickets</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label>Card Details</label>
            <CardElement options={cardElementOptions}/>
          </div>
          <button type='submit' className='buy-button' disabled={!stripe}>
            Buy Tickets
          </button>
          {error && <p className='error-message'>{error}</p>}
          {success && <p className='success-message'>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default BuyTickets;