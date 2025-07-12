import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { ListFilter, Search } from "lucide-react"
import { listings } from "@/lib/mock-data"
import ListingCard from "@/components/listing-card"
import MapPlaceholder from "@/components/map-placeholder"

export default function Home() {
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
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ListFilter className="mr-2 h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value="relevance">
                  <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1 xl:col-span-1 relative">
            <MapPlaceholder />
        </div>
      </div>
    </div>
  )
}
