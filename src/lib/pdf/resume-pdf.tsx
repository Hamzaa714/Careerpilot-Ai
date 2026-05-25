import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/validators";

const palette = {
    MODERN: { accent: "#4f46e5" },
    CORPORATE: { accent: "#0f172a" },
    MINIMAL: { accent: "#52525b" },
    GOVERNMENT: { accent: "#065f46" },
    CREATIVE: { accent: "#db2777" },
} as Record<string, { accent: string }>;

export function ResumePdf({ data, template }: { data: ResumeData; template: string }) {
    const c = data.style?.accentColor ?? (palette[template] || palette.MODERN).accent;
    const styles = StyleSheet.create({
        page: { padding: 36, fontSize: 10.5, fontFamily: "Helvetica", color: "#0f172a" },
        name: { fontSize: 22, fontWeight: 700, color: c },
        title: { fontSize: 11, color: "#475569", marginTop: 2 },
        contact: { fontSize: 9, color: "#475569", marginTop: 4 },
        hr: { borderBottomWidth: 2, borderBottomColor: c, marginVertical: 8 },
        section: { fontSize: 11, color: c, fontWeight: 700, textTransform: "uppercase", marginTop: 10, marginBottom: 4, letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: "#e2e8f0", paddingBottom: 2 },
        row: { flexDirection: "row", justifyContent: "space-between" },
        bold: { fontWeight: 700 },
        muted: { color: "#475569" },
        bullet: { marginLeft: 10, marginTop: 1 },
        pill: { borderWidth: 1, borderColor: "#cbd5e1", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginRight: 4, marginBottom: 4, fontSize: 9 },
        pillRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
    });

    const p = data.personal;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.name}>{p.fullName || "Your Name"}</Text>
                {p.title ? <Text style={styles.title}>{p.title}</Text> : null}
                <Text style={styles.contact}>
                    {[p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean).join("  •  ")}
                </Text>
                <View style={styles.hr} />

                {data.summary ? (<><Text style={styles.section}>Summary</Text><Text>{data.summary}</Text></>) : null}

                {data.experience.length > 0 && <Text style={styles.section}>Experience</Text>}
                {data.experience.map((e, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{e.role} — {e.company}</Text>
                            <Text style={styles.muted}>{e.startDate} – {e.endDate || "Present"}</Text>
                        </View>
                        {e.location ? <Text style={styles.muted}>{e.location}</Text> : null}
                        {e.bullets.filter(Boolean).map((b, k) => <Text key={k} style={styles.bullet}>• {b}</Text>)}
                    </View>
                ))}

                {data.education.length > 0 && <Text style={styles.section}>Education</Text>}
                {data.education.map((e, i) => (
                    <View key={i} style={{ marginBottom: 4 }}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{e.school}</Text>
                            <Text style={styles.muted}>{e.startDate} – {e.endDate || "Present"}</Text>
                        </View>
                        <Text>{e.degree}{e.field ? ` in ${e.field}` : ""}{e.grade ? ` • ${e.grade}` : ""}</Text>
                    </View>
                ))}

                {data.skills.length > 0 && (
                    <>
                        <Text style={styles.section}>Skills</Text>
                        <View style={styles.pillRow}>
                            {data.skills.map((s, i) => <Text key={i} style={styles.pill}>{s}</Text>)}
                        </View>
                    </>
                )}

                {data.projects.length > 0 && <Text style={styles.section}>Projects</Text>}
                {data.projects.map((pr, i) => (
                    <View key={i} style={{ marginBottom: 4 }}>
                        <Text style={styles.bold}>{pr.name}</Text>
                        <Text>{pr.description}</Text>
                        {pr.tech.length > 0 ? <Text style={styles.muted}>Tech: {pr.tech.join(", ")}</Text> : null}
                    </View>
                ))}

                {data.certifications.length > 0 && <Text style={styles.section}>Certifications</Text>}
                {data.certifications.map((c, i) => (
                    <Text key={i}>{c.name}{c.issuer ? ` — ${c.issuer}` : ""}{c.date ? ` (${c.date})` : ""}</Text>
                ))}

                {data.languages.length > 0 && (
                    <>
                        <Text style={styles.section}>Languages</Text>
                        <Text>{data.languages.map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`).join(" • ")}</Text>
                    </>
                )}
            </Page>
        </Document>
    );
}
