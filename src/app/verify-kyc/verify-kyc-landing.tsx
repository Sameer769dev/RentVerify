
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, UserCheck, FileCheck2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        icon: <UserCheck className="h-10 w-10 text-primary" />,
        title: "Build Tenant Trust",
        description: "A 'Verified' badge on your profile and listings significantly increases trust and attracts more serious inquiries."
    },
    {
        icon: <FileCheck2 className="h-10 w-10 text-primary" />,
        title: "Unlock Platform Features",
        description: "Verification is required to list properties and use our secure digital contract generation tools."
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary" />,
        title: "Enhance Community Safety",
        description: "By verifying all property owners, we create a safer and more reliable marketplace for everyone involved."
    },
];

export default function VerifyKycLanding() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative bg-secondary/50 py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Become a Verified Owner
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Complete our simple and secure KYC (Know Your Customer) process to build trust, enhance your listing's visibility, and access all platform features.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
                <Link href="/login?redirect=/verify-kyc">Get Verified Now <ArrowRight className="ml-2 h-5 w-5"/></Link>
            </Button>
          </div>
        </div>
      </section>
      
       <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Benefits of Verification
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              A small step that makes a big difference for you and potential tenants.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center p-6">
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

      <section className="py-16 sm:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image src="https://placehold.co/600x400.png" alt="Secure Document Upload Interface" fill className="object-cover" data-ai-hint="secure interface" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Secure, and AI-Powered</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Our AI-powered verification process is designed to be quick and easy. Simply upload a photo of your government-issued ID, and our system will securely analyze and verify your information in minutes.
                    </p>
                     <ul className="mt-6 space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                            <p className="text-muted-foreground"><strong>Fast & Automated:</strong> Get verified quickly without manual review delays.</p>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                            <p className="text-muted-foreground"><strong>Data Privacy:</strong> Your data is encrypted and used solely for verification purposes.</p>
                        </li>
                     </ul>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary/90 text-primary-foreground">
         <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Build Trust?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                Start the verification process today to make your listings stand out.
            </p>
            <div className="mt-8">
                <Button size="lg" variant="secondary" asChild>
                    <Link href="/login?redirect=/verify-kyc">Start Verification</Link>
                </Button>
            </div>
         </div>
      </section>

    </div>
  );
}
