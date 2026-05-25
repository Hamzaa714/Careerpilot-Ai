"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        await fetch("/api/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: fd.get("email") }) });
        setSent(true);
        toast.success("If the email exists, a reset link was sent.");
    }

    return (
        <Card className="p-8">
            <h1 className="text-2xl font-bold">Forgot password</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter your email and we’ll send a reset link.</p>
            {sent ? (
                <p className="mt-6 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-500">Check your inbox.</p>
            ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-3">
                    <div className="space-y-1"><Label>Email</Label><Input name="email" type="email" required /></div>
                    <Button variant="gradient" className="w-full">Send reset link</Button>
                </form>
            )}
        </Card>
    );
}
