
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';
import { Phone, KeyRound, Handshake, Building, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult, GoogleAuthProvider, signInWithPopup, type UserCredential } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { createUserProfile } from '@/lib/firestore';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 72.2C322 104 288.7 88 248 88c-88.3 0-160 71.7-160 160s71.7 160 160 160c94.4 0 135.6-70.3 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
    </svg>
);


export default function LoginPage() {
    const [role, setRole] = useState('tenant');
    const [loginStep, setLoginStep] = useState('options'); // 'options' or 'otp'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const handleSuccessfulLogin = async (userCredential: UserCredential) => {
        try {
            await createUserProfile(userCredential.user, { role });
            toast({ title: 'Login Successful', description: 'You have been successfully logged in.' });
            const redirectUrl = searchParams.get('redirect') || '/dashboard';
            router.push(redirectUrl);
        } catch (error) {
            console.error("Error creating user profile:", error);
            toast({ title: 'Error', description: 'Could not set up your user profile.', variant: 'destructive' });
        }
    }

    const generateRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response: any) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
        }
    }

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            generateRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, `+1${phoneNumber}`, appVerifier);
            setConfirmationResult(result);
            setLoginStep('otp');
            toast({ title: 'OTP Sent', description: `An OTP has been sent to +1${phoneNumber}.` });
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast({ title: 'Error', description: 'Failed to send OTP. Please check the phone number and try again.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmationResult) return;
        setIsLoading(true);
        try {
            const userCredential = await confirmationResult.confirm(otp);
            await handleSuccessfulLogin(userCredential);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast({ title: 'Error', description: 'Invalid OTP. Please try again.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            await handleSuccessfulLogin(userCredential);
        } catch (error) {
            console.error("Google Sign-in error:", error);
            toast({ title: "Google Sign-In Failed", description: "Could not sign in with Google. Please try again.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
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
                                <div className="space-y-6">
                                     <div>
                                        <Label className="font-medium">I am a...</Label>
                                        <RadioGroup
                                            defaultValue="tenant"
                                            className="grid grid-cols-2 gap-4 mt-2"
                                            onValueChange={(value) => setRole(value as 'tenant' | 'owner')}
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
                                    
                                    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                                        <GoogleIcon />
                                        Sign in with Google
                                    </Button>

                                    <div className="my-6 flex items-center">
                                        <Separator className="flex-grow"/>
                                        <span className="mx-4 text-xs text-muted-foreground">OR</span>
                                        <Separator className="flex-grow"/>
                                    </div>
                                
                                    <form onSubmit={handlePhoneSubmit} className="space-y-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-muted-foreground sm:text-sm">+1</span>
                                            </div>
                                            <Input 
                                                type="tel" 
                                                placeholder="Enter your phone number" 
                                                className="pl-10" 
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Phone className="mr-2 h-4 w-4" />}
                                            Continue with Phone
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </>
                    )}

                     {loginStep === 'otp' && (
                        <>
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-2xl">Enter OTP</CardTitle>
                                <CardDescription>
                                    We've sent a one-time password to <span className="font-semibold text-foreground">+1{phoneNumber}</span>. 
                                    <Button variant="link" className="p-1 h-auto" onClick={() => setLoginStep('options')}>Change number</Button>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <form onSubmit={handleOtpSubmit}>
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <Input 
                                                type="text" 
                                                placeholder="6-digit OTP" 
                                                className="pl-10 text-center tracking-[0.5em]" 
                                                maxLength={6} 
                                                required
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                                            Verify & Login
                                        </Button>
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
