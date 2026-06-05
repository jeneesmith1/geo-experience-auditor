# GEO Experience Auditor

This site can help you audit your product or site to see how accessible it is for AI agents to understand navigate. It makes use of the llms.txt standard, first popularized by Jeremy Howard from Answer.AI.

<img width="1064" height="777" alt="Screenshot 2026-06-04 at 10 34 53 PM" src="https://github.com/user-attachments/assets/1635f7e7-df38-49a4-a58f-d82faa0c3e94" />


## Features

- **Agent Readiness Audit** — Get a short assessment with recommendations to improve your agent experience.
- **llms.txt Generator** — Create an `llms.txt` based on your site. 

## Prerequisites
- You will need an `ANTHROPIC_API_KEY` for this. Get one at: [https://platform.claude.com/settings/keys](https://platform.claude.com/settings/keys)

### Run it
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Anthropic SDK](https://www.npmjs.com/package/@anthropic-ai/sdk) — Claude API client
- [Tailwind CSS](https://tailwindcss.com/) — Styling
