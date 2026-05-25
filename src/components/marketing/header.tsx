"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Rocket, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS, SITE } from "@/lib/site";

export function MarketingHeader() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 w-full"
        >
            <div className="glass mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white shadow-lg shadow-fuchsia-500/30">
                        <Rocket className="h-4 w-4" />
                    </span>
                    <span className="text-gradient text-lg">{SITE.name}</span>
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {NAV_LINKS.map((l) => (
                        <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition">
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                    <ThemeToggle />
                    {session?.user ? (
                        <>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/dashboard"><LayoutDashboard className="mr-1 h-4 w-4" />Dashboard</Link>
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => signOut()}>
                                <LogOut className="mr-1 h-4 w-4" /> Sign out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost" size="sm"><Link href="/login">Login</Link></Button>
                            <Button asChild variant="gradient" size="sm"><Link href="/register">Get Started Free</Link></Button>
                        </>
                    )}
                </div>

                <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mx-auto mt-2 max-w-7xl rounded-2xl glass p-4 md:hidden"
                >
                    <div className="flex flex-col gap-3">
                        {NAV_LINKS.map((l) => (
                            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm">
                                {l.label}
                            </Link>
                        ))}
                        <div className="flex items-center gap-2 pt-2">
                            <ThemeToggle />
                            {session?.user ? (
                                <Button asChild size="sm" className="flex-1"><Link href="/dashboard">Dashboard</Link></Button>
                            ) : (
                                <>
                                    <Button asChild variant="outline" size="sm" className="flex-1"><Link href="/login">Login</Link></Button>
                                    <Button asChild variant="gradient" size="sm" className="flex-1"><Link href="/register">Sign up</Link></Button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
