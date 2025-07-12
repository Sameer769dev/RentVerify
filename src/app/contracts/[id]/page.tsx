
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Wand2, Loader2, Download, FileText } from 'lucide-react';
import { generateContract } from '@/ai/flows/generate-contract-flow';

const contractTemplates: { [key: string]: { title: string; description: string } } = {
  'standard-residential': {
    title: 'Standard Residential Lease',
    description: 'A comprehensive, standard lease agreement for residential properties.',
  },
  'roommate-agreement': {
    title: 'Roommate Agreement',
    description: 'An agreement to be used between roommates sharing a single rental unit.',
  },
  'month-to-month-rental': {
    title: 'Month-to-Month Rental',
    description: 'A flexible lease that renews on a monthly basis.',
  },
  'sublease-agreement': {
    title: 'Sublease Agreement',
    description: 'For tenants who want to rent out a portion or all of their rental property.',
  },
};

const contractSchema = z.object({
  landlordName: z.string().min(1, "Landlord's name is required."),
  tenantName: z.string().min(1, "Tenant's name is required."),
  propertyAddress: z.string().min(1, "Property address is required."),
  rentAmount: z.coerce.number().min(1, "Rent amount must be positive."),
  leaseStartDate: z.string().min(1, "Start date is required."),
  leaseEndDate: z.string().min(1, "End date is required."),
});

type ContractFormData = z.infer<typeof contractSchema>;

export default function GenerateContractPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);

  const template = contractTemplates[params.id] || {
    title: "Generate Contract",
    description: "Fill in the details to create a rental agreement."
  };

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
        landlordName: '',
        tenantName: '',
        propertyAddress: '',
        leaseStartDate: new Date().toISOString().split('T')[0],
        leaseEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: ContractFormData) => {
    setIsLoading(true);
    setGeneratedContract(null);
    try {
      const result = await generateContract({
        ...data,
        contractType: template.title,
      });
      setGeneratedContract(result.contractText);
      toast({
        title: "Contract Generated Successfully!",
        description: "Review the contract below. You can now download it.",
      });
    } catch (error) {
      console.error("Contract generation failed:", error);
      toast({
        title: "An error occurred",
        description: "Could not generate the contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!generatedContract) return;
    const blob = new Blob([generatedContract], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${params.id.replace(/-/g, '_')}_agreement.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
       <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {template.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {template.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
              <CardDescription>Fill in the information to generate the agreement.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="landlordName" render={({ field }) => (
                    <FormItem><FormLabel>Landlord Name</FormLabel><FormControl><Input placeholder="John Landlord" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="tenantName" render={({ field }) => (
                    <FormItem><FormLabel>Tenant Name</FormLabel><FormControl><Input placeholder="Jane Tenant" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="propertyAddress" render={({ field }) => (
                    <FormItem><FormLabel>Property Address</FormLabel><FormControl><Input placeholder="123 Main St, Anytown, USA" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="rentAmount" render={({ field }) => (
                    <FormItem><FormLabel>Monthly Rent ($)</FormLabel><FormControl><Input type="number" placeholder="1500" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="leaseStartDate" render={({ field }) => (
                        <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="leaseEndDate" render={({ field }) => (
                        <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                   </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate Contract
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div>
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Generated Document</CardTitle>
                        <CardDescription>Review your generated contract here.</CardDescription>
                    </div>
                     <Button onClick={handleDownload} disabled={!generatedContract || isLoading} size="sm">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </CardHeader>
                <CardContent>
                   <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap border rounded-md p-4 min-h-[400px] bg-secondary/30">
                     {isLoading && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                     {!isLoading && !generatedContract && <div className="flex flex-col justify-center items-center h-full text-center">
                        <FileText className="h-12 w-12 text-muted-foreground/50 mb-4"/>
                        <p>Your contract will appear here once generated.</p>
                     </div>}
                     {generatedContract}
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
