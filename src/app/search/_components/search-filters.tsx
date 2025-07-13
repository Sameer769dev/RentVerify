
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const amenitiesList = [
  "Wifi", "Kitchen", "Washer", "Dryer", "Air Conditioning", 
  "Heating", "Parking", "Garden", "Pet Friendly", "Pool", 
  "Gym", "Desk", "Elevator"
];

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
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const displayedAmenities = showAllAmenities ? amenitiesList : amenitiesList.slice(0, 6);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <Filter className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Filters</h2>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="relative">
         <div className="absolute inset-0 bg-mandala z-0" />
         <ScrollArea className="h-full relative z-10">
          <div className="flex flex-col gap-6 p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold text-primary">Price Range (Max)</SidebarGroupLabel>
              <SidebarGroupContent className="mt-3">
                 <div className="relative">
                    <Slider
                      value={[priceRange]}
                      onValueChange={onPriceChange}
                      max={10000}
                      step={100}
                      className="mt-2"
                      aria-label="Maximum price range"
                    />
                     <div className="absolute -top-6 right-0 text-sm font-medium bg-primary text-primary-foreground px-2 py-1 rounded-md">
                        ${priceRange.toLocaleString()}
                     </div>
                 </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-3">
                  <span>$0</span>
                  <span>$10,000</span>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold text-primary">Property Type</SidebarGroupLabel>
              <SidebarGroupContent className="mt-3">
                <RadioGroup
                  value={propertyType}
                  onValueChange={onPropertyTypeChange}
                  className="space-y-4"
                  aria-label="Select property type"
                >
                  {["all", "Room", "Flat", "House"].map((type) => (
                    <div key={type} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={type}
                        id={`t-${type.toLowerCase()}`}
                        className="h-5 w-5 border-primary/50 text-primary focus:ring-accent"
                      />
                      <Label
                        htmlFor={`t-${type.toLowerCase()}`}
                        className="font-normal text-base text-foreground cursor-pointer"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold text-primary">Amenities</SidebarGroupLabel>
              <SidebarGroupContent className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
                {displayedAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3">
                    <Checkbox
                      id={amenity.toLowerCase().replace(/\s/g, '-')}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={(checked) => onAmenityChange(amenity, !!checked)}
                      className="h-5 w-5 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                      aria-label={`Toggle ${amenity} amenity`}
                    />
                    <Label
                      htmlFor={amenity.toLowerCase().replace(/\s/g, '-')}
                      className="font-normal text-base text-foreground cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </SidebarGroupContent>
              {amenitiesList.length > 6 && (
                <Button
                  variant="link"
                  size="sm"
                  className="mt-3 text-accent hover:text-primary justify-start px-0"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities ? "Show Less" : "Show More"}
                  <ChevronDown
                    className={cn("ml-1 h-4 w-4 transition-transform", showAllAmenities && "rotate-180")}
                  />
                </Button>
              )}
            </SidebarGroup>

            <Button
              onClick={onApplyFilters}
              size="lg"
              className="w-full mt-auto bg-primary hover:bg-accent text-white rounded-lg"
              aria-label="Apply selected filters"
            >
              Apply Filters
            </Button>
          </div>
        </ScrollArea>
      </SidebarContent>
    </>
  );
}
