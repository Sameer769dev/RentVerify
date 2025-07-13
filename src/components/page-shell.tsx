"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

export default function PageShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isHomePage = pathname === '/';
    const isLoginPage = pathname === '/login';

    // Don't show header/footer on login page for a more focused experience
    if (isLoginPage) {
        return <main className="flex-grow">{children}</main>;
    }

    return (
        <>
            <div id="recaptcha-container"></div>
            <Header />
            <main className="flex-grow">{children}</main>
            {isHomePage && <Footer />}
        </>
    )
}
