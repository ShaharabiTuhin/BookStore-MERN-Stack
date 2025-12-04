import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import API_BASE_URL from '../api'

export default function ShowBook() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books/${id}`)
        setBook(res.data)
        enqueueSnackbar('📚 Book loaded successfully!', { variant: 'success' })
      } catch (e) {
        enqueueSnackbar('❌ Failed to load book details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id, enqueueSnackbar])

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center"><Spinner /></div>
  if (!book) return <div className="p-6 text-rose-600">❌ Book not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-2xl mx-auto p-8">
        <BackButton />
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 mt-6">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">📖 Book Details</h2>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-xl">
              <span className="font-bold text-purple-700">📚 Title:</span>
              <p className="text-lg text-gray-900 mt-1">{book.title}</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-xl">
              <span className="font-bold text-pink-700">✍️ Author:</span>
              <p className="text-lg text-gray-900 mt-1">{book.author}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl">
              <span className="font-bold text-indigo-700">📅 Publish Year:</span>
              <p className="text-lg text-gray-900 mt-1">{book.publishYear}</p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-xl">
              <span className="font-bold text-cyan-700">🆔 ID:</span>
              <p className="text-sm text-gray-600 mt-1 font-mono">{book._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
