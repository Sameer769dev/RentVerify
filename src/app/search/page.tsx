
"use client";

import * as React from "react"
import ListingCard from "@/components/listing-card";
import { SearchFilters } from "./_components/search-filters";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, List, LayoutGrid, Map, Loader2 } from "lucide-react";
import { Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";
import { getListings } from "@/lib/firestore";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type SortOption = "price_asc" | "price_desc" | "newest";
type ViewMode = "grid" | "list" | "map";

const MapView = dynamic(() => import('./_components/map-view'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-full" />,
});


export default function SearchPage() {
    const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
    const [allListings, setAllListings] = React.useState<Listing[]>([]);
    const [filteredListings, setFilteredListings] = React.useState<Listing[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Filter states
    const [priceRange, setPriceRange] = React.useState(10000);
    const [propertyType, setPropertyType] = React.useState("all");
    const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([]);
    const [sortOption, setSortOption] = React.useState<SortOption>("price_asc");

    React.useEffect(() => {
        const fetchListings = async () => {
            setIsLoading(true);
            try {
                const listingsData = await getListings();
                setAllListings(listingsData);
                // Initially sort before setting
                const sorted = [...listingsData].sort((a, b) => a.price - b.price);
                setFilteredListings(sorted);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, []);

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        setSelectedAmenities(prev => 
            checked ? [...prev, amenity] : prev.filter(a => a !== amenity)
        );
    };

    const handleApplyFilters = React.useCallback(() => {
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
        
        // Sorting
        if (sortOption === 'price_asc') {
            temp_listings.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price_desc') {
            temp_listings.sort((a, b) => b.price - a.price);
        }
        
        setFilteredListings(temp_listings);
    }, [allListings, priceRange, propertyType, selectedAmenities, sortOption]);

    React.useEffect(() => {
        handleApplyFilters();
    }, [sortOption, handleApplyFilters]);

    const handleResetFilters = () => {
        setPriceRange(10000);
        setPropertyType("all");
        setSelectedAmenities([]);
        setSortOption("price_asc");
        // We call handleApplyFilters with reset values, but need to pass them directly
        // since state updates are async.
        const sorted = [...allListings].sort((a, b) => a.price - b.price);
        setFilteredListings(sorted);
    }

    const sortLabels: Record<SortOption, string> = {
        price_asc: "Price (Low to High)",
        price_desc: "Price (High to Low)",
        newest: "Newest"
    };

    return (
        <div className="flex-grow flex h-full">
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
                   <div className="flex flex-col h-full">
                     <div className="p-4 border-b bg-background sticky top-0 z-10 flex-shrink-0">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 flex-shrink min-w-0">
                                <SidebarTrigger className="md:hidden"/>
                                <div className="truncate">
                                    <h1 className="text-2xl font-bold truncate text-primary">Listings</h1>
                                    <p className="text-sm font-semibold text-accent">{filteredListings.length} properties found</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="hidden sm:flex min-w-[180px] justify-between border-primary/50">
                                            <span>{sortLabels[sortOption]}</span>
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setSortOption('price_asc')} className="hover:bg-accent/20">Price (Low to High)</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption('price_desc')} className="hover:bg-accent/20">Price (High to Low)</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortOption('newest')} className="hover:bg-accent/20">Newest</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className="flex rounded-md border p-0.5 bg-muted">
                                    <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')} className={cn("h-9 w-9", viewMode === 'grid' && 'bg-accent/80 text-white')}>
                                        <LayoutGrid className="h-5 w-5"/>
                                    </Button>
                                     <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')} className={cn("h-9 w-9", viewMode === 'list' && 'bg-accent/80 text-white')}>
                                        <List className="h-5 w-5"/>
                                    </Button>
                                    <Button variant={viewMode === 'map' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('map')} className={cn("h-9 w-9", viewMode === 'map' && 'bg-accent/80 text-white')}>
                                        <Map className="h-5 w-5"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow relative bg-gray-50 dark:bg-gray-900/50">
                         <div className="absolute inset-0 bg-mandala z-0"/>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full relative z-10">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <>
                                <div className={cn("absolute inset-0 h-full w-full z-10", viewMode === 'map' ? 'block' : 'hidden')}>
                                     <MapView listings={filteredListings} />
                                </div>
                                
                                <ScrollArea className={cn("h-full", viewMode !== 'map' ? 'block' : 'hidden')}>
                                    <div className={cn(
                                        "p-4 sm:p-6",
                                        viewMode === 'grid' 
                                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                            : "flex flex-col gap-6"
                                    )}>
                                        {filteredListings.length > 0 ? (
                                            filteredListings.map((listing) => (
                                                <ListingCard key={listing.id} listing={listing} layout={viewMode as "grid" | "list"}/>
                                            ))
                                        ) : (
                                            <div className="col-span-full flex flex-col items-center justify-center h-[calc(100vh-20rem)] text-center p-6">
                                                <h3 className="text-2xl font-semibold">No Listings Found</h3>
                                                <p className="text-muted-foreground mt-2 max-w-md">Try adjusting your filters to find more properties. Sometimes the perfect home is just a click away!</p>
                                                <Button onClick={handleResetFilters} variant="link" className="mt-4 text-primary text-base">
                                                    Reset Filters
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </>
                        )}
                    </div>
                   </div>
                </SidebarInset>
            </Sidebar>
        </div>
    );
}
