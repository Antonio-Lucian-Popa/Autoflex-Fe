/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASE_PATH } from "@/lib/constant";
import { getUserBookings, getUserProfile } from "@/services/api";

import { useQuery } from "@tanstack/react-query";
import { Car, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getUserBookings,
  });

  const { data: userProfile, refetch: refetchUserProfile, isFetching: isFetchingProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    enabled: false,
  });

  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    if (value === "settings") {
      refetchUserProfile(); // când intru pe setări fac request
    }
  };

  return (
    <div className="py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profilul meu</h1>
      </div>

      <Tabs defaultValue="bookings" onValueChange={handleTabChange}>
        <TabsList className="mb-8">
          <TabsTrigger value="bookings">Rezervările mele</TabsTrigger>
          <TabsTrigger value="cars">Mașinile mele</TabsTrigger>
          <TabsTrigger value="reviews">Recenziile mele</TabsTrigger>
          <TabsTrigger value="settings">Setări</TabsTrigger>
        </TabsList>

        {/* Rezervările mele */}
        <TabsContent value="bookings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoadingBookings ? (
              <p>Se încarcă...</p>
            ) : bookings?.length === 0 ? (
              <p>Nu ai nicio rezervare încă.</p>
            ) : (
              bookings?.map((booking: any) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={booking.images[0]}
                      alt={booking.brand}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{booking.brand}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{booking.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Data preluare:</span>{" "}
                        {new Date(booking.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">Data predare:</span>{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span className="capitalize">{booking.status}</span>
                      </p>
                      <p className="font-semibold text-lg">
                        {booking.totalPrice} RON
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Mașinile mele */}
        <TabsContent value="cars">
          <div className="text-center py-12">
            <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nu ai nicio mașină listată</h3>
            <p className="text-muted-foreground mb-4">
              Începe să câștigi bani oferind mașina ta spre închiriere
            </p>
            <Button onClick={() => navigate(`${BASE_PATH}/offer`)}>
              Adaugă o mașină
            </Button>
          </div>
        </TabsContent>

        {/* Recenziile mele */}
        <TabsContent value="reviews">
          <div className="text-center py-12">
            <p>Nu ai nicio recenzie încă.</p>
          </div>
        </TabsContent>

        {/* Setări */}
        <TabsContent value="settings">
          {isFetchingProfile ? (
            <p>Se încarcă informațiile...</p>
          ) : userProfile ? (
            <Card className="max-w-2xl p-6 mx-auto">
              <h3 className="text-lg font-semibold mb-4">Informații personale</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nume</label>
                  <p>{userProfile.firstName} {userProfile.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p>{userProfile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Telefon</label>
                  <p>{userProfile.phoneNumber || "Nespecificat"}</p>
                </div>
                <Button className="mt-4">Editează profilul</Button>
              </div>
            </Card>
          ) : (
            <p>Nu s-au găsit date de profil.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
