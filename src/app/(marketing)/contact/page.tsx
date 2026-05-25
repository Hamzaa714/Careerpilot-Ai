import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = { title: "Contact" };

export default function ContactPage() {
    return (
        <div className="py-16">
            <div className="text-center">
                <Badge variant="outline">Contact</Badge>
                <h1 className="mt-3 text-5xl font-bold tracking-tight">Let’s talk</h1>
                <p className="mt-3 text-muted-foreground">Questions about CareerPilot AI? We’re here to help.</p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
                <Card className="p-6"><Mail className="h-5 w-5 text-fuchsia-500" /><div className="mt-2 font-semibold">Email</div><div className="text-sm text-muted-foreground">hello@careerpilot.pk</div></Card>
                <Card className="p-6"><Phone className="h-5 w-5 text-fuchsia-500" /><div className="mt-2 font-semibold">Phone</div><div className="text-sm text-muted-foreground">+92 300 0000000</div></Card>
                <Card className="p-6"><MapPin className="h-5 w-5 text-fuchsia-500" /><div className="mt-2 font-semibold">Office</div><div className="text-sm text-muted-foreground">Karachi, Pakistan</div></Card>
            </div>

            <Card className="mx-auto mt-8 max-w-3xl p-8">
                <form className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1"><Label>Name</Label><Input placeholder="Your full name" /></div>
                        <div className="space-y-1"><Label>Email</Label><Input type="email" placeholder="you@example.com" /></div>
                    </div>
                    <div className="space-y-1"><Label>Subject</Label><Input placeholder="How can we help?" /></div>
                    <div className="space-y-1"><Label>Message</Label><Textarea rows={6} placeholder="Tell us more..." /></div>
                    <Button variant="gradient" className="w-full sm:w-auto">Send message</Button>
                </form>
            </Card>
        </div>
    );
}
