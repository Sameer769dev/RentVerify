"use client"

import * as React from 'react';
import type { Listing } from '@/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  listings: Listing[];
}

// Fix for default Leaflet icon not showing up in Next.js
const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapView: React.FC<MapViewProps> = ({ listings }) => {
  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }

  // Calculate center of map
  let center: [number, number] = [39.8283, -98.5795]; // Default to center of USA
  if (listings.length > 0) {
    const avgLat = listings.reduce((sum, l) => sum + l.location.lat, 0) / listings.length;
    const avgLng = listings.reduce((sum, l) => sum + l.location.lng, 0) / listings.length;
    center = [avgLat, avgLng];
  }

  return (
    <MapContainer center={center} zoom={4} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {listings.map(listing => (
        <Marker key={listing.id} position={[listing.location.lat, listing.location.lng]} icon={defaultIcon}>
          <Popup>
             <Card className="border-0 shadow-none w-[250px]">
                <CardHeader className="p-0">
                    <div className="relative aspect-[16/9] w-full">
                        <Image src={listing.images[0]} alt={listing.title} fill className="rounded-t-md object-cover" data-ai-hint="apartment interior" />
                    </div>
                </CardHeader>
                <CardContent className="p-2">
                    <CardTitle className="text-sm font-bold line-clamp-1">{listing.title}</CardTitle>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1"/> {listing.location.city}
                    </p>
                    <p className="text-base font-semibold text-primary mt-2">${listing.price.toLocaleString()}/month</p>
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
    </MapContainer>
  );
};

export default MapView;
