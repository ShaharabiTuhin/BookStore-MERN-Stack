import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BooksTable from '../components/home/BooksTable.jsx'
import BooksCard from '../home/BooksCard.jsx'
import Spinner from '../components/Spinner.jsx'
import { MdOutlineAddBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import API_BASE_URL from '../api'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showType, setShowType] = useState('table')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books`)
        setBooks(res.data.data || [])
      } catch (e) {
        setError(e.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div className="p-6 text-rose-600">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">Books Collection</h1>
          <Link to="/create">
            <MdOutlineAddBox className="text-purple-600 text-5xl hover:text-pink-600 transition-all hover:scale-110 drop-shadow-lg" />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <button
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              showType === 'table'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/70 backdrop-blur-md text-purple-600 hover:bg-white border border-purple-200'
            }`}
            onClick={() => setShowType('table')}
          >
            📋 Table
          </button>
          <button
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              showType === 'card'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/70 backdrop-blur-md text-purple-600 hover:bg-white border border-purple-200'
            }`}
            onClick={() => setShowType('card')}
          >
            🎴 Card
          </button>
        </div>
        {showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  )
}
