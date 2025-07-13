
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { LifeBuoy, User, Home } from "lucide-react"

const tenantFaqs = [
  {
    question: "How do I search for properties?",
    answer: "You can use the search bar on the homepage to search by city, area, or property type. On the search results page, you can use the filters on the left to narrow down your search by price, number of bedrooms, amenities, and more."
  },
  {
    question: "What does the 'Verified' badge mean?",
    answer: "A 'Verified' badge means the property owner has completed our KYC (Know Your Customer) process, and our admin team has manually reviewed and approved the listing. This adds an extra layer of trust and security to the listing."
  },
  {
    question: "How do I contact a property owner?",
    answer: "On each listing page, you will find buttons to 'Request to Book' or 'Message Owner'. Clicking these will allow you to send your inquiry directly to the property owner. You must be logged in to use this feature."
  },
   {
    question: "Are there any broker fees?",
    answer: "No. GharBhada is a broker-free platform. We connect tenants directly with property owners, saving you time and money."
  }
];

const ownerFaqs = [
  {
    question: "How do I list my property?",
    answer: "First, you need to sign up as an 'Owner'. Once logged in, click the 'List Your Property' button in the header. You'll be guided through a simple form to add details, photos, and amenities for your property."
  },
  {
    question: "Why do I need to complete KYC verification?",
    answer: "KYC verification is essential for building a trusted community. It verifies your identity, which allows us to add a 'Verified' badge to your listings, making them more attractive to potential tenants."
  },
  {
    question: "How do I manage my listings?",
    answer: "You can manage all your properties from your Owner Dashboard. There, you can see your active listings, view performance metrics, and manage inquiries from potential tenants."
  },
   {
    question: "Is it free to list a property on GharBhada?",
    answer: "Yes, it is currently free to list your properties on our platform. We aim to provide a simple and accessible way for owners to connect with tenants."
  }
];


export default function HelpCenterPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Help Center
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find answers to your questions about GharBhada.
        </p>
      </div>

      <div className="space-y-10">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
            <User className="h-7 w-7 text-primary"/>
            Questions for Tenants
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {tenantFaqs.map((faq, index) => (
               <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
           <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
            <Home className="h-7 w-7 text-primary"/>
            Questions for Owners
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {ownerFaqs.map((faq, index) => (
               <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="mt-16 text-center border-t pt-10">
        <h3 className="text-2xl font-bold">Still have questions?</h3>
        <p className="text-muted-foreground mt-2 mb-4">Our support team is here to help you.</p>
        <Button size="lg">
            <LifeBuoy className="mr-2 h-5 w-5"/>
            Contact Support
        </Button>
      </div>
    </div>
  );
}
