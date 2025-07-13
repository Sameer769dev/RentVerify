
"use client"

import type { Listing } from '@/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

interface ListingMapProps {
  listing: Listing;
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

const ListingMap: React.FC<ListingMapProps> = ({ listing }) => {
  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }

  const position: [number, number] = [listing.location.lat, listing.location.lng];

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Marker position={position} icon={defaultIcon}>
          <Popup>
             <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                    <p className="font-bold">{listing.title}</p>
                    <p className="text-sm text-muted-foreground">{listing.location.address}</p>
                </div>
             </div>
          </Popup>
        </Marker>
    </MapContainer>
  );
};

export default ListingMap;
