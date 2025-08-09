# Fix Vercel Build Issues Script
Write-Host "🔧 Fixing potential Vercel build issues..." -ForegroundColor Green

# Clean and reinstall dependencies
Write-Host "📦 Cleaning node_modules and package-lock.json..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Fresh install
Write-Host "📥 Fresh npm install..." -ForegroundColor Yellow
npm install

# Test build locally
Write-Host "🏗️  Testing build locally..." -ForegroundColor Yellow
npm run build

# Check git status
Write-Host "📋 Git status:" -ForegroundColor Yellow
git status

Write-Host "✅ Local build test complete! If it passed, commit and push to trigger new Vercel deployment." -ForegroundColor Green
