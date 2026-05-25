# CareerPilot AI 🚀

**Pakistan’s #1 AI Resume & Career Platform** — a production-grade Next.js 15 SaaS featuring AI resume building, cover letters, LinkedIn optimization, interview prep, ATS analysis, a job board, Stripe billing, and an admin panel.

## ✨ Features

| Module | What it does |
|---|---|
| 🧑‍💻 Auth | NextAuth (Credentials + Google) with JWT sessions, protected middleware |
| 📄 Resume Builder | Multi-section editor with **live preview**, ATS scoring, 5 templates |
| 🤖 AI Toolkit | Summary, bullet enhancement, cover letter, LinkedIn, interview Q&A, ATS analyzer |
| 💼 Job Board | Pakistani jobs with search, save & application tracking |
| 💳 Billing | Stripe subscriptions (PKR pricing) + JazzCash/Easypaisa placeholders |
| 📑 PDF Export | Server-rendered, ATS-friendly PDFs via `@react-pdf/renderer` |
| 🛡️ Admin Panel | Users, jobs, analytics, subscriptions |
| 🎨 UI/UX | Glassmorphism, gradient brand, dark/light, Framer Motion animations, fully responsive |

## 🧱 Stack
- **Next.js 15 App Router** + **React 19** + **TypeScript**
- **Tailwind CSS** + custom shadcn-style primitives + **Framer Motion**
- **Prisma ORM** + **PostgreSQL**
- **Auth.js (NextAuth v5)** + **bcryptjs**
- **OpenAI** (`gpt-4o-mini`)
- **Stripe** subscriptions + webhooks
- **Zod** validation everywhere

## 🚀 Quick start

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env
# fill DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENAI_API_KEY...

# 3. Setup database
npm run db:push
npm run db:seed     # creates admin@careerpilot.pk / Admin@12345 + sample jobs

# 4. Run
npm run dev
```

Open http://localhost:3000

## 🔐 Default admin
- Email: `admin@careerpilot.pk`
- Password: `Admin@12345`

## 📁 Folder structure

```
src/
├── app/
│   ├── (marketing)/          # public pages (landing, pricing, jobs, etc.)
│   ├── (auth)/               # login / register / forgot
│   ├── dashboard/            # user dashboard + resume builder + AI tools
│   ├── admin/                # admin panel
│   ├── api/                  # auth, AI, stripe, PDF, register endpoints
│   └── r/[token]/            # public share links
├── components/
│   ├── ui/                   # button, card, input, badge, progress…
│   ├── marketing/            # header, footer
│   └── dashboard/            # sidebar
├── lib/                      # prisma, auth, openai, stripe, validators, utils, pdf
└── middleware.ts             # auth-protected routes
prisma/
├── schema.prisma             # all DB models
└── seed.ts
```

## 🧠 AI endpoints
- `POST /api/ai/summary` — generate resume summary
- `POST /api/ai/bullets` — enhance experience bullets
- `POST /api/ai/skills` — suggest skills
- `POST /api/ai/cover-letter` — generate job-specific letter
- `POST /api/ai/linkedin` — headline / about / skills
- `POST /api/ai/interview` — mock interview questions + answers
- `POST /api/ai/ats` — score resume vs JD

All AI calls go through `requireUserAndCredit()` for plan + quota enforcement.

## 💳 Stripe setup
1. Create a recurring price in Stripe → put its id in `STRIPE_PRICE_PREMIUM`.
2. Configure webhook → `https://yourdomain/api/stripe/webhook` (events: `checkout.session.completed`, `customer.subscription.deleted`).
3. Set `STRIPE_WEBHOOK_SECRET`.

## 🌍 Deploy to Vercel
1. Push to GitHub.
2. Import in Vercel → set the env vars from `.env.example`.
3. Add a managed PostgreSQL (Neon / Vercel Postgres / Supabase).
4. Run `npx prisma migrate deploy` (or `db push` on first deploy).

## 🛡️ Security
- Bcrypt hashing, JWT sessions, route-protecting middleware
- Zod validation on every API entrypoint
- Rate limiting on auth endpoints (`src/lib/rate-limit.ts`)
- No raw HTML rendered from user input
- Stripe webhook signature verification

## 📜 License
MIT — built with 💚 in Pakistan.
