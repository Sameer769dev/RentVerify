
"use client";

import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";
import ListPropertyForm from "./list-property-form";
import ListPropertyLanding from "./list-property-landing";

export default function ListPropertyPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return user ? <ListPropertyForm /> : <ListPropertyLanding />;
}
