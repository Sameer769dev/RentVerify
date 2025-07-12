
import { notFound } from "next/navigation";
import Image from "next/image";
import { listings } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BedDouble, Bath, MapPin, Wifi, Utensils, ParkingCircle, Dog, Wind, ShieldCheck, Dumbbell, ConciergeBell, Fireplace, Desk, Elevator, Heater, Flower2, WashingMachine } from "lucide-react";
import SmartRecommendations from "./components/smart-recommendations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookingModal from "./components/booking-modal";
import { Separator } from "@/components/ui/separator";

const amenityIcons: { [key: string]: React.ElementType } = {
  Wifi,
  Kitchen: Utensils,
  Washer: WashingMachine,
  Dryer: WashingMachine, // Using same for simplicity
  "Air Conditioning": Wind,
  Heating: Heater,
  Parking: ParkingCircle,
  Garden: Flower2,
  "Pet Friendly": Dog,
  Pool: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M10 12c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/><path d="M10 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"/></svg>, // Placeholder Pool icon
  Gym: Dumbbell,
  Concierge: ConciergeBell,
  Fireplace: Fireplace,
  Desk: Desk,
  Elevator: Elevator,
};

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = listings.find((l) => l.id === params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <div className="mb-4">
              <Badge variant="secondary" className="mb-2">{listing.type}</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{listing.title}</h1>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{listing.location.address}, {listing.location.city}</span>
              </div>
           </div>
          <Card className="overflow-hidden mb-8">
            <Carousel className="w-full">
              <CarouselContent>
                {listing.images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={src}
                        alt={`${listing.title} image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint="apartment room"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4" />
              <CarouselNext className="absolute right-4" />
            </Carousel>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">About this property</h2>
                  <div className="flex items-center gap-6 text-lg mt-4">
                    <div className="flex items-center gap-2">
                      <BedDouble className="h-6 w-6 text-primary" />
                      <span>{listing.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-6 w-6 text-primary" />
                      <span>{listing.baths} Baths</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <p className="text-3xl font-bold text-primary">
                        ${listing.price.toLocaleString()}
                        <span className="text-base font-normal text-muted-foreground">/month</span>
                    </p>
                </div>
              </div>

             <Separator className="my-6"/>

              <div className="mb-6">
                <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
              </div>

              <Separator className="my-6"/>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {listing.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="flex items-center gap-3">
                        {Icon ? <Icon /> : null}
                        <span className="text-muted-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8 sticky top-24">
           <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-semibold">Interested?</h2>
                         {listing.verified && (
                            <div className="inline-flex items-center gap-1.5 text-green-600">
                                <ShieldCheck className="h-5 w-5" />
                                <span className="font-semibold text-sm">Verified</span>
                            </div>
                        )}
                    </div>
                    <BookingModal listing={listing} />
                    <Button asChild className="w-full mt-2" variant="outline">
                        <Link href="/messages?to=owner123">Message Owner</Link>
                    </Button>
                </CardContent>
            </Card>
            <SmartRecommendations currentListing={listing} />
        </div>
      </div>
    </div>
  );
}
