import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CheckoutFormProps {
  clientSecret: string;
}

export function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      navigate('/payment-failed');
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        navigate('/payment-success');
      } else {
        navigate('/payment-failed');
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="border p-4 rounded-md" />
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Se procesează..." : "Plătește acum"}
      </Button>
    </form>
  );
}
