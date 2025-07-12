

"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Search, Home, PlusCircle, ShieldCheck, HeartHandshake, Zap, UserMinus } from "lucide-react"
import { listings } from "@/lib/mock-data"
import ListingCard from "@/components/listing-card"
import Link from "next/link";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Built on Trust",
    description: "Every property and owner is verified, ensuring a safe and transparent rental experience for everyone.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Unmatched Simplicity",
    description: "Our platform is designed to be intuitive, making it easy to find a home or list your property in minutes.",
  },
  {
    icon: <UserMinus className="h-10 w-10 text-primary" />,
    title: "Absolutely No Brokers",
    description: "Connect directly with owners. We've eliminated the middleman to save you time and money.",
  },
];

const actionCards = [
    {
        icon: <Home className="h-8 w-8 text-primary" />,
        title: "Rent a Property",
        description: "Find your perfect home from our list of verified properties.",
        href: "/search",
        cta: "Browse Listings"
    },
    {
        icon: <PlusCircle className="h-8 w-8 text-primary" />,
        title: "List Your Property",
        description: "Reach thousands of potential tenants by listing your property with us.",
        href: "/list-property",
        cta: "List for Free"
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "Verified Rentals",
        description: "Learn about our verification process that builds trust in our community.",
        href: "/verify-kyc",
        cta: "Learn More"
    }
]

export default function HomePage() {
  const router = useRouter();
  const latestVerifiedListings = listings.filter(l => l.verified).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/search");
  }

  return (
    <div className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative bg-secondary/50">
          <div className="container mx-auto px-4 py-20 text-center sm:py-24 lg:py-32">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Your Trusted Partner in Rentals
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
                  Discover verified properties and connect directly with owners. No brokers, no hassle.
              </p>
              <div className="mt-8 max-w-xl mx-auto">
                  <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                          type="search"
                          placeholder="Search by City, Area or Property Type"
                          className="w-full h-14 pl-12 pr-32 rounded-full shadow-lg"
                      />
                      <Button type="submit" size="lg" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full">
                          Search
                      </Button>
                  </form>
              </div>
          </div>
      </section>

      {/* Action Cards Section */}
      <section className="py-16 bg-background sm:py-20">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {actionCards.map((card) => (
                <Card key={card.title} className="text-center p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        {card.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                    <p className="text-muted-foreground flex-grow mb-6">{card.description}</p>
                    <Button asChild className="w-full">
                        <Link href={card.href}>{card.cta}</Link>
                    </Button>
                </Card>
             ))}
           </div>
        </div>
      </section>

      {/* Latest Verified Listings */}
      <section className="py-16 bg-secondary/50 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Verified Listings
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              Freshly listed and verified properties waiting for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestVerifiedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
                <Link href="/search">View All Listings</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why RentVerify? Section */}
      <section className="py-16 bg-background sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose RentVerify?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              We are committed to making your rental journey seamless and secure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
