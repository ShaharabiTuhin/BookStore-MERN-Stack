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


// Route to save a new book
app.post('/books', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.use('/books', booksRoute);


// Route for Get All Books from database
app.get('/books', async (request, response) => {
  try {
    const books = await Book.find({});


    return response.status(200).json({
      count: books.length,
      data: books
    });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
// Route for Get One Book from database by id
app.get('/books/:id', async (request, response) => {
  try {


    const { id } = request.params;
   
    const book = await Book.findById(id);


    return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
// Route for Update a Book
app.put('/books/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
      ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }


    const { id } = request.params;


    const result = await Book.findByIdAndUpdate(id, request.body);


    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }


    return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
// Route for Delete a book
app.delete('/books/:id', async (request, response) => {
  try {
    const { id } = request.params;


    const result = await Book.findByIdAndDelete(id);


    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }


    return response.status(200).send({ message: 'Book deleted successfully' });


  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Main route
app.get('/', (request, response) => {
  response.status(200).send('Welcome To BookStore MERN Stack Project');
});

// Start server after DB connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
