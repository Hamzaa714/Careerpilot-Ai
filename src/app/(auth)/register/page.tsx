"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const body = { name: fd.get("name"), email: fd.get("email"), password: fd.get("password") };
        const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            setLoading(false);
            return toast.error(j.error || "Failed to register");
        }
        await signIn("credentials", { email: body.email, password: body.password, redirect: false });
        toast.success("Account created!");
        router.push("/dashboard");
        router.refresh();
    }

    return (
        <Card className="p-8">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Start building your AI-powered career today.</p>

            <Button type="button" variant="outline" className="mt-6 w-full" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
                Continue with Google
            </Button>
            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" />OR<div className="h-px flex-1 bg-border" /></div>

            <form onSubmit={onSubmit} className="space-y-3">
                <div className="space-y-1"><Label>Full name</Label><Input name="name" required placeholder="Ali Khan" /></div>
                <div className="space-y-1"><Label>Email</Label><Input name="email" type="email" required placeholder="you@example.com" /></div>
                <div className="space-y-1"><Label>Password</Label><Input name="password" type="password" required minLength={6} placeholder="At least 6 characters" /></div>
                <Button variant="gradient" className="w-full" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account? <Link href="/login" className="font-semibold text-gradient">Sign in</Link>
            </p>
        </Card>
    );
}
