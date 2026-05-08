'use client'

export default function Navbar() {
  return (
    <div className="w-full h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950">
      <h1 className="text-2xl font-bold">Gig Income Tracker</h1>

      <div className="flex gap-4 items-center">
        <button className="bg-emerald-500 px-4 py-2 rounded-lg">
          Export CSV
        </button>

        <div className="w-10 h-10 rounded-full bg-slate-700" />
      </div>
    </div>
  )
}