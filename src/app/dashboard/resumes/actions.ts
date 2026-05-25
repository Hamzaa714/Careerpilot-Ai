"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resumeDataSchema, type ResumeData } from "@/lib/validators";
import { calcAtsScore, slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";

const empty: ResumeData = {
    personal: { fullName: "", email: "" },
    summary: "",
    experience: [], education: [], skills: [], certifications: [], projects: [], languages: [], references: [],
    style: { accentColor: "#6366f1", fontFamily: "inter", layout: "classic" },
};

export async function createResume(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    const title = String(formData.get("title") || "Untitled Resume");
    const template = String(formData.get("template") || "MODERN") as any;

    if (session.user.plan === "FREE") {
        const count = await prisma.resume.count({ where: { userId: session.user.id } });
        if (count >= 3) throw new Error("Free plan allows up to 3 resumes. Upgrade to Premium for unlimited.");
    }

    const r = await prisma.resume.create({
        data: {
            userId: session.user.id,
            title,
            template,
            slug: slugify(title) + "-" + randomBytes(3).toString("hex"),
            data: empty as any,
            atsScore: 0,
        },
    });
    revalidatePath("/dashboard/resumes");
    redirect(`/dashboard/resumes/${r.id}`);
}

export async function saveResume(id: string, data: ResumeData, title?: string, template?: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    const parsed = resumeDataSchema.parse(data);
    const score = calcAtsScore(parsed);
    await prisma.resume.update({
        where: { id, userId: session.user.id } as any,
        data: { data: parsed as any, atsScore: score, ...(title ? { title } : {}), ...(template ? { template: template as any } : {}) },
    });
    revalidatePath(`/dashboard/resumes/${id}`);
    return { ok: true, atsScore: score };
}

export async function updateResumeTemplate(id: string, template: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    await prisma.resume.update({ where: { id, userId: session.user.id } as any, data: { template: template as any } });
    revalidatePath(`/dashboard/resumes/${id}`);
}

export async function deleteResume(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    await prisma.resume.delete({ where: { id, userId: session.user.id } as any });
    revalidatePath("/dashboard/resumes");
}

export async function duplicateResume(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    const src = await prisma.resume.findFirst({ where: { id, userId: session.user.id } });
    if (!src) throw new Error("Not found");
    await prisma.resume.create({
        data: {
            userId: session.user.id,
            title: src.title + " (Copy)",
            template: src.template,
            slug: slugify(src.title) + "-" + randomBytes(3).toString("hex"),
            data: src.data as any,
            atsScore: src.atsScore,
        },
    });
    revalidatePath("/dashboard/resumes");
}

export async function toggleShare(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    const r = await prisma.resume.findFirst({ where: { id, userId: session.user.id } });
    if (!r) throw new Error("Not found");
    const updated = await prisma.resume.update({
        where: { id },
        data: { isPublic: !r.isPublic, shareToken: r.shareToken ?? randomBytes(8).toString("hex") },
    });
    revalidatePath(`/dashboard/resumes/${id}`);
    return updated;
}
