# Deployment Guide for BioCareer Connect

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- (Optional) Database: Supabase, Neon, or Vercel Postgres

## Step 1: Initialize Git Repository

If Git isn't already initialized:

```bash
# Navigate to project directory
cd "E:\- My stuff\Projects\WebDesign\Job Finder"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: BioCareer Connect platform"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `biocareer-connect`)
3. **Don't** initialize with README (we already have one)
4. Copy the repository URL

## Step 3: Push to GitHub

```bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/biocareer-connect.git

# Rename default branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: If you encounter authentication issues:
- Use GitHub CLI: `gh auth login`
- Or use SSH instead of HTTPS
- Or use a Personal Access Token

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? biocareer-connect
# - Directory? ./
# - Override settings? No
```

## Step 5: Environment Variables (Required for Live Jobs)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the Adzuna keys:
   - `ADZUNA_APP_ID`
   - `ADZUNA_APP_KEY`
   - (Optional) `ADZUNA_COUNTRY` (default `gb`)
3. Redeploy after adding variables

## Step 6: Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

## Post-Deployment Checklist

- [ ] Verify site loads at `https://your-project.vercel.app`
- [ ] Test API routes (`/api/opportunities`, `/api/profile`)
- [ ] Check that filters work correctly
- [ ] Test on mobile devices

## Continuous Deployment

Vercel automatically deploys on every push to `main` branch.

To deploy a preview:
```bash
git checkout -b feature/my-feature
git push origin feature/my-feature
# Vercel creates a preview URL automatically
```

## Troubleshooting

### Build Fails

- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (18+) in Vercel settings

### API Routes Not Working

- Ensure routes are in `src/app/api/` directory
- Check that routes export `GET`, `POST`, etc. functions
- Review server logs in Vercel Dashboard

### Environment Variables Missing

- Add them in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding

## Next Steps: Database Integration

Once deployed, consider adding:

1. **Supabase** (Recommended for quick start)
   - Free PostgreSQL database
   - Easy to set up
   - Good Next.js integration

2. **Prisma ORM**
   - Type-safe database access
   - Easy migrations
   - Works with any PostgreSQL provider

See [DATABASE.md](./DATABASE.md) for database setup instructions (when ready).



