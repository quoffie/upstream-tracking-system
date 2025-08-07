# Deployment Guide

This guide covers deploying the Upstream Tracking System to Vercel (frontend) and Railway (backend).

## Prerequisites

- Node.js 18+ installed locally
- Git repository set up
- Vercel account
- Railway account
- PostgreSQL database (Railway provides this)

## Backend Deployment (Railway)

### 1. Create Railway Project

1. Go to [Railway](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Select the backend folder as the root directory

### 2. Add PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will provide a `DATABASE_URL`

### 3. Configure Environment Variables

In Railway dashboard, add these environment variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=<provided-by-railway>
JWT_SECRET=<generate-secure-secret>
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

### 4. Deploy

1. Railway will automatically deploy when you push to your connected branch
2. Note your Railway app URL (e.g., `https://your-app.railway.app`)

## Frontend Deployment (Vercel)

### 1. Create Vercel Project

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set the root directory to `frontend`
4. Framework preset should auto-detect as "Next.js"

### 2. Configure Environment Variables

In Vercel dashboard, add these environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app/api
NODE_ENV=production
```

### 3. Update vercel.json

Update the `rewrites` section in `frontend/vercel.json` with your actual Railway URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-actual-railway-url.railway.app/api/:path*"
    }
  ]
}
```

### 4. Deploy

1. Vercel will automatically deploy
2. Note your Vercel app URL

## Post-Deployment Steps

### 1. Update CORS Origin

Update the `CORS_ORIGIN` environment variable in Railway with your actual Vercel URL.

### 2. Database Migration

Run database migrations on Railway:

1. Go to Railway dashboard
2. Open your backend service
3. Go to "Deploy" tab
4. Run: `npx prisma migrate deploy`
5. Run: `npm run seed` (if you have seed data)

### 3. Test the Application

1. Visit your Vercel URL
2. Test authentication flows:
   - Register at `/auth/register`
   - Login at `/auth/login`
   - Apply for permits (should require authentication)

## Environment Variables Reference

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app/api
NODE_ENV=production
```

### Backend (.env)

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secure-jwt-secret
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CORS_ORIGIN` in backend matches your Vercel URL
2. **Database Connection**: Verify `DATABASE_URL` is correct
3. **API Calls Failing**: Check `NEXT_PUBLIC_API_URL` points to Railway backend
4. **Authentication Issues**: Verify `JWT_SECRET` is set and consistent

### Logs

- **Railway**: Check logs in Railway dashboard
- **Vercel**: Check function logs in Vercel dashboard

## Security Checklist

- [ ] JWT_SECRET is secure and unique
- [ ] Database credentials are secure
- [ ] CORS is properly configured
- [ ] Environment variables are not committed to git
- [ ] HTTPS is enabled (automatic on Vercel/Railway)

## Monitoring

- Monitor application performance in Vercel/Railway dashboards
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor database performance
- Set up uptime monitoring

## Scaling

- **Vercel**: Automatically scales
- **Railway**: Configure auto-scaling in project settings
- **Database**: Monitor usage and upgrade plan if needed