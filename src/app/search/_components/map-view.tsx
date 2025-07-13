
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
  const mapRef = React.useRef<L.Map | null>(null);
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
        // Initialize map only once
        const map = L.map(mapContainerRef.current, {
            center: [27.7172, 85.3240], // Kathmandu
            zoom: 12,
            scrollWheelZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapRef.current = map;
    }
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;
    if (map) {
        // Clear existing markers
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
        
        // Add new markers
        listings.forEach(listing => {
            const marker = L.marker([listing.location.lat, listing.location.lng], { icon: defaultIcon }).addTo(map);
            
            const popupContent = `
                <div class="w-[250px] font-sans">
                    <div class="relative aspect-video w-full rounded-t-md overflow-hidden">
                        <img src="${listing.images[0]}" alt="${listing.title}" class="object-cover w-full h-full" />
                        <div class="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/60 to-transparent"></div>
                        <h3 class="absolute top-2 left-3 text-sm font-bold text-white">${listing.title}</h3>
                    </div>
                    <div class="p-2">
                         <p class="text-xs text-slate-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${listing.location.city}
                        </p>
                        <p class="text-lg font-bold text-purple-600 mt-1">$${listing.price.toLocaleString()}/month</p>
                    </div>
                    <div class="p-2 pt-0">
                       <a href="/listings/${listing.id}" class="block w-full text-center bg-purple-600 text-white hover:bg-purple-700 text-sm py-2 px-4 rounded-md">View Details</a>
                    </div>
                </div>
            `;
            marker.bindPopup(popupContent);
        });

        if (listings.length > 0) {
            const bounds = new L.LatLngBounds(listings.map(l => [l.location.lat, l.location.lng]));
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }
  }, [listings]);


  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }
  
  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default MapView;

