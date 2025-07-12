
"use client";

import * as React from "react"
import { listings as allListings } from "@/lib/mock-data";
import ListingCard from "@/components/listing-card";
import { SearchFilters } from "./_components/search-filters";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, List, LayoutGrid } from "lucide-react";
import { Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";

type SortOption = "price_asc" | "price_desc" | "newest";

export default function SearchPage() {
    const [layout, setLayout] = React.useState("grid");
    const [listings, setListings] = React.useState<Listing[]>(allListings);
    const [filteredListings, setFilteredListings] = React.useState<Listing[]>(allListings);

    // Filter states
    const [priceRange, setPriceRange] = React.useState(10000);
    const [propertyType, setPropertyType] = React.useState("all");
    const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([]);
    const [sortOption, setSortOption] = React.useState<SortOption>("price_asc");

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        setSelectedAmenities(prev => 
            checked ? [...prev, amenity] : prev.filter(a => a !== amenity)
        );
    };

    const handleApplyFilters = () => {
        let temp_listings = [...allListings];

        // Price filter
        temp_listings = temp_listings.filter(l => l.price <= priceRange);

        // Property type filter
        if (propertyType !== "all") {
            temp_listings = temp_listings.filter(l => l.type === propertyType);
        }

        // Amenities filter
        if (selectedAmenities.length > 0) {
            temp_listings = temp_listings.filter(l => 
                selectedAmenities.every(amenity => l.amenities.includes(amenity))
            );
        }

        setListings(temp_listings);
    };

    React.useEffect(() => {
        let sortedListings = [...listings];
        if (sortOption === 'price_asc') {
            sortedListings.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price_desc') {
            sortedListings.sort((a, b) => b.price - a.price);
        }
        // 'newest' would require a date field, which we don't have.
        // For now, it will just default to the filtered order.
        
        setFilteredListings(sortedListings);
    }, [listings, sortOption]);

    const sortLabels: Record<SortOption, string> = {
        price_asc: "Price (Low to High)",
        price_desc: "Price (High to Low)",
        newest: "Newest"
    };

    return (
        <>
            <Sidebar>
                <SearchFilters 
                    priceRange={priceRange}
                    propertyType={propertyType}
                    selectedAmenities={selectedAmenities}
                    onPriceChange={(value) => setPriceRange(value[0])}
                    onPropertyTypeChange={setPropertyType}
                    onAmenityChange={handleAmenityChange}
                    onApplyFilters={handleApplyFilters}
                />
                <SidebarInset>
                    <div className="p-4 sm:p-6 border-b bg-background sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="md:hidden"/>
                                <div>
                                    <h1 className="text-xl font-bold">Search Results</h1>
                                    <p className="text-sm text-muted-foreground">{filteredListings.length} properties found</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            Sort by: {sortLabels[sortOption]}
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setSortOption('price_asc')}>Price (Low to High)</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption('price_desc')}>Price (High to Low)</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption('newest')}>Newest</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className="hidden sm:flex">
                                    <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('grid')}>
                                        <LayoutGrid className="h-5 w-5"/>
                                    </Button>
                                     <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('list')}>
                                        <List className="h-5 w-5"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                        <div className={cn(
                            "p-4 sm:p-6",
                            layout === 'grid' 
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                                : "flex flex-col gap-6"
                        )}>
                            {filteredListings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} layout={layout as "grid" | "list"}/>
                            ))}
                        </div>
                    </ScrollArea>
                </SidebarInset>
            </Sidebar>
        </>
    );
}
