import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCheckoutDetails, createStripeCheckoutSession } from "@/services/api";

export default function CheckoutPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const startCheckout = async () => {
      try {
        const details = await getCheckoutDetails(bookingId!);

        const sessionUrl = await createStripeCheckoutSession({
          ...details,
          bookingId: bookingId!,
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-failed`,
        });

        window.location.href = sessionUrl;
      } catch (err) {
        console.error("Eroare la pornirea plății:", err);
        navigate("/payment-failed");
      }
    };

    if (bookingId) startCheckout();
  }, [bookingId]);

  return (
    <div className="text-center py-8">
      <h2 className="text-xl">Se inițiază plata, te rugăm așteaptă...</h2>
    </div>
  );
}
