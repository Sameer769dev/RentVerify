
"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import { useAuth } from "./auth-provider";

const WEBSITE_PATHS = ['/', '/about', '/careers', '/press', '/legal/terms-of-service', '/legal/privacy-policy', '/legal/cookie-policy'];

export default function PageShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    const isLoginPage = pathname === '/login';

    // Don't show header/footer on login page for a more focused experience
    if (isLoginPage) {
        return <main className="flex-grow">{children}</main>;
    }
    
    // Website view for logged-out users or on specific public pages
    const isWebsiteView = !user || WEBSITE_PATHS.some(path => pathname.startsWith(path));


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            {isWebsiteView && <Footer />}
        </div>
    )
}
