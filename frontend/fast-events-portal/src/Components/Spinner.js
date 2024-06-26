import React from 'react'

export default function Spinner() {
  return (
    <div>
      <div className="spinner-border text-primary mt-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
