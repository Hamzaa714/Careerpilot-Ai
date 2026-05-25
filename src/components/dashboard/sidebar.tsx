"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
    LayoutDashboard, FileText, Sparkles, MessageSquare, Brain, Briefcase,
    Settings, LogOut, Rocket, Linkedin, ShieldCheck, CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/resumes", label: "My Resumes", icon: FileText },
    { href: "/dashboard/ai/summary", label: "AI Summary", icon: Sparkles },
    { href: "/dashboard/ai/cover-letter", label: "Cover Letter", icon: MessageSquare },
    { href: "/dashboard/ai/linkedin", label: "LinkedIn", icon: Linkedin },
    { href: "/dashboard/ai/interview", label: "Interview Prep", icon: Brain },
    { href: "/dashboard/ai/ats", label: "ATS Analyzer", icon: ShieldCheck },
    { href: "/dashboard/jobs", label: "Saved Jobs", icon: Briefcase },
    { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ isAdmin }: { isAdmin?: boolean }) {
    const path = usePathname();
    return (
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-white dark:bg-card/60 backdrop-blur-xl shadow-sm md:flex md:flex-col">
            <div className="p-5">
                <Link href="/" className="flex items-center gap-2 font-bold">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white shadow-lg shadow-fuchsia-500/30">
                        <Rocket className="h-4 w-4" />
                    </span>
                    <span className="text-gradient">CareerPilot</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-3">
                {nav.map((n) => {
                    const active = path === n.href || path.startsWith(n.href + "/");
                    return (
                        <Link key={n.href} href={n.href} className={cn(
                            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                            active ? "bg-gradient-brand text-white shadow-lg shadow-fuchsia-500/20" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}>
                            <n.icon className="h-4 w-4" />
                            <span>{n.label}</span>
                            {active && <motion.span layoutId="active-pill" className="ml-auto h-2 w-2 rounded-full bg-white" />}
                        </Link>
                    );
                })}
                {isAdmin && (
                    <Link href="/admin" className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-amber-500 hover:bg-amber-500/10">
                        <ShieldCheck className="h-4 w-4" /> Admin Panel
                    </Link>
                )}
            </nav>
            <div className="p-3">
                <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
                    <LogOut className="h-4 w-4" /> Sign out
                </button>
            </div>
        </aside>
    );
}
