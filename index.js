import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';
import { Book } from './models/bookModel.js';
import cors from 'cors';

// Initialize express app first!
const app = express();

// Parse JSON body
app.use(express.json());

// Middleware for handling CORS POLICY
// For development allow all origins so frontend can call the API.
// Change this to a more restrictive policy in production.
app.use(cors());

// Health check endpoint
app.get('/', (request, response) => {
  response.status(200).json({ message: 'BookStore API is running', status: 'ok' });
});

// Use books routes
app.use('/books', booksRoute);

// Start server after DB connection
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    const connection = await mongoose.connect(mongoDBURL);
    cachedDb = connection;
    console.log('App connected to database');
    return connection;
  } catch (error) {
    console.log('DB connection error:', error);
    throw error;
  }
};

connectDB();

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);  });
}

// Export for Vercel serverless
export default app;
