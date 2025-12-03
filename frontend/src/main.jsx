import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import './index.css'
import Home from './pages/Home.jsx'
import CreateBook from './pages/CreateBook.jsx'
import ShowBook from './pages/ShowBook.jsx'
import EditBook from './pages/EditBook.jsx'
import DeleteBook from './pages/DeleteBook.jsx'
// import { useSnackbar } from 'notistack';

// const { enqueueSnackbar } = useSnackbar();
// // after successful axios.post:
// enqueueSnackbar('Book created successfully', { variant: 'success' });

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={4000}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<CreateBook/>} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
