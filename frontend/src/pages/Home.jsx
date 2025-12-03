import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BooksTable from '../components/home/BooksTable.jsx'
import BooksCard from '../home/BooksCard.jsx'
import Spinner from '../components/Spinner.jsx'
import { MdOutlineAddBox } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showType, setShowType] = useState('table')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5555/books')
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Books List</h1>
          <Link to="/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <button
            className={'bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' + (showType === 'table' ? ' bg-sky-600' : '')}
            onClick={() => setShowType('table')}
          >
            Table
          </button>
          <button
            className={'bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' + (showType === 'card' ? ' bg-sky-600' : '')}
            onClick={() => setShowType('card')}
          >
            Card
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
