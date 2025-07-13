
"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BedDouble, Bath, MapPin, Wifi, Utensils, ParkingCircle, Dog, Wind, ShieldCheck, Dumbbell, ConciergeBell, Fireplace, Desk, Elevator, Heater, Flower2, WashingMachine, Volume2, Loader2 } from "lucide-react";
import SmartRecommendations from "./components/smart-recommendations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookingModal from "./components/booking-modal";
import { Separator } from "@/components/ui/separator";
import { textToSpeech } from "@/ai/flows/text-to-speech-flow";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getListing } from "@/lib/firestore";
import type { Listing } from "@/types";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import SimilarListings from "./components/similar-listings";

const ListingMap = dynamic(() => import('./components/listing-map'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[400px] rounded-lg" />,
});


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
  Pool: Dumbbell, // Using Dumbbell as a stand-in for Pool
  Gym: Dumbbell,
  Concierge: ConciergeBell,
  Fireplace: Fireplace,
  Desk: Desk,
  Elevator: Elevator,
};

export default function ListingPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
      const fetchListing = async () => {
          setIsLoading(true);
          try {
              const listingData = await getListing(params.id);
              if (listingData) {
                  setListing(listingData);
              } else {
                  notFound();
              }
          } catch(error) {
              console.error("Failed to fetch listing:", error);
              notFound();
          } finally {
              setIsLoading(false);
          }
      };
      fetchListing();
  }, [params.id]);
  
  const handleListen = async () => {
    if (!listing) return;
    setIsGeneratingSpeech(true);
    setAudioSrc(null);
    try {
        const result = await textToSpeech({ text: listing.description });
        setAudioSrc(result.audioDataUri);
    } catch(e) {
        console.error("Error generating speech", e);
        toast({
            title: "Error",
            description: "Could not generate audio for the description.",
            variant: "destructive"
        })
    } finally {
        setIsGeneratingSpeech(false);
    }
  }

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{listing.type}</Badge>
                 {listing.verified && (
                    <div className="inline-flex items-center gap-1.5 text-green-600">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="font-semibold text-sm">Verified Listing</span>
                    </div>
                )}
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{listing.title}</h1>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{listing.location.address}, {listing.location.city}</span>
              </div>
           </div>
          <Card className="overflow-hidden">
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
                <div className="flex justify-between items-center mb-2">
                     <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                     <Button variant="outline" size="icon" onClick={handleListen} disabled={isGeneratingSpeech}>
                        {isGeneratingSpeech ? <Loader2 className="h-5 w-5 animate-spin"/> : <Volume2 className="h-5 w-5"/>}
                        <span className="sr-only">Listen to description</span>
                     </Button>
                </div>
                {audioSrc && (
                    <audio controls autoPlay className="w-full mt-4">
                        <source src={audioSrc} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                )}
              </div>

              <Separator className="my-6"/>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
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
          
           <Card>
             <CardContent className="p-6">
                 <h2 className="text-2xl font-semibold mb-4">Location</h2>
                 <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
                    <ListingMap listing={listing}/>
                 </div>
             </CardContent>
           </Card>
        </div>

        <div className="lg:col-span-1 space-y-8 sticky top-24 h-max">
           <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-semibold">Interested?</h2>
                    </div>
                    <BookingModal listing={listing} />
                    <Button asChild className="w-full mt-2" variant="outline">
                        <Link href={`/messages?to=${listing.ownerId || 'owner123'}`}>Message Owner</Link>
                    </Button>
                </CardContent>
            </Card>
            <SmartRecommendations currentListing={listing} />
            <SimilarListings currentListing={listing} />
        </div>
      </div>
    </div>
  );
}
