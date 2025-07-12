
"use client";

import * as React from "react"
import { listings } from "@/lib/mock-data";
import ListingCard from "@/components/listing-card";
import { SearchFilters } from "./_components/search-filters";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, List, LayoutGrid } from "lucide-react";
import { Sidebar, SidebarContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";


export default function SearchPage() {
    const [layout, setLayout] = React.useState("grid");
    return (
        <>
            <Sidebar>
                <SearchFilters />
                <SidebarInset>
                    <div className="p-4 sm:p-6 border-b bg-background sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="md:hidden"/>
                                <div>
                                    <h1 className="text-xl font-bold">Properties in Metropolis</h1>
                                    <p className="text-sm text-muted-foreground">7 properties found</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            Sort by: Price (Low to High)
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Price (Low to High)</DropdownMenuItem>
                                        <DropdownMenuItem>Price (High to Low)</DropdownMenuItem>
                                        <DropdownMenuItem>Newest</DropdownMenuItem>
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
                            {listings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} layout={layout as "grid" | "list"}/>
                            ))}
                        </div>
                    </ScrollArea>
                </SidebarInset>
            </Sidebar>
        </>
    );
}
