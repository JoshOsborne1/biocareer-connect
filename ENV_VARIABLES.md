# Environment Variables Guide

## Current Status

**No environment variables are required for initial deployment!**

The app currently uses mock data, so you can deploy to Vercel without any configuration.

## Future Environment Variables

When you're ready to add features, you'll need these:

### Database (Optional - for persistence)

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

**Providers to consider:**
- **Supabase**: Free tier, easy setup
- **Neon**: Free tier, serverless Postgres
- **Vercel Postgres**: Integrated with Vercel

### AI API Keys (Optional - for cover letter generation)

```
GEMINI_API_KEY=your_google_ai_studio_key
ANTHROPIC_API_KEY=your_anthropic_key
```

**Where to get them:**
- Gemini: https://aistudio.google.com/app/apikey
- Anthropic: https://console.anthropic.com/

## Adding Variables in Vercel

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add each variable
4. Redeploy

## Local Development

Create `.env.local` file (never commit this):

```
DATABASE_URL=...
GEMINI_API_KEY=...
```

Add to `.gitignore` (already done):
```
.env*
```

