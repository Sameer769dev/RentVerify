
"use client"

import * as React from 'react';
import type { Listing } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  listings: Listing[];
}

// These are normalization constants for a mock map of the USA.
// In a real app, you'd use a map library's projection functions.
const MAP_BOUNDS = {
  lat: { min: 24, max: 50 }, // Approx lat for USA
  lng: { min: -125, max: -66 }, // Approx lng for USA
};

const MapView: React.FC<MapViewProps> = ({ listings }) => {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updateSize = () => {
      if (mapContainerRef.current) {
        setContainerSize({
          width: mapContainerRef.current.offsetWidth,
          height: mapContainerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getPosition = (lat: number, lng: number) => {
    const percentX = (lng - MAP_BOUNDS.lng.min) / (MAP_BOUNDS.lng.max - MAP_BOUNDS.lng.min);
    const percentY = (lat - MAP_BOUNDS.lat.min) / (MAP_BOUNDS.lat.max - MAP_BOUNDS.lat.min);

    // Invert Y because screen coordinates are top-down
    return {
      x: percentX * containerSize.width,
      y: (1 - percentY) * containerSize.height,
    };
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)]" ref={mapContainerRef}>
      <Image 
        src="https://placehold.co/1200x800.png" 
        alt="Map of listings" 
        layout="fill" 
        objectFit="cover" 
        className="opacity-40"
        data-ai-hint="world map"
      />
      
      {listings.map(listing => {
        const { x, y } = getPosition(listing.location.lat, listing.location.lng);

        if (x === undefined || y === undefined) return null;

        return (
          <Popover key={listing.id}>
            <PopoverTrigger asChild>
                <button
                    style={{ left: `${x}px`, top: `${y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-lg transform transition-transform hover:scale-110"
                >
                    ${Math.round(listing.price / 1000)}k
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Card className="border-0 shadow-none">
                <CardHeader className="p-0">
                    <div className="relative aspect-[16/9] w-full">
                        <Image src={listing.images[0]} alt={listing.title} fill className="rounded-t-md object-cover" data-ai-hint="apartment interior" />
                    </div>
                </CardHeader>
                <CardContent className="p-3">
                    <CardTitle className="text-base font-bold line-clamp-1">{listing.title}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1"/> {listing.location.city}
                    </p>
                    <p className="text-lg font-semibold text-primary mt-2">${listing.price.toLocaleString()}/month</p>
                </CardContent>
                <CardFooter className="p-3 pt-0">
                    <Button asChild className="w-full">
                        <Link href={`/listings/${listing.id}`}>View Details</Link>
                    </Button>
                </CardFooter>
              </Card>
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
};

export default MapView;
