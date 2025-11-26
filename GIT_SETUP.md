# Git Repository Setup Guide

## Quick Start

Since Git isn't currently in your PATH, here are the steps to set everything up:

## Option 1: Using Cursor's Git Integration

1. **Open Source Control panel** in Cursor (Ctrl+Shift+G)
2. **Click "Initialize Repository"** if not already done
3. **Stage all files** (click + next to "Changes")
4. **Commit** with message: "Initial commit: BioCareer Connect platform"
5. **Push to GitHub**:
   - Click "..." menu → "Publish Branch"
   - Choose "GitHub"
   - Create new repository or link existing one

## Option 2: Manual Git Setup

### Find Git Installation

Git is likely installed but not in PATH. Common locations:

- `C:\Program Files\Git\cmd\git.exe`
- `C:\Program Files (x86)\Git\cmd\git.exe`
- `C:\Users\YOUR_USERNAME\AppData\Local\Programs\Git\cmd\git.exe`

### Add Git to PATH (Windows)

1. Search "Environment Variables" in Windows
2. Edit "Path" variable
3. Add Git's `cmd` folder path
4. Restart terminal/Cursor

### Then Run Commands

```bash
cd "E:\- My stuff\Projects\WebDesign\Job Finder"

# Initialize (if needed)
git init

# Configure (first time only)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Stage all files
git add .

# Commit
git commit -m "Initial commit: BioCareer Connect platform"

# Add remote (after creating GitHub repo)
git remote add origin https://github.com/YOUR_USERNAME/biocareer-connect.git

# Push
git branch -M main
git push -u origin main
```

## Option 3: Use GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in
3. File → Add Local Repository
4. Select your project folder
5. Publish to GitHub

## Verify Setup

After pushing, you should see:
- ✅ Files on GitHub
- ✅ README.md displays
- ✅ Project structure visible

Then proceed to [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment.



