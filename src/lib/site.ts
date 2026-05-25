export const SITE = {
    name: "CareerPilot AI",
    tagline: "Pakistan’s #1 AI Resume & Career Platform",
    description:
        "Build ATS-friendly resumes, generate AI cover letters, optimize LinkedIn, and ace interviews — built for Pakistan.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    twitter: "@careerpilot_pk",
};

export const NAV_LINKS = [
    { href: "/features", label: "Features" },
    { href: "/templates", label: "Templates" },
    { href: "/pricing", label: "Pricing" },
    { href: "/jobs", label: "Jobs" },
    { href: "/contact", label: "Contact" },
];

export const AI_TOOLS = [
    { href: "/dashboard/ai/summary", label: "AI Summary", emoji: "✨" },
    { href: "/dashboard/ai/cover-letter", label: "Cover Letter", emoji: "✉️" },
    { href: "/dashboard/ai/linkedin", label: "LinkedIn Optimizer", emoji: "💼" },
    { href: "/dashboard/ai/interview", label: "Interview Prep", emoji: "🎯" },
    { href: "/dashboard/ai/ats", label: "ATS Analyzer", emoji: "🧠" },
];
