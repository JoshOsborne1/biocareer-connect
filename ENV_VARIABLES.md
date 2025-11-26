# Environment Variables Guide

## Current Status

Live job search is powered by the Adzuna API. Set these variables locally and in Vercel:

```
ADZUNA_APP_ID=your_app_id
ADZUNA_APP_KEY=your_app_key
ADZUNA_COUNTRY=gb
```

### How to obtain Adzuna credentials
1. Create an account at https://developer.adzuna.com/signup  
2. Add a new application  
3. Copy the `app_id` and `app_key` into `.env.local`  
4. (Optional) change `ADZUNA_COUNTRY` to `us`, `au`, etc.

> Without these keys the API falls back to static mock data.

## Optional Variables for Future Features

### Database (Persistence)

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

Recommended providers:
- Supabase (free tier, Postgres + auth)
- Neon (serverless Postgres)
- Vercel Postgres (native integration)

### AI Assist (Cover letters, insights)

```
GEMINI_API_KEY=your_google_ai_studio_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Adding Variables in Vercel

1. Vercel Dashboard → Your Project  
2. Settings → Environment Variables  
3. Add each variable (`ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, etc.)  
4. Redeploy

## Local Development

Create `.env.local` (never commit this):

```
ADZUNA_APP_ID=...
ADZUNA_APP_KEY=...
ADZUNA_COUNTRY=gb
```

Add to `.gitignore` (already configured):

```
.env*
```

