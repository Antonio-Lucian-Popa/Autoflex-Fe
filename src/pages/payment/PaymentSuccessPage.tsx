import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="text-center py-16 px-4">
      <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Plata a fost realizată cu succes ✅</h2>
      <p className="text-muted-foreground mb-6">
        Rezervarea ta a fost confirmată. Vei primi un email cu detaliile.
      </p>
      <a href="/profile" className="text-blue-600 underline">
        Mergi la profilul tău
      </a>
    </div>
  );
}
