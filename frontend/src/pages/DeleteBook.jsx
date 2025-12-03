import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export default function DeleteBook() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleDelete = async () => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:5555/books/${id}`)
      enqueueSnackbar('🗑️ Book deleted successfully!', { variant: 'success' })
      setTimeout(() => navigate('/'), 1500)
    } catch (e) {
      enqueueSnackbar(e.response?.data?.message || '❌ Failed to delete book', { variant: 'error' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-2xl mx-auto p-8">
        <BackButton />
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 mt-6">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">🗑️ Delete Book</h2>
          {loading ? (
            <Spinner />
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-rose-50 rounded-xl border-2 border-rose-200">
                <p className="text-lg text-gray-900 font-semibold mb-2">⚠️ Are you sure you want to delete this book?</p>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-rose-500/50 transition-all hover:scale-105"
                >
                  ✅ Yes, Delete
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold shadow-lg hover:shadow-gray-500/50 transition-all hover:scale-105"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
