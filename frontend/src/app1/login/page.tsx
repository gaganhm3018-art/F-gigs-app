'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 w-[400px]">
        <h1 className="text-3xl font-bold mb-8">Login</h1>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Email"
            className="bg-slate-800 p-3 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-slate-800 p-3 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-emerald-500 py-3 rounded-lg mt-4">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}