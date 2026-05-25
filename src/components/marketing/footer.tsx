import Link from "next/link";
import { SITE } from "@/lib/site";
import { Github, Linkedin, Twitter } from "lucide-react";

export function MarketingFooter() {
    return (
        <footer className="mt-20 border-t border-white/5">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                    <h3 className="text-gradient text-lg font-bold">{SITE.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{SITE.tagline}</p>
                    <div className="mt-4 flex gap-3 text-muted-foreground">
                        <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4 hover:text-foreground" /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4 hover:text-foreground" /></a>
                        <a href="#" aria-label="GitHub"><Github className="h-4 w-4 hover:text-foreground" /></a>
                    </div>
                </div>
                <FooterCol title="Product" links={[["Features", "/features"], ["Templates", "/templates"], ["Pricing", "/pricing"], ["AI Tools", "/dashboard"]]} />
                <FooterCol title="Resources" links={[["Jobs", "/jobs"], ["Interview Prep", "/dashboard/ai/interview"], ["LinkedIn Optimizer", "/dashboard/ai/linkedin"], ["Cover Letter", "/dashboard/ai/cover-letter"]]} />
                <FooterCol title="Company" links={[["Contact", "/contact"], ["Privacy", "/privacy"], ["Terms", "/terms"]]} />
            </div>
            <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} {SITE.name}. Built with 💚 in Pakistan.
            </div>
        </footer>
    );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
    return (
        <div>
            <h4 className="mb-3 text-sm font-semibold">{title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
                {links.map(([label, href]) => (
                    <li key={href}><Link href={href} className="hover:text-foreground">{label}</Link></li>
                ))}
            </ul>
        </div>
    );
}
