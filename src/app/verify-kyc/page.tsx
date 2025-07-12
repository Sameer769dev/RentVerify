import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ShieldCheck } from "lucide-react";

export default function VerifyKycPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          KYC Verification
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Verify your identity to build trust and unlock all features.
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
                    <CardDescription>Please provide accurate information and clear document scans.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="123 Main St, Metropolis, USA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="docType">Document Type</Label>
              <Select>
                <SelectTrigger id="docType">
                  <SelectValue placeholder="Select a document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="national_id">National ID Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="docUpload">Upload Document</Label>
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="docUpload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                      </div>
                      <Input id="docUpload" type="file" className="hidden" />
                  </label>
              </div> 
            </div>
            <Button type="submit" className="w-full">
              Submit for Verification
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
