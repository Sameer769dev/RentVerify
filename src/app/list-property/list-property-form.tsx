
"use client";

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Home, Loader2, FileImage, Wand2, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { addListing, uploadImage } from '@/lib/firestore';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';

const amenitiesList = ["Wifi", "Kitchen", "Washer", "Dryer", "Air Conditioning", "Heating", "Parking", "Garden", "Pet Friendly", "Pool", "Gym", "Desk", "Elevator"];

const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  price: z.coerce.number().min(1, "Price must be a positive number."),
  address: z.string().min(5, "Address is required."),
  city: z.string().min(2, "City is required."),
  country: z.string().min(2, "Country is required."),
  beds: z.coerce.number().int().min(1, "Number of beds is required."),
  baths: z.coerce.number().int().min(1, "Number of baths is required."),
  type: z.enum(['House', 'Flat', 'Room'], { required_error: "Please select a property type." }),
  amenities: z.array(z.string()).optional(),
  photos: z.array(z.custom<File>()).min(1, "Please upload at least one property photo."),
});

type ListingFormData = z.infer<typeof listingSchema>;

export default function ListPropertyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, accessToken } = useAuth();
  const router = useRouter();

  const form = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      country: "USA",
      price: 0,
      beds: 1,
      baths: 1,
      type: "Flat",
      amenities: [],
      photos: [],
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
          const currentFiles = form.getValues('photos') || [];
          const newFiles = Array.from(files);
          const allFiles = [...currentFiles, ...newFiles];
          form.setValue('photos', allFiles, { shouldValidate: true });

          const newPreviews = newFiles.map(file => URL.createObjectURL(file));
          setImagePreviews(prev => [...prev, ...newPreviews]);
      }
  };

  const handleRemoveImage = (index: number) => {
      const currentFiles = form.getValues('photos');
      const newFiles = currentFiles.filter((_, i) => i !== index);
      form.setValue('photos', newFiles, { shouldValidate: true });

      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(newPreviews);
  }

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);
    if (!accessToken) {
        toast({
            title: "Authentication Error",
            description: "Could not get authentication token. Please log in again and grant Google Drive permissions.",
            variant: "destructive"
        });
        setIsSubmitting(false);
        return;
    }
    try {
        const imageUrls = await Promise.all(data.photos.map(file => uploadImage(file, accessToken)));

        const listingData = {
            title: data.title,
            description: data.description,
            price: data.price,
            location: {
                address: data.address,
                city: data.city,
                country: data.country,
                lat: Math.random() * 180 - 90,
                lng: Math.random() * 360 - 180,
            },
            images: imageUrls,
            beds: data.beds,
            baths: data.baths,
            amenities: data.amenities || [],
            type: data.type,
            verified: false,
        };

        const newListingId = await addListing(listingData);

        toast({
            title: "Property Listed!",
            description: "Your property has been successfully listed and is pending review.",
        });
        
        form.reset();
        setImagePreviews([]);
        router.push(`/listings/${newListingId}`);

    } catch (error) {
        console.error("Failed to list property:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
            title: "Listing Failed",
            description: `Could not list your property. ${errorMessage}`,
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          List Your Property
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fill out the details below to put your property on the market.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Provide clear and accurate information to attract tenants.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Modern Downtown Loft with City Views" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your property in detail..."
                        {...field}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="House">House</SelectItem>
                          <SelectItem value="Flat">Flat / Apartment</SelectItem>
                          <SelectItem value="Room">Private Room</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rent per Month ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="2" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                 <FormField
                    control={form.control}
                    name="baths"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="2" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input placeholder="Metropolis" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input placeholder="USA" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>

              <FormField
                control={form.control}
                name="amenities"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Amenities</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {amenitiesList.map((amenity) => (
                        <FormField
                          key={amenity}
                          control={form.control}
                          name="amenities"
                          render={({ field }) => {
                            return (
                              <FormItem key={amenity} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(amenity)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), amenity])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== amenity
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{amenity}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Property Photos</FormLabel>
                <FormControl>
                    <div className="flex items-center justify-center w-full">
                    <label htmlFor="photoUpload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG</p>
                        </div>
                        <Input id="photoUpload" type="file" multiple className="hidden" ref={fileInputRef} accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                    </label>
                    </div>
                </FormControl>
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative aspect-square">
                        <Image src={src} alt={`Preview ${index}`} fill className="rounded-md object-cover" />
                        <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => handleRemoveImage(index)}>
                            <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage>{form.formState.errors.photos?.message}</FormMessage>
              </FormItem>

              <Button type="submit" className="w-full !mt-10" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                List My Property
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
