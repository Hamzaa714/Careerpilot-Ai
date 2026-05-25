"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CheckoutButton() {
    async function checkout() {
        const res = await fetch("/api/stripe/checkout", { method: "POST" });
        const j = await res.json();
        if (j.url) window.location.href = j.url;
        else toast.error(j.error || "Stripe not configured");
    }
    return <Button variant="gradient" onClick={checkout}>Upgrade to Premium — PKR 1,499/mo</Button>;
}
