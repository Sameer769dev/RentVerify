
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Edit } from "lucide-react";

const contractTemplates = [
  {
    id: 'standard-residential',
    title: 'Standard Residential Lease',
    description: 'A comprehensive, standard lease agreement for residential properties. Covers all essential terms and conditions.',
  },
  {
    id: 'roommate-agreement',
    title: 'Roommate Agreement',
    description: 'An agreement to be used between roommates sharing a single rental unit. Outlines shared responsibilities.',
  },
  {
    id: 'month-to-month-rental',
    title: 'Month-to-Month Rental',
    description: 'A flexible lease that renews on a monthly basis. Ideal for short-term or uncertain tenancy durations.',
  },
  {
    id: 'sublease-agreement',
    title: 'Sublease Agreement',
    description: 'For tenants who want to rent out a portion or all of their rental property to another individual.',
  },
];

export default function ContractsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Digital Contracts
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Streamline your rental process with our digital contract templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contractTemplates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{template.title}</CardTitle>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"/>
            <CardFooter className="flex justify-end gap-2">
              <Button asChild>
                <Link href={`/contracts/${template.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Generate
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
