'use client'

import { useState } from 'react'
import { addIncomeEntry } from '@/services/incomeService'

export default function AddIncomeModal() {
  const [platform, setPlatform] = useState('')
  const [amount, setAmount] = useState('')

  const submit = async () => {
    await addIncomeEntry({
      platform,
      amount,
    })
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <h2 className="text-xl font-bold mb-6">Add Income</h2>

      <div className="flex flex-col gap-4">
        <input
          placeholder="Platform"
          className="bg-slate-800 p-3 rounded-lg"
          onChange={(e) => setPlatform(e.target.value)}
        />

        <input
          placeholder="Amount"
          className="bg-slate-800 p-3 rounded-lg"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-emerald-500 py-3 rounded-lg"
        >
          Save Entry
        </button>
      </div>
    </div>
  )
}