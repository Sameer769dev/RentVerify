
"use client";

import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Listing } from '@/types';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';

interface MapProps {
  listings: Listing[];
}

export default function ListingsMap({ listings }: MapProps) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const initialViewState = listings.length > 0 ? {
    longitude: listings[0].location.lng,
    latitude: listings[0].location.lat,
    zoom: 11
  } : {
    longitude: -74.0060,
    latitude: 40.7128,
    zoom: 11
  };
  
  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] w-full">
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{ width: '100%', height: '100%' }}
        >
            <NavigationControl position="top-right" />
            {listings.map(listing => (
                <Marker key={listing.id} longitude={listing.location.lng} latitude={listing.location.lat}>
                    <button onClick={() => setSelectedListing(listing)} className="transform hover:scale-110 transition-transform">
                       <MapPin className="h-8 w-8 text-primary fill-primary/50" />
                    </button>
                </Marker>
            ))}

            {selectedListing && (
                <Popup
                    longitude={selectedListing.location.lng}
                    latitude={selectedListing.location.lat}
                    onClose={() => setSelectedListing(null)}
                    closeOnClick={false}
                    offset={30}
                    className="w-64"
                >
                    <div className="w-full">
                      <div className="relative h-24 mb-2">
                        <Image src={selectedListing.images[0]} alt={selectedListing.title} fill className="object-cover rounded-t-lg" data-ai-hint="apartment interior" />
                         {selectedListing.verified && (
                          <Badge className="absolute top-1 right-1 bg-primary/80 text-primary-foreground text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="px-2 pb-2">
                        <h3 className="font-semibold text-sm truncate">{selectedListing.title}</h3>
                        <p className="text-xs text-muted-foreground">{selectedListing.location.city}</p>
                        <p className="text-sm font-bold text-primary mt-1">${selectedListing.price.toLocaleString()}<span className="font-normal text-xs">/mo</span></p>
                        <Button asChild size="sm" className="w-full mt-2 text-xs h-8">
                            <Link href={`/listings/${selectedListing.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                </Popup>
            )}
        </Map>
    </div>
  );
}
