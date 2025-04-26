import { Card } from "@/components/ui/card";
import { Car, Shield, Users } from "lucide-react";

export default function About() {
  return (
    <div className="py-12">
      {/* Intro */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Despre AutoFlex</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transformăm modul în care oamenii închiriază și testează mașini, conectând proprietari de mașini cu clienți într-o platformă sigură și de încredere.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<Car className="h-12 w-12 text-primary mb-4" />}
          title="Varietate de Mașini"
          description="Oferim acces la o gamă largă de mașini, de la modele economice până la mașini de lux, toate verificate și sigure."
        />
        <FeatureCard
          icon={<Shield className="h-12 w-12 text-primary mb-4" />}
          title="Siguranță Garantată"
          description="Toate mașinile sunt verificate tehnic și asigurate complet pentru siguranța dumneavoastră."
        />
        <FeatureCard
          icon={<Users className="h-12 w-12 text-primary mb-4" />}
          title="Comunitate de Încredere"
          description="O comunitate activă de proprietari și clienți verificați, cu sistem de rating și review-uri."
        />
      </div>

      {/* Mission */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Misiunea Noastră</h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          Ne propunem să democratizăm accesul la mobilitate, oferind o platformă sigură și eficientă pentru închirierea și testarea mașinilor între persoane fizice. Credem în puterea economiei colaborative și în construirea unei comunități bazate pe încredere și respect reciproc.
        </p>
      </div>

      {/* Stats */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Cifre Importante</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard number="1000+" label="Mașini Disponibile" />
          <StatCard number="5000+" label="Utilizatori Activi" />
          <StatCard number="10000+" label="Închirieri Realizate" />
        </div>
      </div>
    </div>
  );
}

// ✅ Componentă mică pentru cardurile de feature
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 text-center">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

// ✅ Componentă mică pentru cardurile de statistici
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-4xl font-bold text-primary">{number}</p>
      <p className="text-lg text-muted-foreground">{label}</p>
    </div>
  );
}
