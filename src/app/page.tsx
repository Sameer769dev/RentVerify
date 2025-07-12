
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ListFilter, Search, SlidersHorizontal, BedDouble, ChevronDown } from "lucide-react"
import { listings } from "@/lib/mock-data"
import ListingCard from "@/components/listing-card"
import MapPlaceholder from "@/components/map-placeholder"
import type { Listing } from "@/types";

const allAmenities = Array.from(new Set(listings.flatMap(l => l.amenities)));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [selectedBeds, setSelectedBeds] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleBedSelection = (beds: number) => {
    setSelectedBeds(prev =>
      prev.includes(beds) ? prev.filter(b => b !== beds) : [...prev, beds]
    );
  };

  const toggleAmenitySelection = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };
  
  const filteredListings = listings
    .filter(listing => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTermLower) ||
        listing.location.address.toLowerCase().includes(searchTermLower) ||
        listing.location.city.toLowerCase().includes(searchTermLower) ||
        listing.description.toLowerCase().includes(searchTermLower);

      const matchesBeds = selectedBeds.length === 0 || selectedBeds.includes(listing.beds);

      const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every(amenity => listing.amenities.includes(amenity));

      return matchesSearch && matchesBeds && matchesAmenities;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          // Assuming higher ID is newer, for mock data
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0; // relevance
      }
    });

  const clearFilters = () => {
    setSelectedBeds([]);
    setSelectedAmenities([]);
  };

  return (
    <div className="flex-1 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 min-h-[calc(100vh-4rem)]">
        <div className="lg:col-span-2 xl:col-span-3 bg-background p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Find Your Next Home
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Browse our curated list of verified rental properties.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by area, address, or keyword..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <span>Filters</span>
                  {(selectedBeds.length > 0 || selectedAmenities.length > 0) && (
                    <span className="ml-2 rounded-full bg-primary px-2 text-xs text-primary-foreground">
                      {selectedBeds.length + selectedAmenities.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Bedrooms</h4>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map(beds => (
                         <Button
                          key={beds}
                          variant={selectedBeds.includes(beds) ? 'default' : 'outline'}
                          onClick={() => toggleBedSelection(beds)}
                          className="flex-1"
                        >
                          <BedDouble className="mr-2 h-4 w-4" />
                          {beds}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                     <h4 className="font-medium text-sm mb-2">Amenities</h4>
                     <div className="grid grid-cols-2 gap-2">
                      {allAmenities.slice(0, 6).map(amenity => (
                        <div key={amenity} className="flex items-center gap-2">
                           <Checkbox 
                              id={`amenity-${amenity}`} 
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={() => toggleAmenitySelection(amenity)}
                            />
                          <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">{amenity}</Label>
                        </div>
                      ))}
                     </div>
                  </div>
                  {(selectedBeds.length > 0 || selectedAmenities.length > 0) && (
                    <Button variant="ghost" onClick={clearFilters} className="w-full">
                      Clear Filters
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ListFilter className="mr-2 h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="md:col-span-2 xl:col-span-3 text-center py-16">
                <h3 className="text-xl font-semibold">No listings found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1 xl:col-span-1 relative">
            <MapPlaceholder />
        </div>
      </div>
    </div>
  )
}
