import { notFound } from "next/navigation";
import Image from "next/image";
import { listings } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BedDouble, Bath, MapPin, Wifi, Utensils, ParkingCircle, Dog, Wind, ShieldCheck } from "lucide-react";
import SmartRecommendations from "./components/smart-recommendations";

const amenityIcons: { [key: string]: React.ElementType } = {
  Wifi,
  Kitchen: Utensils,
  Washer: () => <div className="w-5 h-5 i-lucide-washer" />,
  Dryer: () => <div className="w-5 h-5 i-lucide-dryer" />,
  "Air Conditioning": Wind,
  Heating: () => <div className="w-5 h-5 i-lucide-heater" />,
  Parking: ParkingCircle,
  Garden: () => <div className="w-5 h-5 i-lucide-flower-2" />,
  "Pet Friendly": Dog,
  Pool: () => <div className="w-5 h-5 i-lucide-clapperboard" />,
  Gym: () => <div className="w-5 h-5 i-lucide-dumbbell" />,
  Concierge: () => <div className="w-5 h-5 i-lucide-concierge-bell" />,
  Fireplace: () => <div className="w-5 h-5 i-lucide-fireplace" />,
  Desk: () => <div className="w-5 h-5 i-lucide-desk" />,
  Elevator: () => <div className="w-5 h-5 i-lucide-elevator" />,
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
                  <Badge variant="secondary" className="mb-2">{listing.type}</Badge>
                  <h1 className="text-3xl font-bold text-foreground">{listing.title}</h1>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{listing.location.address}, {listing.location.city}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <p className="text-3xl font-bold text-primary">
                        ${listing.price.toLocaleString()}
                        <span className="text-base font-normal text-muted-foreground">/month</span>
                    </p>
                    {listing.verified && (
                        <div className="inline-flex items-center gap-2 mt-2 text-green-600">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="font-semibold">Verified Listing</span>
                        </div>
                    )}
                </div>
              </div>

              <div className="flex items-center gap-6 border-y py-4 my-6">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-6 w-6 text-primary" />
                  <span className="text-lg">{listing.beds} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-6 w-6 text-primary" />
                  <span className="text-lg">{listing.baths} Baths</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">About this property</h2>
                <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {listing.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="flex items-center gap-3">
                        {Icon ? <Icon className="h-5 w-5 text-primary" /> : null}
                        <span className="text-muted-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
           <SmartRecommendations currentListing={listing} />
           <Card>
                <CardContent className="p-6 text-center">
                    <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
                    <p className="text-muted-foreground mb-4">Contact the owner directly to schedule a viewing.</p>
                    <a href="/messages?to=owner123"><button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium">Message Owner</button></a>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
