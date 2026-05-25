import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingHeader } from "@/components/marketing/header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern bg-[size:48px_48px] opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
            <MarketingHeader />
            <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>
            <MarketingFooter />
        </div>
    );
}
