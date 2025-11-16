import React from 'react'
import KundaliForm from './components/KundaliForm'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>AstroKundali</h1>
        <p>Your cosmic map</p>
      </header>
      <main>
        <KundaliForm />
      </main>
    </div>
  )
}
