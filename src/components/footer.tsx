
import Link from "next/link"
import { Building, Twitter, Facebook, Instagram } from "lucide-react"
import GharBhadaIcon from "./gharbhada-icon"

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <GharBhadaIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">GharBhada</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Your trusted partner in finding the perfect rental home in Nepal.
            </p>
            <div className="mt-8 flex space-x-6 text-muted-foreground">
              <Link href="#" className="hover:text-primary"><span className="sr-only">Twitter</span><Twitter /></Link>
              <Link href="#" className="hover:text-primary"><span className="sr-only">Facebook</span><Facebook /></Link>
              <Link href="#" className="hover:text-primary"><span className="sr-only">Instagram</span><Instagram /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-medium">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link href="/press" className="text-muted-foreground hover:text-foreground">Press</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Resources</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link href="/contracts" className="text-muted-foreground hover:text-foreground">Contracts</Link></li>
                <li><Link href="/verify-kyc" className="text-muted-foreground hover:text-foreground">Owner Verification</Link></li>
                <li><Link href="/help-center" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link href="/legal/terms-of-service" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/legal/privacy-policy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/legal/cookie-policy" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GharBhada. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
