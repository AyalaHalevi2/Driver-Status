# Deployment Guide - Driver Status App

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Build for Production

```bash
npm install
npm run build
```

This creates a `dist/` folder with static files ready for deployment.

## Deployment Options

### Option 1: Render (Recommended)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign in
3. Click "New" > "Static Site"
4. Connect your GitHub repository
5. Configure build settings:
   - **Name**: `driver-status` (or your preferred name)
   - **Branch**: `main` (or your deployment branch)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Click "Create Static Site"

Your site will be live at `your-site-name.onrender.com`

**Auto-deploy:** Render automatically redeploys when you push to the connected branch.

---

### Option 2: Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel auto-detects Vite - just click "Deploy"
5. Your site will be live at `your-project.vercel.app`

**Or deploy via CLI:**
```bash
npm i -g vercel
vercel
```

### Option 3: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Or drag & drop:**
1. Run `npm run build`
2. Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

### Option 4: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://YOUR_USERNAME.github.io/Driver-Status"
   }
   ```

3. Update `vite.config.ts` with base path:
   ```typescript
   export default defineConfig({
     base: '/Driver-Status/',
     // ... rest of config
   })
   ```

4. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Option 5: Cloudflare Pages

1. Push your code to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Create a new project and connect your repository
4. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click "Save and Deploy"

### Option 6: Static Hosting (Any Server)

1. Run `npm run build`
2. Upload contents of `dist/` folder to your server
3. Configure server to serve `index.html` for all routes (SPA fallback)

**Nginx example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables

This app doesn't require environment variables. All configuration is client-side.

## Build Output

After running `npm run build`:

```
dist/
├── index.html          (~0.7 KB)
├── assets/
│   ├── index-*.css     (~30 KB, ~6 KB gzipped)
│   └── index-*.js      (~233 KB, ~73 KB gzipped)
```

## Post-Deployment Checklist

- [ ] Verify the site loads correctly
- [ ] Test dark mode toggle
- [ ] Test date inputs and status calculation
- [ ] Test info modals open/close properly
- [ ] Test WhatsApp share button
- [ ] Test notification permission request
- [ ] Verify RTL layout displays correctly
- [ ] Check mobile responsiveness

## Custom Domain

Most platforms support custom domains:

1. Add your domain in the platform's dashboard
2. Update DNS records:
   - **A Record**: Point to platform's IP
   - **CNAME**: Point `www` to platform's domain
3. Enable HTTPS (usually automatic)

## Troubleshooting

**Blank page after deploy:**
- Check browser console for errors
- Verify `base` path in `vite.config.ts` matches your deployment URL

**Assets not loading:**
- Ensure build output is correctly uploaded
- Check for CORS issues if using CDN

**Notifications not working:**
- Site must be served over HTTPS
- User must grant notification permission
