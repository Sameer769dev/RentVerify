
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Zap, UserMinus, Building, Users, Target } from "lucide-react";

const teamMembers = [
  {
    name: "Aarav Sharma",
    role: "Founder & CEO",
    avatar: "https://placehold.co/200x200.png",
    bio: "Aarav founded GharBhada with the vision of simplifying the rental process in Nepal, bringing transparency and trust to the forefront.",
    "data-ai-hint": "man portrait"
  },
  {
    name: "Sunita Rai",
    role: "Head of Operations",
    avatar: "https://placehold.co/200x200.png",
    bio: "Sunita ensures that the day-to-day operations run smoothly, focusing on user satisfaction and platform integrity.",
    "data-ai-hint": "woman portrait"
  },
  {
    name: "Rohan Thapa",
    role: "Lead Developer",
    avatar: "https://placehold.co/200x200.png",
    bio: "Rohan leads the technical team, building the robust and secure platform that our users rely on every day.",
    "data-ai-hint": "man smiling"
  },
];

const values = [
    {
        icon: <HeartHandshake className="h-8 w-8 text-primary" />,
        title: "Build with Trust",
        description: "Transparency and verification are at the core of everything we do to ensure a secure community."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Community First",
        description: "We are committed to building a supportive and respectful community for both tenants and owners."
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Innovate for Simplicity",
        description: "We believe in the power of technology to make the rental experience effortless and intuitive."
    }
]

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-secondary/50 py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            About GharBhada
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            We are revolutionizing the rental market in Nepal by connecting tenants directly with verified owners, building a community founded on trust, transparency, and simplicity.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image src="https://placehold.co/600x450.png" alt="Happy family receiving keys" fill className="object-cover" data-ai-hint="happy family" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Our mission is to create a seamless and secure rental ecosystem where finding a home is as joyful as living in one. We aim to eliminate the friction of broker-heavy processes, empowering both tenants and property owners with the tools they need to connect with confidence.
                    </p>
                     <div className="mt-6 flex items-start gap-4">
                        <Target className="h-10 w-10 text-primary flex-shrink-0 mt-1"/>
                        <div>
                             <h3 className="text-xl font-semibold">Our Vision</h3>
                             <p className="mt-1 text-muted-foreground">To be Nepal's most trusted and beloved rental platform, known for our commitment to community and innovation.</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </section>
      
       {/* Our Values Section */}
      <section className="py-16 sm:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              The principles that guide our work and our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center p-6">
                 <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              The passionate individuals dedicated to building GharBhada.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden">
                 <CardContent className="p-6">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto mb-4 border-4 border-primary/20"
                      data-ai-hint={member['data-ai-hint']}
                    />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                 </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
