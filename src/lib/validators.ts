import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2).max(60),
    email: z.string().email(),
    password: z.string().min(6).max(72),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

/** Strict schema – used for form validation before submission. */
export const personalSchema = z.object({
    fullName: z.string().min(2),
    title: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().optional(),
    github: z.string().optional(),
});

/** Lenient schema – used for parsing stored/editor resume data where fields may be empty. */
export const personalStoredSchema = z.object({
    fullName: z.string().default(""),
    title: z.string().optional(),
    email: z.string().default(""),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
});

export const experienceItemSchema = z.object({
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().optional(),
    bullets: z.array(z.string()).default([]),
});

export const educationItemSchema = z.object({
    school: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    grade: z.string().optional(),
});

export const projectItemSchema = z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    tech: z.array(z.string()).default([]),
});

export const resumeDataSchema = z.object({
    personal: personalStoredSchema,
    summary: z.string().default(""),
    experience: z.array(experienceItemSchema).default([]),
    education: z.array(educationItemSchema).default([]),
    skills: z.array(z.string()).default([]),
    certifications: z.array(z.object({ name: z.string(), issuer: z.string().optional(), date: z.string().optional() })).default([]),
    projects: z.array(projectItemSchema).default([]),
    languages: z.array(z.object({ name: z.string(), level: z.string().optional() })).default([]),
    references: z.array(z.object({ name: z.string(), relation: z.string().optional(), contact: z.string().optional() })).default([]),
    style: z.object({
        accentColor: z.string().default("#6366f1"),
        fontFamily: z.enum(["inter", "georgia", "roboto", "merriweather", "playfair"]).default("inter"),
        layout: z.enum(["classic", "sidebar", "compact"]).default("classic"),
    }).default({ accentColor: "#6366f1", fontFamily: "inter", layout: "classic" }),
});

export type ResumeData = z.infer<typeof resumeDataSchema>;

export const resumeStyleSchema = z.object({
    accentColor: z.string().default("#6366f1"),
    fontFamily: z.enum(["inter", "georgia", "roboto", "merriweather", "playfair"]).default("inter"),
    layout: z.enum(["classic", "sidebar", "compact"]).default("classic"),
});

export type ResumeStyle = z.infer<typeof resumeStyleSchema>;

export const coverLetterSchema = z.object({
    jobTitle: z.string().min(2),
    company: z.string().min(1),
    jobDescription: z.string().optional(),
    tone: z.enum(["professional", "friendly", "confident", "concise"]).default("professional"),
});

export const interviewSchema = z.object({
    role: z.string().min(2),
    category: z.enum(["technical", "hr", "behavioral"]),
    count: z.number().int().min(3).max(15).default(8),
});
