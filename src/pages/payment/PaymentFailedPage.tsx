import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="text-center py-16 px-4">
      <XCircle className="mx-auto text-red-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Plata a eșuat ❌</h2>
      <p className="text-muted-foreground mb-6">
        Din păcate, plata nu a fost finalizată. Poți reîncerca din profilul tău.
      </p>
      <a href="/autoflex-fe/profile" className="text-blue-600 underline">
        Înapoi la profil
      </a>
    </div>
  );
}
