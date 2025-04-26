import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { login } from "@/services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      queryClient.setQueryData(['auth'], true);
      toast.success("Autentificare reușită", {
        description: "Bine ai revenit!",
      });
      navigate(`/profile`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Eroare la autentificare", {
        description: error.response?.data?.message || "A apărut o eroare la autentificare",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <Car className="h-12 w-12" />
          <h1 className="text-2xl font-bold text-center">Bine ai revenit!</h1>
          <p className="text-muted-foreground text-center">
            Autentifică-te pentru a continua pe AutoFlex
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nume@exemplu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Parolă</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Se procesează..." : "Autentificare"}
          </Button>
        </form>

        <Separator className="my-8" />

        <p className="text-center text-sm">
          Nu ai cont?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </Card>
    </div>
  );
}
