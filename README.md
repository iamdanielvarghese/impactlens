# ImpactLens 🌱

A gamified sustainability app that turns everyday eco-friendly actions into daily quests, coin rewards, and badge milestones — powered by AI-driven impact insights.

## What it does

Log a sustainable activity in plain language (e.g. "biked to work instead of driving") and ImpactLens uses Google's Gemini to categorize it, score its environmental impact, and turn it into a tangible, easy-to-understand equivalence — then tracks your streaks, coin balance, and rank over time.

## Features

- **AI Activity Logging** — Free-text activity descriptions are parsed by Gemini into a structured category (Transport, Waste, Energy, Water, Food), an impact score, and a real-world equivalence, using JSON schema–constrained generation.
- **AI Impact Summaries** — Lifetime stats per category are turned into creative, encouraging summaries of your cumulative environmental impact.
- **Dashboard** — Visualize activity history and impact trends over time.
- **Streaks & Ranks** — Daily activity streaks and progressive eco-ranks (Seedling → Green Pioneer → Eco Warrior) based on coins earned.
- **Leaderboard** — Compare your impact and progress with others.
- **Authentication** — Sign in via GitHub, Google, or credentials, backed by Firebase/Firestore.

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **AI:** Google Generative AI SDK (Gemini 2.5 Flash) with structured JSON output
- **Auth:** NextAuth.js (GitHub, Google, Credentials providers) with a Firebase Firestore adapter
- **Database:** Firebase Admin SDK / Firestore
- **Charts:** Recharts

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── activities/         # Logs an activity, calls Gemini, updates coins/streak/rank
│   │   ├── auth/[...nextauth]/ # NextAuth route handler
│   │   └── impact-summary/     # Generates AI summaries of lifetime stats
│   ├── dashboard/              # Activity dashboard page
│   ├── impact/                 # Impact summary page
│   ├── leaderboard/            # Leaderboard page
│   ├── login/                  # Login page
│   └── page.tsx                # Landing page
├── components/
│   ├── dashboard/              # Activity feed, logger, graph
│   ├── home/                   # Hero, how-it-works, badges, daily goals
│   └── navigation/              # Top nav, profile dropdown
└── lib/
    ├── auth.ts                 # NextAuth configuration
    └── firebase-admin.ts       # Firebase Admin/Firestore setup
```

## Getting started

### Prerequisites

- Node.js 18+
- A Firebase project (Firestore enabled, with a service account)
- A Google Gemini API key
- GitHub and/or Google OAuth app credentials (for social login)

### Installation

```bash
git clone https://github.com/iamdanielvarghese/impactlens.git
cd impactlens
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
# Gemini
GEMINI_API_KEY=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# OAuth providers
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run start
```

## How it works

1. A user logs an activity through the dashboard.
2. The `/api/activities` route sends the activity text to Gemini with a strict JSON schema, returning a category, impact score, description, and tangible real-world equivalence.
3. Coins, streaks, and eco-rank are recalculated and stored in Firestore.
4. The `/api/impact-summary` route aggregates lifetime stats per category and asks Gemini to generate encouraging, tangible summaries of total impact.

## License

No license specified yet — add one (e.g. MIT) if you intend for others to reuse this code.
