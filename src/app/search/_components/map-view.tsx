"use client"

import * as React from 'react';
import type { Listing } from '@/types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  listings: Listing[];
}

const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// A component to automatically adjust map view when listings change
const MapUpdater: React.FC<{ listings: Listing[] }> = ({ listings }) => {
    const map = useMap();
    React.useEffect(() => {
        if (listings.length > 0) {
            const bounds = new L.LatLngBounds(listings.map(l => [l.location.lat, l.location.lng]));
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [listings, map]);
    return null;
}

const MapView: React.FC<MapViewProps> = ({ listings }) => {
  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }

  // Set default center to Kathmandu, Nepal
  const center: [number, number] = [27.7172, 85.3240]; 

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {listings.map(listing => (
        <Marker key={listing.id} position={[listing.location.lat, listing.location.lng]} icon={defaultIcon}>
          <Popup>
             <Card className="border-0 shadow-none w-[250px]">
                <CardHeader className="p-0 relative">
                    <div className="relative aspect-video w-full">
                        <Image src={listing.images[0]} alt={listing.title} fill className="rounded-t-md object-cover" data-ai-hint="apartment interior" />
                    </div>
                     <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/60 to-transparent rounded-t-md" />
                     <CardTitle className="absolute top-2 left-3 text-sm font-bold text-white line-clamp-1">{listing.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1"/> {listing.location.city}
                    </p>
                    <p className="text-lg font-bold text-primary mt-1">${listing.price.toLocaleString()}/month</p>
                </CardContent>
                <CardFooter className="p-2 pt-0">
                    <Button asChild className="w-full" size="sm">
                        <Link href={`/listings/${listing.id}`}>View Details</Link>
                    </Button>
                </CardFooter>
              </Card>
          </Popup>
        </Marker>
      ))}

      <MapUpdater listings={listings} />
    </MapContainer>
  );
};

export default MapView;
