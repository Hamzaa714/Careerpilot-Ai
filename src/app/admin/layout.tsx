import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");
    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-30 border-b bg-card/60 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <Link href="/admin" className="font-bold text-gradient">CareerPilot · Admin</Link>
                    <nav className="flex gap-4 text-sm">
                        <Link href="/admin">Overview</Link>
                        <Link href="/admin/users">Users</Link>
                        <Link href="/admin/jobs">Jobs</Link>
                        <Link href="/dashboard" className="text-muted-foreground">Back to app</Link>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-7xl p-6">{children}</main>
        </div>
    );
}
