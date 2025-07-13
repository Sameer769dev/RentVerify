
"use client";

import { useState, useEffect } from "react";
import type { Listing } from "@/types";
import { useToast } from "@/hooks/use-toast";
import ListingCard from "@/components/listing-card";
import { getListings } from "@/lib/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

interface SimilarListingsProps {
  currentListing: Listing;
}

export default function SimilarListings({ currentListing }: SimilarListingsProps) {
  const [similarListings, setSimilarListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    const fetchSimilar = async () => {
        try {
            const allListings = await getListings();
            // Basic similarity logic: same city, different id, similar price
            const similar = allListings.filter(l => 
                l.id !== currentListing.id &&
                l.location.city === currentListing.location.city &&
                Math.abs(l.price - currentListing.price) < 500
            ).slice(0, 2); // get top 2
            setSimilarListings(similar);
        } catch(error) {
            console.error("Failed to fetch similar listings", error)
        }
    }
    fetchSimilar();
  }, [currentListing]);


  if (!similarListings || similarListings.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <CardTitle>Similar Listings</CardTitle>
        </div>
        <CardDescription>
          Other properties you might be interested in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {similarListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} layout="list"/>
        ))}
      </CardContent>
    </Card>
  );
}
