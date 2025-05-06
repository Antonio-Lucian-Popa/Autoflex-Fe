/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function ReauthPage() {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Aici redirecționezi userul către flow-ul de creare Stripe account din nou
    navigate("/profile/settings"); // sau unde ai butonul de "Conectează cont Stripe"
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        <Car className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-2xl font-bold">Conectare Stripe întreruptă</h1>
        <p className="text-muted-foreground">
          Procesul de configurare Stripe a fost întrerupt sau a expirat. 
          Te rugăm să încerci din nou pentru a putea primi plăți.
        </p>
        <Button onClick={handleRetry} className="w-full">
          Reîncepe conectarea
        </Button>
      </Card>
    </div>
  );
}
