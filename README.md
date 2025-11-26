# BioCareer Connect

An intelligent career platform designed to streamline job searches for students and graduates, with specialized features for biomedical science opportunities, sponsored Master's programs, and visa-supported roles.

## Features

- **Deep Search**: Multi-source opportunity aggregation with intelligent matching
- **AI-Powered Profile**: CV parsing, skill extraction, and qualification tracking
- **Smart Filtering**: Category, industry, work mode, visa sponsorship, and Master's sponsorship filters
- **Application Tracker**: Kanban-style pipeline to manage opportunities from saved to interview
- **Cover Letter Generation**: AI-assisted application drafting
- **Student-Friendly**: Filters for university students and sponsored opportunities

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **State**: React Hooks + Server Components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   │   ├── api/          # REST API endpoints
│   │   ├── dashboard/    # Opportunity feed
│   │   ├── profile/      # Profile & CV upload
│   │   └── tracker/      # Application pipeline
│   ├── components/       # React components
│   ├── data/            # Mock data (will migrate to DB)
│   └── lib/             # Utilities
├── public/              # Static assets
└── docs/               # Documentation
```

## API Routes

- `GET /api/opportunities` - Search and filter opportunities
- `GET /api/profile` - Fetch user profile data
- `GET /api/tracker` - Get application pipeline state

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy (automatic on push)

## Development Roadmap

- [ ] Database integration (Prisma + PostgreSQL)
- [ ] Web scraping engine for job aggregation
- [ ] User authentication & profiles
- [ ] Real-time notification system
- [ ] AI cover letter generation (Gemini/Claude integration)

## License

Private project - All rights reserved
