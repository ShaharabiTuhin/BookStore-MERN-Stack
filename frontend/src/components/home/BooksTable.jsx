import React from 'react'
import { Link } from 'react-router-dom'

export default function BooksTable({ books }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/70 backdrop-blur-md border border-white/20">
      <table className="min-w-full divide-y divide-purple-100">
        <thead className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">#</th>
            <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">📚 Title</th>
            <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">✍️ Author</th>
            <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">📅 Year</th>
            <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">💰 Price</th>
            <th className="px-6 py-4 text-left text-sm font-bold tracking-wide">⚡ Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-50">
          {books.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-purple-400 font-semibold">📚 No books found - Create your first book!</td>
            </tr>
          ) : (
            books.map((b, idx) => (
              <tr key={b._id || idx} className="hover:bg-purple-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-purple-600">{idx + 1}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{b.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{b.author}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{b.publishYear}</td>
                <td className="px-6 py-4 text-sm font-semibold text-purple-600">{b.price ? `$${b.price}` : '-'}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <Link to={`/books/details/${b._id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105">👁️ View</Link>
                    <Link to={`/books/edit/${b._id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all hover:scale-105">✏️ Edit</Link>
                    <Link to={`/books/delete/${b._id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105">🗑️ Delete</Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
