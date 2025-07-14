
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
    {
        icon: <TrendingUp className="h-10 w-10 text-primary" />,
        title: "Reach Thousands of Tenants",
        description: "Your property gets visibility with a large, engaged audience of potential renters actively searching in your area."
    },
    {
        icon: <CheckCircle className="h-10 w-10 text-primary" />,
        title: "Connect with Verified Renters",
        description: "We encourage tenant verification, helping you find trustworthy and reliable renters for your property."
    },
    {
        icon: <Zap className="h-10 w-10 text-primary" />,
        title: "Streamlined Listing Process",
        description: "Our easy-to-use platform lets you list your property in minutes. Upload photos, add details, and go live."
    },
];

const testimonials = [
    {
        quote: "Listing my apartment on GharBhada was a game-changer. I found a reliable tenant in less than a week without any hassle. The direct communication is fantastic!",
        name: "Rohan S.",
        location: "Kathmandu",
        avatar: "https://placehold.co/100x100.png",
        "data-ai-hint": "man portrait"
    },
    {
        quote: "As a first-time landlord, I was nervous. GharBhada's verification process and digital contracts gave me the confidence I needed. Highly recommended!",
        name: "Anjali T.",
        location: "Pokhara",
        avatar: "https://placehold.co/100x100.png",
        "data-ai-hint": "woman portrait"
    }
]

export default function ListPropertyLanding() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative bg-secondary/50 py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Effortlessly Rent Out Your Property
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Join Nepal's trusted rental marketplace. Connect directly with verified tenants, manage your listings, and sign contracts—all in one place.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
                <Link href="/login?redirect=/list-property">Get Started for Free</Link>
            </Button>
             <Button asChild size="lg" variant="outline">
                <Link href="/help-center">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why List with GharBhada?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              We provide the tools you need for a secure and successful rental experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center p-6">
                 <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image src="https://placehold.co/600x400.png" alt="Owner Dashboard Preview" fill className="object-cover" data-ai-hint="dashboard screen" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Manage Everything with Ease</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Our owner dashboard gives you a complete overview of your listings. Track views, manage inquiries, and see your performance at a glance. We make property management simple, so you can focus on what matters.
                    </p>
                     <div className="mt-6 flex items-start gap-4">
                        <Users className="h-10 w-10 text-primary flex-shrink-0 mt-1"/>
                        <div>
                             <h3 className="text-xl font-semibold">A Community You Can Trust</h3>
                             <p className="mt-1 text-muted-foreground">We're committed to building a safe environment. Our verification process for owners helps create a marketplace where everyone can feel secure.</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hear from Our Property Owners
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <blockquote className="text-muted-foreground italic mb-6">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center gap-4">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-primary/50"
                      data-ai-hint={testimonial['data-ai-hint']}
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary/90 text-primary-foreground">
         <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to find your next great tenant?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                It's free to list your property. Sign up today and connect with thousands of renters across Nepal.
            </p>
            <div className="mt-8">
                <Button size="lg" variant="secondary" asChild>
                    <Link href="/login?redirect=/list-property">Start Listing Now</Link>
                </Button>
            </div>
         </div>
      </section>

    </div>
  );
}
