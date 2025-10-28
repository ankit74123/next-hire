# Job Portal Frontend - Deployment Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser
- Backend API server (optional for full functionality)

## Environment Setup

1. **Copy environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure environment variables:**
   Edit `.env.local` and set appropriate values:
   - `VITE_API_URL`: Your backend API URL
   - `VITE_APP_URL`: Your frontend URL
   - Add any third-party service keys

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:5173
```

## Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: Traditional Web Server (Apache/Nginx)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Copy `dist/` folder to web server**

3. **Configure server for SPA routing:**

   **Nginx configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

   **Apache configuration (.htaccess):**
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

### Option 4: Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run:**
   ```bash
   docker build -t job-portal-frontend .
   docker run -p 80:80 job-portal-frontend
   ```

## Performance Optimization

The app already includes:

✅ **Code Splitting** - Routes are lazy-loaded with React.lazy()
✅ **Tree Shaking** - Vite automatically removes unused code
✅ **Asset Optimization** - Images and assets are optimized during build
✅ **Error Boundaries** - Global error handling with ErrorBoundary component

### Additional Optimizations:

1. **Enable CDN for static assets**
2. **Configure caching headers:**
   ```nginx
   location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Enable HTTP/2 and Brotli compression**

## Monitoring & Analytics

### Error Tracking (Sentry - Optional)

1. **Install Sentry:**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **Configure in main.jsx:**
   ```javascript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.MODE,
     tracesSampleRate: 1.0,
   });
   ```

### Analytics (Google Analytics - Optional)

1. **Install:**
   ```bash
   npm install react-ga4
   ```

2. **Initialize in App.jsx:**
   ```javascript
   import ReactGA from 'react-ga4';
   ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
   ```

## Security Considerations

1. **Never commit `.env.local` or `.env.production`**
2. **Use HTTPS in production**
3. **Configure CORS properly on backend**
4. **Implement rate limiting on API endpoints**
5. **Keep dependencies updated:**
   ```bash
   npm audit
   npm update
   ```

## Testing Before Deployment

```bash
# Run ESLint
npm run lint

# Build and preview
npm run build && npm run preview

# Test in different browsers:
# - Chrome
# - Firefox
# - Safari
# - Edge

# Test responsive design:
# - Mobile (375px, 414px)
# - Tablet (768px, 1024px)
# - Desktop (1280px, 1920px)
```

## Post-Deployment Checklist

- [ ] All routes are accessible
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Navigation works smoothly
- [ ] Responsive design works on all devices
- [ ] Error boundaries catch errors gracefully
- [ ] Loading states display correctly
- [ ] Environment variables are set
- [ ] SSL certificate is configured
- [ ] Domain DNS is configured
- [ ] Analytics tracking works
- [ ] Error tracking is functional

## Rollback Strategy

If issues occur after deployment:

1. **Vercel/Netlify:** Use platform's rollback feature
2. **Traditional server:** Keep previous `dist/` folder as backup
3. **Docker:** Tag images with versions, rollback to previous tag

## Maintenance

### Regular Updates:

```bash
# Update dependencies monthly
npm update

# Check for security vulnerabilities
npm audit

# Update major versions carefully
npm outdated
```

### Backup Strategy:

- Backup database regularly (if using backend)
- Keep git repository up to date
- Store environment variables securely
- Document any custom configurations

## Support & Troubleshooting

### Common Issues:

1. **Blank page after deployment:**
   - Check browser console for errors
   - Verify base URL in Vite config
   - Ensure SPA routing is configured

2. **API calls failing:**
   - Verify VITE_API_URL is correct
   - Check CORS configuration
   - Ensure backend is accessible

3. **Routes not working:**
   - Configure server for SPA routing
   - Check .htaccess or nginx config

4. **Build fails:**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Review build logs for errors

## Contact

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Last Updated:** January 2025
**Version:** 1.0.0
