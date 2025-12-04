# BookStore MERN Stack - Deployment Guide

## Frontend (Vercel)

### Step 1: Deploy Frontend
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" and select this repository
3. Select the `frontend` folder as root directory
4. Click "Deploy"
5. Copy your frontend URL (e.g., `https://bookstore-frontend.vercel.app`)

### Step 2: Update Backend API URL
Once frontend is deployed, update the API calls:
- In `frontend/src/pages/Home.jsx`
- In `frontend/src/pages/CreateBook.jsx`
- In other pages
- Replace `http://localhost:5555` with your deployed backend URL

## Backend (Vercel + MongoDB)

### Step 1: Deploy Backend
1. Create a new Vercel project for the Backend folder
2. Set environment variables in Vercel dashboard:
   - `mongoDBURL`: Your MongoDB Atlas connection string
   - `PORT`: 5555 (or leave empty for auto)

### Step 2: Get MongoDB Atlas URL
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create/login to your cluster
3. Click "Connect" → "Drivers" → Copy connection string
4. Replace `<username>`, `<password>`, and `<cluster>` with your credentials
5. Add this to Vercel as `mongoDBURL` environment variable

### Step 3: Update CORS in Backend
Update `Backend/index.js` to allow your frontend URL:
```javascript
const corsOptions = {
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));
```

### Step 4: Update Frontend API URL
Replace all `http://localhost:5555` with your deployed backend URL in frontend code.

## Quick Deploy Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Vercel
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set in Vercel
- [ ] CORS updated in Backend
- [ ] API URLs updated in Frontend
- [ ] Test all CRUD operations

## Local Testing Before Deploy

```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend (ensure MongoDB is running)
cd Backend
npm start
```

Visit `http://localhost:4173` to test the built frontend.
