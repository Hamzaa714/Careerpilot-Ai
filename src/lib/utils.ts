import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(d: Date | string) {
    return new Date(d).toLocaleDateString("en-PK", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatPKR(amount: number) {
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);
}

export function slugify(s: string) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60);
}

export function calcAtsScore(data: Record<string, unknown>): number {
    let score = 0;
    const d = data as Record<string, any>;
    if (d.personal?.fullName) score += 10;
    if (d.personal?.email) score += 5;
    if (d.personal?.phone) score += 5;
    if (d.summary && String(d.summary).length > 60) score += 15;
    if (Array.isArray(d.experience) && d.experience.length > 0) score += 20;
    if (Array.isArray(d.education) && d.education.length > 0) score += 15;
    if (Array.isArray(d.skills) && d.skills.length >= 5) score += 15;
    if (Array.isArray(d.projects) && d.projects.length > 0) score += 10;
    if (Array.isArray(d.certifications) && d.certifications.length > 0) score += 5;
    return Math.min(100, score);
}
