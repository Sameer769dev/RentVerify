import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Bath, MapPin, ShieldCheck } from "lucide-react";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listings/${listing.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0 relative">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover"
            data-ai-hint="apartment interior"
          />
          {listing.verified && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground gap-1.5 pl-2 pr-2.5">
              <ShieldCheck className="h-4 w-4"/>
              Verified
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
            {listing.title}
          </CardTitle>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{listing.location.city}, {listing.location.country}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center">
            <div className="flex gap-4 text-foreground">
                <div className="flex items-center gap-1.5">
                    <BedDouble className="h-5 w-5 text-primary"/>
                    <span>{listing.beds}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Bath className="h-5 w-5 text-primary"/>
                    <span>{listing.baths}</span>
                </div>
            </div>
            <div className="text-lg font-bold text-primary">
                ${listing.price.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
