# Quick Git Commands Reference

## Set Your Git Identity (Run These First)

```powershell
git config user.name "Josh Osborne"
git config user.email "joshandrewosborne@gmail.com"
```

## Complete Your Git Setup

You've already done:
- ✅ Created remote: `git remote add origin https://github.com/JoshOsborne1/biocareer-connect.git`
- ✅ Renamed branch to main: `git branch -M main`

## Next Steps

### 1. Check Status
```powershell
git status
```

### 2. Stage All Files
```powershell
git add .
```

### 3. Create Initial Commit
```powershell
git commit -m "Initial commit: BioCareer Connect platform with full UI and API"
```

### 4. Push to GitHub
```powershell
git push -u origin main
```

**Note**: If you get authentication errors:
- Use GitHub Personal Access Token (Settings → Developer settings → Personal access tokens)
- Or use GitHub CLI: `gh auth login`

## Verify Everything Worked

1. Go to: https://github.com/JoshOsborne1/biocareer-connect
2. You should see all your files
3. Then proceed to DEPLOYMENT.md for Vercel setup
