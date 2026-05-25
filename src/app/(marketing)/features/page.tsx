import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Features" };

const groups = [
    { title: "Resume Builder", items: ["Drag-and-drop sections", "Live preview", "Multiple templates", "ATS scoring", "Section duplication"] },
    { title: "AI Toolkit", items: ["AI summary generator", "Bullet point enhancer", "Cover letter writer", "LinkedIn optimizer", "Interview Q&A"] },
    { title: "Career Tools", items: ["Pakistan job board", "Save & track applications", "Export history", "Public share links", "Resume analytics"] },
    { title: "Pro Features", items: ["Unlimited resumes", "Premium templates", "Government templates", "Priority support", "Custom domains (coming soon)"] },
];

export default function FeaturesPage() {
    return (
        <div className="py-16">
            <div className="text-center">
                <Badge variant="outline">Features</Badge>
                <h1 className="mt-3 text-5xl font-bold tracking-tight">Built for Pakistani careers</h1>
                <p className="mt-3 text-muted-foreground">Every tool you need from first job to leadership.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
                {groups.map((g) => (
                    <Card key={g.title} className="p-8">
                        <h2 className="text-xl font-bold text-gradient">{g.title}</h2>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            {g.items.map((i) => <li key={i}>• {i}</li>)}
                        </ul>
                    </Card>
                ))}
            </div>
        </div>
    );
}
