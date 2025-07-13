
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GharBhadaIcon from "@/components/gharbhada-icon";

const pressReleases = [
  {
    date: "August 15, 2024",
    title: "GharBhada Launches to Revolutionize the Rental Market in Nepal",
    excerpt: "GharBhada, a new online platform, officially launched today with the mission to connect tenants directly with verified property owners, eliminating the need for brokers.",
    href: "#"
  },
  {
    date: "July 2, 2024",
    title: "GharBhada Secures Pre-Seed Funding to Build a Trusted Rental Community",
    excerpt: "The company has secured funding to further develop its platform, focusing on robust KYC verification and AI-powered tools to enhance user experience.",
    href: "#"
  },
];

const fastFacts = {
    "Founded": "2024",
    "Headquarters": "Kathmandu, Nepal",
    "Mission": "To create a seamless and secure rental ecosystem built on trust and transparency.",
    "Key Features": "Broker-free platform, KYC verification, AI-powered tools, Digital Contracts."
}

export default function PressPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
                <GharBhadaIcon className="h-16 w-16 text-primary"/>
            </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Press & Media
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Information and resources for journalists, bloggers, and media professionals. For all inquiries, please contact us at <a href="mailto:press@gharbhada.com" className="text-primary hover:underline">press@gharbhada.com</a>.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
                    Press Releases
                </h2>
                <div className="space-y-8">
                    {pressReleases.map(release => (
                        <div key={release.title} className="border-b pb-8">
                            <p className="text-sm text-muted-foreground mb-2">{release.date}</p>
                            <h3 className="text-2xl font-semibold mb-3 hover:text-primary transition-colors">
                                <Link href={release.href}>{release.title}</Link>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">{release.excerpt}</p>
                        </div>
                    ))}
                </div>
             </div>
             <div className="lg:col-span-1 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Media Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Sunita Rai</p>
                        <p className="text-sm text-muted-foreground">Head of Communications</p>
                        <Button asChild className="w-full mt-4">
                           <a href="mailto:press@gharbhada.com"><Mail className="mr-2 h-4 w-4"/> Email Us</a>
                        </Button>
                    </CardContent>
                 </Card>
                  <Card>
                    <CardHeader>
                        <CardTitle>Fast Facts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                       {Object.entries(fastFacts).map(([key, value]) => (
                           <div key={key}>
                               <p className="font-semibold">{key}</p>
                               <p className="text-muted-foreground">{value}</p>
                           </div>
                       ))}
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Media Kit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Download our official logos, brand guidelines, and executive headshots.</p>
                         <Button asChild className="w-full">
                           <Link href="#"><Download className="mr-2 h-4 w-4"/> Download Kit</Link>
                        </Button>
                    </CardContent>
                 </Card>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
