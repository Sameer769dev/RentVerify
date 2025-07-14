
"use client"

import Link from "next/link"
import * as React from "react"
import {
  Home,
  Menu,
  MessageSquare,
  FileText,
  ShieldCheck,
  User,
  LogOut,
  Building,
  PlusCircle,
  Search,
  LogIn,
  Newspaper,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { auth } from "@/lib/firebase"
import GharBhadaIcon from "./gharbhada-icon"

const publicNavLinks = [
  { href: "/search", label: "Listings", icon: Search },
  { href: "/about", label: "About Us", icon: Building },
  { href: "/help-center", label: "Help Center", icon: ShieldCheck },
];

const appNavLinks = [
  { href: "/search", label: "Listings", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/contracts", label: "Contracts", icon: FileText },
]

export default function Header() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  }

  const navLinks = user ? appNavLinks : publicNavLinks;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <GharBhadaIcon className="h-7 w-7 text-primary" />
        <Link
          href="/"
          className="text-lg font-bold text-foreground transition-colors hover:text-primary"
        >
          GharBhada
        </Link>
      </div>

      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-auto">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:ml-4">
         {user && (
            <Button asChild>
                <Link href="/list-property">
                <PlusCircle className="mr-2 h-4 w-4" />
                List Property
                </Link>
            </Button>
         )}

        {user ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userProfile?.role === 'owner' && (
                     <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center w-full">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Owner Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <Link href="/verify-kyc" className="w-full flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Verify KYC</span>
                </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        ) : (
             <div className="flex items-center gap-2">
                <Button asChild>
                    <Link href="/list-property">
                    List for Free
                    </Link>
                </Button>
                 <Button asChild variant="outline">
                    <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4"/>
                        Login
                    </Link>
                </Button>
            </div>
        )}


        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <GharBhadaIcon className="h-6 w-6 text-primary" />
                <span className="sr-only">GharBhada</span>
              </div>
              {user && (
                <SheetClose asChild>
                    <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                </SheetClose>
              )}
               {user && (
                <SheetClose asChild>
                    <Link href="/profile" className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground">
                        <User className="h-5 w-5" />
                        Profile
                    </Link>
                </SheetClose>
              )}
              {navLinks.map(({ href, label, icon: Icon }) => (
                <SheetClose key={href} asChild>
                  <Link
                    href={href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                </SheetClose>
              ))}
               <SheetClose asChild>
                 <Link href="/verify-kyc" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <ShieldCheck className="h-5 w-5" />
                    KYC Verification
                 </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
