import React from 'react'
import { Link } from 'react-router-dom'

export default function BooksTable({ books }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow ring-1 ring-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Author</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Year</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {books.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-slate-500">No books found</td>
            </tr>
          ) : (
            books.map((b, idx) => (
              <tr key={b._id || idx} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">{idx + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{b.title}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{b.author}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{b.publishYear}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{b.price ? `$${b.price}` : '-'}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Link to={`/books/details/${b._id}`} className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300">View</Link>
                    <Link to={`/books/edit/${b._id}`} className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">Edit</Link>
                    <Link to={`/books/delete/${b._id}`} className="px-3 py-1 rounded bg-rose-600 text-white hover:bg-rose-700">Delete</Link>
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
