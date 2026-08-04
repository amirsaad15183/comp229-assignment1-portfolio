# Deployment Steps

## Backend on Render

1. Push the latest code to GitHub.
2. Open Render and create a new **Web Service** from your GitHub repository.
3. If Render asks for settings, use:
   - **Root Directory**: leave empty
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add these environment variables in Render:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_NAME`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
5. Deploy and copy the live backend URL.

## Frontend on Vercel

1. Open your Vercel project settings.
2. Under **Environment Variables**, add:
   - `VITE_API_URL` = your Render backend URL
3. Redeploy the Vercel site.

## After Deployment

1. Open the Vercel site.
2. Test sign in.
3. Test project, education, and contact CRUD from the live site.
4. Take your screenshots for submission.
