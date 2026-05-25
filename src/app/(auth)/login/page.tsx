"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from") || "/dashboard";
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const res = await signIn("credentials", {
            email: fd.get("email"),
            password: fd.get("password"),
            redirect: false,
        });
        setLoading(false);
        if (res?.error) return toast.error("Invalid email or password");
        toast.success("Welcome back!");
        window.location.href = from;
    }

    return (
        <Card className="p-8">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to continue building your career.</p>

            <Button type="button" variant="outline" className="mt-6 w-full" onClick={() => signIn("google", { callbackUrl: from })}>
                Continue with Google
            </Button>
            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" />OR<div className="h-px flex-1 bg-border" /></div>

            <form onSubmit={onSubmit} className="space-y-3">
                <div className="space-y-1"><Label>Email</Label><Input name="email" type="email" required placeholder="you@example.com" /></div>
                <div className="space-y-1">
                    <div className="flex justify-between"><Label>Password</Label><Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">Forgot?</Link></div>
                    <Input name="password" type="password" required placeholder="••••••••" />
                </div>
                <Button variant="gradient" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
                New here? <Link href="/register" className="font-semibold text-gradient">Create an account</Link>
            </p>
        </Card>
    );
}
