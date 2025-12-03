import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function DeleteBook({ id }) {
  const [msg, setMsg] = useState('')
  useEffect(() => {
    const run = async () => {
      try {
        await axios.delete(`http://localhost:5555/books/${id}`)
        setMsg('Book deleted successfully')
      } catch (e) {
        setMsg(e.response?.data?.message || e.message)
      }
    }
    run()
  }, [id])

  return (
    <div className="max-w-xl mx-auto p-6 space-y-2">
      <h2 className="text-2xl font-bold">Delete Book</h2>
      <div>{msg || 'Deleting...'}</div>
      <a href="/" className="text-slate-600">Back</a>
    </div>
  )
}
