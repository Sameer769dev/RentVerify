
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ShieldCheck, Loader2, CheckCircle, XCircle, FileImage } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { verifyKyc, type KycOutput } from '@/ai/flows/kyc-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const kycSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Full address is required"),
  docType: z.enum(['passport', 'drivers_license', 'national_id'], {
    required_error: "Please select a document type.",
  }),
  documentFront: z.custom<File>(val => val instanceof File, "Please upload the front of your document."),
  documentBack: z.custom<File>(val => val instanceof File, "Please upload the back of your document.").optional(),
});

type KycFormData = z.infer<typeof kycSchema>;

export default function VerifyKycForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<KycOutput | null>(null);
  const [fileNames, setFileNames] = useState<{ front: string | null; back: string | null }>({ front: null, back: null });

  const form = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
    },
  });
  
  const docType = form.watch("docType");

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: KycFormData) => {
    setIsLoading(true);
    setVerificationResult(null);

    if(docType !== 'passport' && !data.documentBack) {
        form.setError("documentBack", { type: "manual", message: "Back of document is required for this document type." });
        setIsLoading(false);
        return;
    }

    try {
      const documentFrontPhotoDataUri = await fileToDataUri(data.documentFront);
      const documentBackPhotoDataUri = data.documentBack ? await fileToDataUri(data.documentBack) : undefined;
      
      const result = await verifyKyc({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        documentType: data.docType,
        documentFrontPhotoDataUri,
        documentBackPhotoDataUri,
      });
      setVerificationResult(result);
      toast({
        title: result.isVerified ? "Verification Successful" : "Verification Failed",
        description: result.reason,
        variant: result.isVerified ? "default" : "destructive",
      });
    } catch (error) {
      console.error("KYC verification failed:", error);
      toast({
        title: "An error occurred",
        description: "Could not complete verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFileUpload = (field: any, name: 'front' | 'back', label: string, placeholder: string) => (
     <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
            <div className="flex items-center justify-center w-full">
            <label htmlFor={`${name}DocUpload`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {fileNames[name] ? (
                    <>
                    <FileImage className="w-8 h-8 mb-4 text-primary" />
                    <p className="mb-2 text-sm text-foreground">{fileNames[name]}</p>
                    <p className="text-xs text-muted-foreground">Click to change file</p>
                    </>
                ) : (
                    <>
                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{placeholder}</span></p>
                    <p className="text-xs text-muted-foreground">Clear photo (PNG, JPG)</p>
                    </>
                )}
                </div>
                <Input
                id={`${name}DocUpload`}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                    field.onChange(file);
                    setFileNames(prev => ({...prev, [name]: file.name}));
                    }
                }}
                />
            </label>
            </div>
        </FormControl>
        <FormMessage />
    </FormItem>
  )

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Owner KYC Verification
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Verify your identity to build trust and list your properties.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Submit Your Documents</CardTitle>
              <CardDescription>Please provide accurate information and a clear document photo.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!verificationResult || !verificationResult.isVerified ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Full Address</FormLabel><FormControl><Input placeholder="123 Main St, Metropolis, USA" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="docType" render={({ field }) => (
                    <FormItem><FormLabel>Document Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a document type" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="drivers_license">Driver's License</SelectItem>
                            <SelectItem value="national_id">National ID Card</SelectItem>
                        </SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="documentFront" render={({ field }) => renderFileUpload(field, 'front', 'Document Front', 'Click to upload front')} />
                    {docType && docType !== 'passport' && (
                        <FormField control={form.control} name="documentBack" render={({ field }) => renderFileUpload(field, 'back', 'Document Back', 'Click to upload back')} />
                    )}
                </div>

                <Button type="submit" className="w-full !mt-10" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Submit for Verification
                </Button>
              </form>
            </Form>
          ) : null}

          {verificationResult && (
             <Alert className="mt-6" variant={verificationResult.isVerified ? "default" : "destructive"}>
                {verificationResult.isVerified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{verificationResult.isVerified ? "Verification Successful!" : "Verification Failed"}</AlertTitle>
                <AlertDescription>
                  {verificationResult.reason}
                   {verificationResult.isVerified && (
                     <Button asChild className="mt-4 w-full">
                        <Link href="/list-property">Proceed to List a Property</Link>
                     </Button>
                   )}
                   {!verificationResult.isVerified && (
                     <Button onClick={() => setVerificationResult(null)} className="mt-4 w-full" variant="secondary">
                        Try Again
                     </Button>
                   )}
                </AlertDescription>
            </Alert>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
