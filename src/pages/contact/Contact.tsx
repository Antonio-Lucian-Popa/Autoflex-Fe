import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission (backend call)

    toast({
      title: "Mesaj trimis",
      description: "Vă mulțumim pentru mesaj. Vom reveni cu un răspuns în cel mai scurt timp.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contactează-ne</h1>
        <p className="text-xl text-muted-foreground">
          Suntem aici să te ajutăm. Trimite-ne un mesaj și îți vom răspunde cât mai curând posibil.
        </p>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 text-center">
          <Phone className="h-8 w-8 text-primary mb-4 mx-auto" />
          <h3 className="text-lg font-semibold mb-2">Telefon</h3>
          <p className="text-muted-foreground">+40 123 456 789</p>
        </Card>

        <Card className="p-6 text-center">
          <Mail className="h-8 w-8 text-primary mb-4 mx-auto" />
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-muted-foreground">contact@autoflex.ro</p>
        </Card>

        <Card className="p-6 text-center">
          <MapPin className="h-8 w-8 text-primary mb-4 mx-auto" />
          <h3 className="text-lg font-semibold mb-2">Adresă</h3>
          <p className="text-muted-foreground">Strada Exemplu 123, București</p>
        </Card>
      </div>

      {/* Contact Form */}
      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nume complet</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subiect</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mesaj</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Trimite mesaj
          </Button>
        </form>
      </Card>
    </div>
  );
}
