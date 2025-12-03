import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export default function CreateBook() {
  const [form, setForm] = useState({ title: '', author: '', publishYear: '' })
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:5555/books', form)
      enqueueSnackbar('📚 Book created successfully!', { variant: 'success' })
      setForm({ title: '', author: '', publishYear: '' })
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || '❌ Failed to create book', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-2xl mx-auto p-8">
        <BackButton />
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 mt-6">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">✨ Create New Book</h2>
          {loading && <Spinner />}
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-2">📚 Title</label>
              <input className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all" name="title" value={form.title} onChange={onChange} placeholder="Enter book title" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-2">✍️ Author</label>
              <input className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all" name="author" value={form.author} onChange={onChange} placeholder="Enter author name" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-2">📅 Publish Year</label>
              <input className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all" name="publishYear" type="number" value={form.publishYear} onChange={onChange} placeholder="Enter publish year" required />
            </div>
            <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105" disabled={loading}>💾 Save Book</button>
          </form>
        </div>
      </div>
    </div>
  )
}
