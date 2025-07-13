
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";

const amenitiesList = ["Wifi", "Kitchen", "Washer", "Dryer", "Air Conditioning", "Heating", "Parking", "Garden", "Pet Friendly", "Pool", "Gym", "Desk", "Elevator"];

interface SearchFiltersProps {
    priceRange: number;
    propertyType: string;
    selectedAmenities: string[];
    onPriceChange: (value: number[]) => void;
    onPropertyTypeChange: (value: string) => void;
    onAmenityChange: (amenity: string, checked: boolean) => void;
    onApplyFilters: () => void;
}

export function SearchFilters({
    priceRange,
    propertyType,
    selectedAmenities,
    onPriceChange,
    onPropertyTypeChange,
    onAmenityChange,
    onApplyFilters
}: SearchFiltersProps) {
    return (
        <>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Filters</h2>
                </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent asChild>
                <ScrollArea>
                    <div className="flex flex-col gap-4 p-4">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-base text-primary font-semibold">Price Range (Max)</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <Slider 
                                    value={[priceRange]} 
                                    onValueChange={onPriceChange} 
                                    max={10000} 
                                    step={100} 
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                    <span>$0</span>
                                    <span className="font-medium text-foreground">${priceRange.toLocaleString()}</span>
                                </div>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel className="text-base text-primary font-semibold">Property Type</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <RadioGroup value={propertyType} onValueChange={onPropertyTypeChange} className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="t-all" />
                                        <Label htmlFor="t-all" className="font-normal text-base">All</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Room" id="t-room" />
                                        <Label htmlFor="t-room" className="font-normal text-base">Room</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Flat" id="t-flat" />
                                        <Label htmlFor="t-flat" className="font-normal text-base">Flat / Apartment</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="House" id="t-house" />
                                        <Label htmlFor="t-house" className="font-normal text-base">House</Label>
                                    </div>
                                </RadioGroup>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel className="text-base text-primary font-semibold">Amenities</SidebarGroupLabel>
                            <SidebarGroupContent className="grid grid-cols-2 gap-x-4 gap-y-3">
                                {amenitiesList.map(amenity => (
                                    <div key={amenity} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={amenity.toLowerCase().replace(/\s/g, '-')}
                                            checked={selectedAmenities.includes(amenity)}
                                            onCheckedChange={(checked) => onAmenityChange(amenity, !!checked)}
                                        />
                                        <Label htmlFor={amenity.toLowerCase().replace(/\s/g, '-')} className="font-normal text-base">{amenity}</Label>
                                    </div>
                                ))}
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <Button onClick={onApplyFilters} className="w-full mt-4" size="lg">Apply Filters</Button>
                    </div>
                </ScrollArea>
            </SidebarContent>
        </>
    )
}
