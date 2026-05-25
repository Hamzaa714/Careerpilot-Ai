import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern bg-[size:48px_48px] opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
            <MarketingHeader />
            <main className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6">{children}</main>
            <footer className="py-6 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} CareerPilot AI • <Link href="/" className="underline-offset-2 hover:underline">Home</Link>
            </footer>
        </div>
    );
}
