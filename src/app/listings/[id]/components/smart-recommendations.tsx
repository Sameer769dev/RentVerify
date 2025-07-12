

"use client";

import { useState, useEffect } from "react";
import { recommendListings } from "@/ai/flows/smart-recommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import type { Listing } from "@/types";
import { useToast } from "@/hooks/use-toast";
import ListingCard from "@/components/listing-card";
import { getListings } from "@/lib/firestore";

interface SmartRecommendationsProps {
  currentListing: Listing;
}

export default function SmartRecommendations({ currentListing }: SmartRecommendationsProps) {
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState<Listing[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations(null);

    try {
      const allListings = await getListings();
      const result = await recommendListings({
        userPreferences: preferences || "No specific preferences, use listing as base.",
        searchHistory: `Viewed listing: ${currentListing.title}`,
        currentListingId: currentListing.id,
      });
      // Filter recommendations from all listings
      const recommendedListings = allListings.filter(listing => 
        result.recommendations.some(rec => rec.id === listing.id)
      );
      setRecommendations(recommendedListings);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Could not fetch recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle>Smart Recommendations</CardTitle>
        </div>
        <CardDescription>
          Find similar places based on this listing and your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="preferences">Your preferences (optional)</Label>
            <Textarea
              id="preferences"
              placeholder="e.g., 'I need a place with a home office', 'Closer to downtown', 'must have a balcony'..."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Suggest Listings
          </Button>
        </form>
        {recommendations && recommendations.length > 0 && (
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold mb-4">Here are some suggestions:</h3>
            <div className="space-y-4">
              {recommendations.map((listing) => (
                <ListingCard key={listing.id} listing={listing} layout="list"/>
              ))}
            </div>
          </div>
        )}
         {isLoading && !recommendations && (
            <div className="mt-6 border-t pt-6 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
      </CardContent>
    </Card>
  );
}
