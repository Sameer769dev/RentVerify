
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { getListings, getUsers, updateListing } from "@/lib/firestore";
import type { AdminListing } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminPage() {
  const [listings, setListings] = useState<AdminListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const isUserAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isUserAdmin) {
      router.push("/");
      return;
    }

    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [allListings, allUsers] = await Promise.all([
            getListings(),
            getUsers()
        ]);

        const usersMap = new Map(allUsers.map(u => [u.uid, u]));
        
        const listingsWithOwners = allListings.map(listing => ({
            ...listing,
            owner: listing.ownerId ? usersMap.get(listing.ownerId) : undefined
        }));

        setListings(listingsWithOwners);
      } catch (error) {
        console.error("Failed to fetch data for admin panel:", error);
        toast({
          title: "Error",
          description: "Could not fetch data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [user, authLoading, router, toast, isUserAdmin]);

  const handleVerificationToggle = async (listingId: string, currentStatus: boolean) => {
    try {
        await updateListing(listingId, { verified: !currentStatus });
        setListings(prevListings => 
            prevListings.map(l => 
                l.id === listingId ? { ...l, verified: !currentStatus } : l
            )
        );
        toast({
            title: "Success!",
            description: `Listing has been ${!currentStatus ? 'verified' : 'unverified'}.`
        })
    } catch(error) {
        console.error("Failed to update listing status:", error);
        toast({ title: "Error", description: "Could not update listing status.", variant: "destructive" });
    }
  }


  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isUserAdmin) {
    return (
       <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
            <ShieldAlert className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground mt-2">
                This page is for administrators only.
            </p>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Moderate and manage platform content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Listing Verification</CardTitle>
          <CardDescription>
            Review all submitted properties. Toggle the switch to verify or
            unverify a listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">
                     <Link href={`/listings/${listing.id}`} className="hover:underline" target="_blank">
                        {listing.title}
                    </Link>
                  </TableCell>
                  <TableCell>{listing.owner?.displayName || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={listing.verified ? "secondary" : "destructive"}>
                       {listing.verified ? (
                           <><ShieldCheck className="h-4 w-4 mr-1"/> Verified</>
                       ) : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <span>{listing.verified ? "Verified" : "Unverified"}</span>
                        <Switch
                            checked={listing.verified}
                            onCheckedChange={() => handleVerificationToggle(listing.id, listing.verified)}
                            aria-label={`Verify ${listing.title}`}
                        />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
