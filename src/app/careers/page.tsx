
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const jobOpenings = [
  {
    title: "Senior Frontend Engineer (React)",
    location: "Kathmandu, Nepal (Remote)",
    type: "Full-time",
    description: "We are looking for an experienced Frontend Engineer to help us build and refine the GharBhada user experience. You'll work with Next.js, TypeScript, and Tailwind CSS to create beautiful, performant interfaces.",
    href: "#"
  },
  {
    title: "Product Manager - Growth",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    description: "As a Product Manager, you will drive the growth of our platform by identifying user needs, defining product roadmaps, and working closely with our engineering and design teams to deliver exceptional features.",
    href: "#"
  },
  {
    title: "Community Support Specialist",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    description: "You will be the voice of GharBhada, providing outstanding support to our users. This role is perfect for someone who is empathetic, patient, and passionate about helping others.",
    href: "#"
  },
];

const companyValues = [
    { title: "User-Obsessed", description: "We put our users at the center of every decision we make." },
    { title: "Ownership", description: "We take initiative and are accountable for our work and its impact." },
    { title: "Build with Integrity", description: "We believe that trust is earned through transparency and honesty." },
    { title: "Better Together", description: "We collaborate and support each other to achieve our shared mission." },
];

export default function CareersPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-secondary/50 py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Join Our Team
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Help us build the future of renting in Nepal. We're looking for passionate, talented individuals to join our mission-driven company.
          </p>
        </div>
      </section>

      {/* Why Work With Us Section */}
       <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Work at GharBhada?</h2>
                    <p>
                        At GharBhada, you'll be part of a dynamic and collaborative team that is passionate about solving real-world problems. We foster a culture of innovation, learning, and growth. We believe in empowering our team members to take ownership and make a tangible impact.
                    </p>
                     <ul>
                        <li><strong>Meaningful Work:</strong> Directly contribute to a product that helps thousands of people find a place to call home.</li>
                        <li><strong>Growth Opportunities:</strong> We invest in your professional development with continuous learning and mentorship.</li>
                        <li><strong>Collaborative Culture:</strong> Join a supportive environment where your ideas are valued and teamwork is celebrated.</li>
                     </ul>
                </div>
                 <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image src="https://placehold.co/600x400.png" alt="Team working collaboratively" fill className="object-cover" data-ai-hint="team collaboration" />
                </div>
            </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 sm:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Current Openings
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              Find your next opportunity at GharBhada.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 pt-2">
                        <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4"/> {job.type}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4"/> {job.location}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link href={job.href}>Apply Now <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
                <p className="text-muted-foreground">Don't see a role that fits? We're always looking for talented people.</p>
                <Button variant="link" asChild><Link href="#">Get in touch &rarr;</Link></Button>
           </div>
        </div>
      </section>
    </div>
  );
}
