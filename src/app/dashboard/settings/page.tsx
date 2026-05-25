import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

async function updateProfile(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user) return;
    await prisma.user.update({
        where: { id: session.user.id },
        data: { name: String(formData.get("name") || session.user.name || "") },
    });
    revalidatePath("/dashboard/settings");
}

export default async function SettingsPage() {
    const session = await auth();
    const user = await prisma.user.findUnique({ where: { id: session!.user.id } });
    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <Card className="p-6">
                <form action={updateProfile} className="space-y-3">
                    <div className="space-y-1"><Label>Name</Label><Input name="name" defaultValue={user?.name ?? ""} /></div>
                    <div className="space-y-1"><Label>Email</Label><Input value={user?.email ?? ""} disabled /></div>
                    <Button variant="gradient">Save changes</Button>
                </form>
            </Card>
        </div>
    );
}
