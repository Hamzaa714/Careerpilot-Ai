import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { resumeDataSchema } from "@/lib/validators";
import { ResumeEditor } from "./editor";

export default async function ResumePage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;
    const r = await prisma.resume.findFirst({ where: { id, userId: session!.user.id } });
    if (!r) return notFound();
    const data = resumeDataSchema.parse(r.data || {
        personal: { fullName: "", email: session!.user.email || "" },
        summary: "", experience: [], education: [], skills: [], certifications: [], projects: [], languages: [], references: [],
    });
    return <ResumeEditor id={r.id} title={r.title} template={r.template} initial={data} initialScore={r.atsScore} />;
}
