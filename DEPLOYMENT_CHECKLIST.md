# Pre-Deployment Checklist

## ✅ Pre-Deployment (Before Git Push)

- [x] All code complete
- [x] `.gitignore` configured
- [x] README.md updated
- [x] No console errors
- [x] Lint passes (`npm run lint`)

## 🔧 Git Setup

- [ ] Git identity configured:
  ```powershell
  git config user.name "Josh Osborne"
  git config user.email "joshandrewosborne@gmail.com"
  ```
- [ ] Files staged: `git add .`
- [ ] Initial commit: `git commit -m "Initial commit"`
- [ ] Remote added: ✅ Already done
- [ ] Branch renamed: ✅ Already done
- [ ] Pushed to GitHub: `git push -u origin main`

## 🚀 Vercel Deployment

- [ ] GitHub repo visible at: https://github.com/JoshOsborne1/biocareer-connect
- [ ] Vercel account created (or logged in)
- [ ] Project imported in Vercel
- [ ] Build successful (check Vercel logs)
- [ ] Site live at: `https://biocareer-connect.vercel.app`

## ✅ Post-Deployment Testing

- [ ] Homepage loads
- [ ] Dashboard page works: `/dashboard`
- [ ] Profile page works: `/profile`
- [ ] Tracker page works: `/tracker`
- [ ] API routes work: `/api/opportunities`, `/api/profile`, `/api/tracker`
- [ ] Filters work on dashboard
- [ ] Search works
- [ ] Mobile responsive

## 🎯 Next Steps (After Deployment)

- [ ] Add custom domain (optional)
- [ ] Set up database (Supabase/Neon)
- [ ] Add real job scraping
- [ ] Connect AI APIs for cover letters
- [ ] Add user authentication

## 🐛 Common Issues

**Build fails?**
- Check Vercel build logs
- Ensure all dependencies in `package.json`
- Node version should be 18+

**API routes not working?**
- Check server logs in Vercel
- Verify routes are in `src/app/api/`

**404 errors?**
- Verify routes match file structure
- Check `next.config.ts` isn't overriding routes

