
"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
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

const navLinks = [
  { href: "/search", label: "Listings", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/contracts", label: "Contracts", icon: FileText },
  { href: "/blog", label: "Blog", icon: Newspaper },
]

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    // This is a simulation of auth state.
    // In a real app, you'd check a session cookie or context.
    if (searchParams.get('loggedin') === 'true') {
      setIsLoggedIn(true);
    }
  }, [searchParams]);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Building className="h-6 w-6 text-primary" />
        <Link
          href="/"
          className="text-lg font-bold text-foreground transition-colors hover:text-primary"
        >
          RentVerify
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
         <Button asChild>
            <Link href="/list-property">
              <PlusCircle className="mr-2 h-4 w-4" />
              List a Property
            </Link>
          </Button>

        {isLoggedIn ? (
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
                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <Link href="/verify-kyc">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Verify KYC</span>
                </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    <Link href="/" className="flex items-center w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <Button asChild variant="outline">
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4"/>
                    Login
                </Link>
            </Button>
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
                <Building className="h-6 w-6 text-primary" />
                <span className="sr-only">RentVerify</span>
              </div>
              {isLoggedIn && (
                <SheetClose asChild>
                    <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
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
