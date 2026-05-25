import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="grid min-h-screen place-items-center bg-hero-gradient">
            <div className="text-center">
                <div className="text-8xl font-extrabold text-gradient">404</div>
                <h1 className="mt-3 text-2xl font-bold">Page not found</h1>
                <p className="mt-1 text-muted-foreground">The page you’re looking for doesn’t exist.</p>
                <Button asChild variant="gradient" className="mt-6"><Link href="/">Back home</Link></Button>
            </div>
        </div>
    );
}
