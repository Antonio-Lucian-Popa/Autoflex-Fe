/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CarFilters, getCars, getImageUrl } from "@/services/api"; // schimbat corect
import { Filter, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/services/auth";

const locations = ["București", "Cluj-Napoca", "Timișoara", "Iași", "Brașov", "Constanța"];
const transmissions = ["AUTOMATIC", "MANUAL"];
const fuels = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"];

export default function Cars() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CarFilters>({
    page: 0,
    size: 9,
    minPrice: 0,
    maxPrice: 500,
  });

  const { data: isAuthenticated } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
    staleTime: 1000 * 60 * 5,
  });

  const { data, error } = useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(filters),
  });

  const handleFilterChange = (key: keyof CarFilters, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev: any) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleCarClick = (carId: string) => {
    if (!isAuthenticated) {
      navigate(`/login`);
      return;
    }
    navigate(`/cars/${carId}`);
  };

  if (error) {
    return (
      <div className="container py-8 text-center">
        <p className="text-red-500">A apărut o eroare la încărcarea mașinilor.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtre
            </h2>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Preț pe zi (RON)</label>
                <div className="space-y-4">
                  <Slider
                    value={[filters.minPrice || 0, filters.maxPrice || 500]}
                    max={500}
                    step={10}
                    onValueChange={handlePriceChange}
                    className="mt-2"
                  />
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block">Locație</label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => handleFilterChange("location", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alege orașul" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission */}
              <div>
                <label className="text-sm font-medium mb-2 block">Cutie de viteze</label>
                <Select
                  value={filters.transmission}
                  onValueChange={(value) => handleFilterChange("transmission", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alege tipul" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission}>
                        {transmission === "AUTOMATIC" ? "Automată" : "Manuală"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel */}
              <div>
                <label className="text-sm font-medium mb-2 block">Combustibil</label>
                <Select
                  value={filters.fuelType}
                  onValueChange={(value) => handleFilterChange("fuelType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alege tipul" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuels.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel === "GASOLINE" ? "Benzină" :
                         fuel === "DIESEL" ? "Diesel" :
                         fuel === "ELECTRIC" ? "Electric" : "Hybrid"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={() => setFilters({ page: 0, size: 9 })}
                variant="outline"
              >
                Resetează filtre
              </Button>
            </div>
          </Card>
        </div>

        {/* Cars List */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Caută după marcă, model..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <Select
              value={`${filters.sortBy}_${filters.direction}`}
              onValueChange={(value) => {
                const [sortBy, direction] = value.split("_");
                setFilters((prev: any) => ({
                  ...prev,
                  sortBy: sortBy as "price" | "rating" | "year" | undefined,
                  direction: direction as "asc" | "desc" | undefined,
                }));
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sortează după" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Preț crescător</SelectItem>
                <SelectItem value="price_desc">Preț descrescător</SelectItem>
                <SelectItem value="rating_desc">Rating</SelectItem>
                <SelectItem value="year_desc">An fabricație</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.content.map((car: any) => (
              <Card key={car.id} className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(car.id, car.images[0])}
                    alt={car.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{car.name}</h3>
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {car.year}
                    </span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {car.transmission === "AUTOMATIC" ? "Automată" : "Manuală"}
                    </span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {car.fuelType === "GASOLINE" ? "Benzină" :
                       car.fuelType === "DIESEL" ? "Diesel" :
                       car.fuelType === "ELECTRIC" ? "Electric" : "Hybrid"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">
                      {car.price} RON<span className="text-sm text-muted-foreground">/zi</span>
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => handleCarClick(car.id)}
                    >
                      Vezi detalii
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {data && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={data.first}
                onClick={() => handleFilterChange("page", (filters.page ?? 0) - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={data.last}
                onClick={() => handleFilterChange("page", (filters.page ?? 0) + 1)}
              >
                Următor
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
