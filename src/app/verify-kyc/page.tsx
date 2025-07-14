
"use client";

import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";
import VerifyKycForm from "./verify-kyc-form";
import VerifyKycLanding from "./verify-kyc-landing";

export default function VerifyKycPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return user ? <VerifyKycForm /> : <VerifyKycLanding />;
}
