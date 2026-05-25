import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
    description: SITE.description,
    keywords: [
        "AI Resume Builder Pakistan",
        "ATS Resume",
        "Cover Letter Generator",
        "LinkedIn Optimizer",
        "Interview Preparation",
        "Jobs in Pakistan",
    ],
    openGraph: {
        title: `${SITE.name} — ${SITE.tagline}`,
        description: SITE.description,
        url: SITE.url,
        siteName: SITE.name,
        locale: "en_PK",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
    robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background font-sans">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
