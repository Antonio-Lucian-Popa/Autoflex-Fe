import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Car, MapPin, Shield, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const featuredCars = [
  {
    id: 1,
    name: "BMW Seria 5",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    price: 250,
    location: "București",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Mercedes-Benz E-Class",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1935&auto=format&fit=crop",
    price: 300,
    location: "Cluj-Napoca",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Audi A6",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
    price: 280,
    location: "Timișoara",
    rating: 4.7,
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Siguranță garantată",
    description: "Toate mașinile sunt verificate și asigurate complet",
  },
  {
    icon: Zap,
    title: "Rapid și ușor",
    description: "Rezervă în câteva minute și preia mașina imediat",
  },
  {
    icon: Star,
    title: "Experiență verificată",
    description: "Sistem de rating și review-uri pentru toate mașinile",
  },
];

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="container relative z-10 text-white px-4 mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mx-auto max-w-3xl">
            Închiriază mașina perfectă pentru orice ocazie
          </h1>
          <p className="mt-4 text-xl mx-auto max-w-2xl text-gray-200">
            Platformă P2P pentru închiriere și test-drive de mașini între persoane fizice
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/cars">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Caută o mașină
              </Button>
            </Link>
            <Link to="/offer">
              <Button size="lg" variant="outline" className="bg-primary text-white hover:bg-primary/90 hover:text-white">
                Oferă mașina ta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="container px-4 mx-auto -mt-20 relative z-20">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Locație</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input className="pl-9" placeholder="Oraș" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Data preluare</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input className="pl-9" type="date" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tip mașină</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Alege tipul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Caută</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Featured Cars Section */}
      <section className="container px-4 mx-auto py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Mașini recomandate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden group">
              <div className="relative h-48">
                <img
                  src={car.image}
                  alt={car.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{car.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {car.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{car.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">
                    {car.price} RON<span className="text-sm text-muted-foreground">/zi</span>
                  </p>
                  <Link to={`/cars/${car.id}`}>
                    <Button variant="secondary">Vezi detalii</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">De ce să alegi AutoFlex</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center">
                <benefit.icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container px-4 mx-auto py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Cum funcționează</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Car />, title: "1. Alege mașina", desc: "Explorează varietatea de mașini disponibile și alege-o pe cea care ți se potrivește" },
            { icon: <Calendar />, title: "2. Rezervă perioada", desc: "Selectează perioada dorită și completează detaliile rezervării" },
            { icon: <MapPin />, title: "3. Preia mașina", desc: "Întâlnește-te cu proprietarul și preia mașina de la locația stabilită" },
          ].map((step, idx) => (
            <div key={idx}>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
