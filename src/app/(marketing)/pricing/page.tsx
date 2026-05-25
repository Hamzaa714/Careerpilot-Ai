"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
    return (
        <div className="py-16">
            <div className="text-center">
                <Badge variant="outline">Pricing</Badge>
                <h1 className="mt-3 text-5xl font-bold tracking-tight">Simple pricing for everyone</h1>
                <p className="mt-3 text-muted-foreground">Pay in PKR via JazzCash, Easypaisa or international cards.</p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
                {plans.map((p, i) => (
                    <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className={`relative h-full p-8 ${p.featured ? "ring-2 ring-fuchsia-500/60" : ""}`}>
                            {p.featured && <Badge variant="gradient" className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                            <h3 className="text-xl font-semibold">{p.name}</h3>
                            <div className="mt-2 text-4xl font-bold">{p.price}<span className="text-base font-normal text-muted-foreground">/{p.period}</span></div>
                            <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                            <ul className="mt-6 space-y-2 text-sm">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> {f}</li>
                                ))}
                            </ul>
                            <Button asChild variant={p.featured ? "gradient" : "outline"} className="mt-8 w-full">
                                <Link href={p.cta.href}>{p.cta.label}</Link>
                            </Button>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const plans = [
    {
        name: "Free", price: "PKR 0", period: "mo", tagline: "Build your first resume", featured: false,
        features: ["1 Resume", "20 AI credits", "Basic templates", "PDF export"], cta: { label: "Start free", href: "/register" }
    },
    {
        name: "Premium", price: "PKR 1,499", period: "mo", tagline: "Land jobs faster with AI", featured: true,
        features: ["Unlimited resumes", "Unlimited AI credits", "All premium templates", "Cover letters", "Interview practice", "Priority support"], cta: { label: "Upgrade now", href: "/dashboard/billing" }
    },
    {
        name: "Lifetime", price: "PKR 14,999", period: "once", tagline: "Pay once, use forever", featured: false,
        features: ["Everything in Premium", "Lifetime updates", "1-on-1 career session", "Early access to features"], cta: { label: "Get lifetime", href: "/contact" }
    },
];
