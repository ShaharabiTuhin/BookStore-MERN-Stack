import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function EditBook({ id }) {
  const [form, setForm] = useState({ title: '', author: '', publishYear: '' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const run = async () => {
      const res = await axios.get(`https://book-store-mern-beige.vercel.app/books/${id}`)
      setForm({ title: res.data.title || '', author: res.data.author || '', publishYear: res.data.publishYear || '' })
    }
    run()
  }, [id])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await axios.put(`https://book-store-mern-beige.vercel.app/books/${id}`, form)
      setMsg('Book updated successfully')
    } catch (err) {
      setMsg(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      {msg && <div className="mb-3 text-indigo-700">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" name="title" value={form.title} onChange={onChange} placeholder="Title" required />
        <input className="w-full border rounded px-3 py-2" name="author" value={form.author} onChange={onChange} placeholder="Author" required />
        <input className="w-full border rounded px-3 py-2" name="publishYear" value={form.publishYear} onChange={onChange} placeholder="Publish Year" required />
        <button className="px-4 py-2 rounded bg-indigo-600 text-white">Save</button>
        <a href="/" className="ml-2 text-slate-600">Back</a>
      </form>
    </div>
  )
}
