import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { resumeDataSchema } from "@/lib/validators";
import { ResumePreview } from "@/app/dashboard/resumes/[id]/preview";

export const revalidate = 60;

export default async function PublicResume({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;
    const r = await prisma.resume.findFirst({ where: { shareToken: token, isPublic: true } });
    if (!r) return notFound();
    const data = resumeDataSchema.parse(r.data);
    return (
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 shadow-xl">
                <ResumePreview data={data} template={r.template} />
            </div>
            <p className="mt-6 text-center text-xs text-slate-500">Powered by CareerPilot AI</p>
        </div>
    );
}
