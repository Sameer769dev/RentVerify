
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';
import { Phone, KeyRound, Handshake, Building } from "lucide-react";
import { useRouter } from 'next/navigation';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-.83 0-1.5.67-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/>
    </svg>
);


export default function LoginPage() {
    const [role, setRole] = useState('tenant');
    const [loginStep, setLoginStep] = useState('options'); // 'options' or 'otp'
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically call your backend to send an OTP
        console.log(`Sending OTP to ${phoneNumber} for a ${role}`);
        setLoginStep('otp');
    }
    
    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would verify the OTP
        console.log(`Verifying OTP for ${phoneNumber}`);
        // On success, redirect the user with a loggedin state
        router.push('/?loggedin=true');
    }

    const handleGoogleSignIn = () => {
        console.log('Simulating Google Sign-in');
        router.push('/?loggedin=true');
    }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-primary p-10 text-primary-foreground flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <Building className="h-10 w-10"/>
                        <h1 className="text-3xl font-bold">RentVerify</h1>
                    </div>
                    <p className="text-lg mb-2">Find Your Perfect Rental.</p>
                    <p className="text-primary-foreground/80">
                        Join a community built on trust and transparency. Whether you're looking for a home or listing a property, we've got you covered.
                    </p>
                    <Handshake className="h-24 w-24 mt-8 opacity-20 self-center"/>
                </div>
                <div className="p-10">
                    {loginStep === 'options' && (
                        <>
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-2xl">Welcome!</CardTitle>
                                <CardDescription>Please select your role and sign in.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <form onSubmit={handlePhoneSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <Label className="font-medium">I am a...</Label>
                                            <RadioGroup
                                                defaultValue="tenant"
                                                className="grid grid-cols-2 gap-4 mt-2"
                                                onValueChange={setRole}
                                                value={role}
                                            >
                                                <div>
                                                    <RadioGroupItem value="tenant" id="tenant" className="peer sr-only" />
                                                    <Label htmlFor="tenant" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        Tenant
                                                    </Label>
                                                </div>
                                                <div>
                                                    <RadioGroupItem value="owner" id="owner" className="peer sr-only" />
                                                    <Label htmlFor="owner" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        Owner
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <Input 
                                                type="tel" 
                                                placeholder="Enter your phone number" 
                                                className="pl-10" 
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">Continue with Phone</Button>
                                    </div>
                                </form>
                                <div className="my-6 flex items-center">
                                    <Separator className="flex-grow"/>
                                    <span className="mx-4 text-xs text-muted-foreground">OR</span>
                                    <Separator className="flex-grow"/>
                                </div>
                                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                                    <GoogleIcon />
                                    Sign in with Google
                                </Button>
                            </CardContent>
                        </>
                    )}

                     {loginStep === 'otp' && (
                        <>
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-2xl">Enter OTP</CardTitle>
                                <CardDescription>
                                    We've sent a one-time password to <span className="font-semibold text-foreground">{phoneNumber}</span>. 
                                    <Button variant="link" className="p-1 h-auto" onClick={() => setLoginStep('options')}>Change number</Button>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <form onSubmit={handleOtpSubmit}>
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <Input type="text" placeholder="Enter 6-digit OTP" className="pl-10 text-center tracking-[0.5em]" maxLength={6} required/>
                                        </div>
                                        <Button type="submit" className="w-full">Verify & Login</Button>
                                        <div className="text-center">
                                            <Button variant="link" className="text-sm">Didn't receive code? Resend</Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </>
                    )}
                </div>
            </div>
        </Card>
    </div>
  );
}
