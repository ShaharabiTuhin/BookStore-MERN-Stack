import React from 'react'

export default function BackButton() {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }
  return (
    <button onClick={goBack} className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300">
      Back
    </button>
  )
}
