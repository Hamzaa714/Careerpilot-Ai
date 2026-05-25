import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/login");

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-background">
            <Sidebar isAdmin={session.user.role === "ADMIN"} />
            <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-white/80 dark:bg-card/60 px-4 backdrop-blur-xl md:px-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Badge variant={session.user.plan === "PREMIUM" ? "gradient" : "outline"}>
                            {session.user.plan === "PREMIUM" ? "Premium" : "Free Plan"}
                        </Badge>
                        <span className="text-sm text-muted-foreground hidden sm:block">Welcome back, {session.user.name?.split(" ")[0] || "there"} 👋</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white shadow-md">
                            {(session.user.name || session.user.email || "U")[0].toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </div>
    );
}
