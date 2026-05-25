import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { renderToStream } from "@react-pdf/renderer";
import { ResumePdf } from "@/lib/pdf/resume-pdf";
import { resumeDataSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const r = await prisma.resume.findFirst({ where: { id, userId: session.user.id } });
    if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = resumeDataSchema.parse(r.data);
    const stream = await renderToStream(<ResumePdf data={data} template={r.template} />);

    await prisma.resume.update({ where: { id }, data: { downloads: { increment: 1 } } });
    await prisma.exportHistory.create({ data: { resumeId: id, format: "pdf" } });

    return new NextResponse(stream as unknown as ReadableStream, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${r.title.replace(/[^a-z0-9]/gi, "_")}.pdf"`,
        },
    });
}
