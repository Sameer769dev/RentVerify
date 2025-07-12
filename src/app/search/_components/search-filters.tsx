
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

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
                <h2 className="text-xl font-bold">Filters</h2>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent asChild>
                <ScrollArea>
                    <div className="flex flex-col gap-4 p-4">
                        <SidebarGroup>
                            <SidebarGroupLabel>Price Range (Max)</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <Slider 
                                    value={[priceRange]} 
                                    onValueChange={onPriceChange} 
                                    max={10000} 
                                    step={100} 
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                    <span>$0</span>
                                    <span>${priceRange.toLocaleString()}</span>
                                </div>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel>Property Type</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <RadioGroup value={propertyType} onValueChange={onPropertyTypeChange}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="t-all" />
                                        <Label htmlFor="t-all">All</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Room" id="t-room" />
                                        <Label htmlFor="t-room">Room</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Flat" id="t-flat" />
                                        <Label htmlFor="t-flat">Flat / Apartment</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="House" id="t-house" />
                                        <Label htmlFor="t-house">House</Label>
                                    </div>
                                </RadioGroup>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel>Amenities</SidebarGroupLabel>
                            <SidebarGroupContent className="space-y-2">
                                {amenitiesList.slice(0, 5).map(amenity => ( // Show a subset for brevity
                                    <div key={amenity} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={amenity.toLowerCase().replace(/\s/g, '-')}
                                            checked={selectedAmenities.includes(amenity)}
                                            onCheckedChange={(checked) => onAmenityChange(amenity, !!checked)}
                                        />
                                        <Label htmlFor={amenity.toLowerCase().replace(/\s/g, '-')} className="font-normal">{amenity}</Label>
                                    </div>
                                ))}
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <Button onClick={onApplyFilters} className="w-full mt-4">Apply Filters</Button>
                    </div>
                </ScrollArea>
            </SidebarContent>
        </>
    )
}
