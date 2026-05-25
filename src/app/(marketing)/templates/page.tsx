import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const templates = [
    { name: "Modern", desc: "Sleek two-column with accent color", bg: "from-indigo-500 to-purple-700" },
    { name: "Corporate", desc: "Single column, professional", bg: "from-slate-700 to-slate-900" },
    { name: "Minimal", desc: "Typography-first, lots of whitespace", bg: "from-zinc-300 to-zinc-500" },
    { name: "Government", desc: "BPS-friendly format for FPSC/PPSC", bg: "from-emerald-600 to-emerald-900" },
    { name: "Creative", desc: "Designers, freelancers & creators", bg: "from-pink-500 to-rose-700" },
    { name: "Tech", desc: "Engineer-friendly with project focus", bg: "from-cyan-500 to-blue-700" },
];

export const metadata = { title: "Templates" };

export default function TemplatesPage() {
    return (
        <div className="py-16">
            <div className="text-center">
                <Badge variant="outline">Templates</Badge>
                <h1 className="mt-3 text-5xl font-bold tracking-tight">Pick a template, start writing</h1>
                <p className="mt-3 text-muted-foreground">All templates are ATS-friendly and fully customizable.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((t) => (
                    <Card key={t.name} className="overflow-hidden">
                        <div className={`relative h-56 bg-gradient-to-br ${t.bg}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-white">
                                <div className="text-xs uppercase opacity-80">Template</div>
                                <div className="text-xl font-bold">{t.name}</div>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-muted-foreground">{t.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
