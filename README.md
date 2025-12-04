# BookStore MERN Stack

A full-stack book management application with modern UI design.

## 🚀 Features

- ✨ Beautiful gradient UI with glassmorphism effects
- 📚 CRUD operations for books (Create, Read, Update, Delete)
- 🎴 Toggle between Table and Card views
- 🔔 Real-time notifications with Notistack
- 📱 Fully responsive design
- 🎨 Modern color scheme with purple/pink/indigo gradients

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Notistack
- React Icons
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- CORS

## 📦 Installation

### Backend Setup
```bash
cd Backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

### Deploy Backend to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from root directory:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - `MONGODB_URL`: Your MongoDB connection string

### Deploy Frontend to Vercel

1. Update API URL in frontend code to your deployed backend URL
2. Build frontend:
```bash
cd frontend
npm run build
```
3. Deploy:
```bash
vercel --prod
```

## 🔧 Environment Variables

Create `.env` file in Backend directory:
```
PORT=5555
MONGODB_URL=your_mongodb_connection_string
```

## 📝 License

MIT

## 👤 Author

ShaharabiTuhin
