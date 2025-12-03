import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ShowBook({ id }) {
  const [book, setBook] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/books/${id}`)
        setBook(res.data)
      } catch (e) {
        setError(e.message)
      }
    }
    run()
  }, [id])

  if (error) return <div className="p-6 text-rose-600">{error}</div>
  if (!book) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-xl mx-auto p-6 space-y-2">
      <h2 className="text-2xl font-bold">Book Details</h2>
      <div><span className="font-semibold">Title:</span> {book.title}</div>
      <div><span className="font-semibold">Author:</span> {book.author}</div>
      <div><span className="font-semibold">Year:</span> {book.publishYear}</div>
      <a href="/" className="text-slate-600">Back</a>
    </div>
  )
}
