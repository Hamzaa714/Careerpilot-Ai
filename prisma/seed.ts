import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const adminPass = await bcrypt.hash("Admin@12345", 10);
    await prisma.user.upsert({
        where: { email: "admin@careerpilot.pk" },
        update: {},
        create: {
            email: "admin@careerpilot.pk",
            name: "CareerPilot Admin",
            password: adminPass,
            role: "ADMIN",
            plan: "PREMIUM",
            aiCreditsLimit: 100000,
        },
    });

    const jobs = [
        { title: "Frontend Engineer", company: "Systems Limited", location: "Karachi, PK", type: "Full-time", description: "React/Next.js engineer for fintech products.", skills: ["React", "Next.js", "TypeScript", "Tailwind"], salaryMin: 150000, salaryMax: 300000 },
        { title: "Backend Developer (Node.js)", company: "Bazaar Technologies", location: "Lahore, PK", type: "Full-time", description: "Build scalable APIs for B2B marketplace.", skills: ["Node.js", "PostgreSQL", "AWS"], salaryMin: 200000, salaryMax: 400000 },
        { title: "Government Job - Assistant Director (IT)", company: "FPSC", location: "Islamabad, PK", type: "Government", description: "BPS-17 IT role under Federal Public Service Commission.", skills: ["Networking", "Databases"], salaryMin: 90000, salaryMax: 140000 },
        { title: "Remote Full-Stack Engineer", company: "Toptal", location: "Remote", type: "Remote", description: "Freelance remote opportunities for top Pakistani engineers.", skills: ["React", "Node.js", "PostgreSQL"], salaryMin: 400000, salaryMax: 900000 },
        { title: "Data Analyst Intern", company: "Careem", location: "Karachi, PK", type: "Internship", description: "Analytics internship for fresh graduates.", skills: ["SQL", "Excel", "Python"], salaryMin: 40000, salaryMax: 60000 },
    ];
    for (const j of jobs) {
        await prisma.job.create({ data: j });
    }
    console.log("Seed complete.");
}

main().finally(() => prisma.$disconnect());
