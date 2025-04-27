/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getCarBookings, getCarById, getCarReviews, createBooking } from "@/services/api";
import { Car, Fuel, Gauge, MapPin, Star, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { JSX, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Swiper styles
import 'swiper/swiper-bundle.css';
import './CarDetail.css';


export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isBooking, setIsBooking] = useState(false);

  const { data: car, isLoading: isLoadingCar } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id!),
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getCarReviews(id!),
  });

  const { data: occupiedDates } = useQuery({
    queryKey: ["bookings", id],
    queryFn: () => getCarBookings(id!),
  });

  const handleBooking = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Eroare", { description: "Te rugăm să selectezi perioada de închiriere" });
      return;
    }
    setIsBooking(true);
    try {
      await createBooking({
        carId: id!,
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: format(dateRange.to, "yyyy-MM-dd"),
      });
      toast.success("Rezervare creată", { description: "Rezervarea ta a fost înregistrată cu succes" });
      setDateRange(undefined);
    } catch (error: any) {
      toast.error("Eroare", { description: error.response?.data?.message || "A apărut o eroare la rezervare" });
    } finally {
      setIsBooking(false);
    }
  };

  const disabledDays = occupiedDates?.map((interval: any) => ({
    from: new Date(interval.startDate),
    to: new Date(interval.endDate),
  }));

  if (isLoadingCar) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded-lg mb-8" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container py-8 text-center">
        <p className="text-red-500">Mașina nu a fost găsită.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="relative">
          <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        className="w-full h-full"
      >
              {car.images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                 <div className="relative w-full pt-[66.66%]"> {/* 16:9 aspect ratio */}
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>

                </SwiperSlide>
              ))}

              
            </Swiper>
          </div>

          {/* Car Details */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{car.name}</h1>
                <p className="text-lg text-muted-foreground flex items-center mt-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  {car.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{car.price} RON<span className="text-base font-normal text-muted-foreground">/zi</span></p>
                <div className="flex items-center mt-1">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{car.rating}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Spec icon={<Car />} label="An fabricație" value={car.year} />
              <Spec icon={<Gauge />} label="Putere" value={car.power} />
              <Spec icon={<Fuel />} label="Combustibil" value={
                car.fuelType === "GASOLINE" ? "Benzină" :
                car.fuelType === "DIESEL" ? "Diesel" :
                car.fuelType === "ELECTRIC" ? "Electric" : "Hybrid"
              } />
              <Spec icon={<Users />} label="Locuri" value={car.seats} />
            </div>

            <p className="text-lg mb-6">{car.description}</p>

            {/* Features */}
            <h2 className="text-xl font-semibold mb-4">Dotări</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {car.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <h2 className="text-xl font-semibold mb-4">Recenzii</h2>
            <div className="space-y-4">
              {reviews?.map((review: any) => (
                <Card key={review.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(review.createdAt), "d MMMM yyyy")}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="p-6">
              {/* Owner Info */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Proprietar</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{car.owner.firstName} {car.owner.lastName}</p>
                    <p className="text-sm text-muted-foreground">
                      Membru din {format(new Date(car.owner.createdAt), "MMMM yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{car.owner.rating}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Calendar Booking */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Selectează perioada</h3>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  disabled={[
                    { before: new Date() },
                    ...(disabledDays || []),
                  ]}
                  className="w-full px-4 py-2 [--rdp-cell-size:3rem] sm:[--rdp-cell-size:3.5rem] md:[--rdp-cell-size:4rem]"
                  />
              </div>

              <Button
                className="w-full"
                onClick={handleBooking}
                disabled={isBooking || !dateRange?.from || !dateRange?.to}
              >
                {isBooking ? "Se procesează..." : "Rezervă acum"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: JSX.Element, label: string, value: any }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
