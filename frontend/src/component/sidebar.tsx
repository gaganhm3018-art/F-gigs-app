import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-950 border-r border-slate-800 p-6 fixed">
      <h2 className="text-xl font-bold mb-10">Dashboard</h2>

      <div className="flex flex-col gap-5 text-slate-300">
        <Link href="/dashboard">Overview</Link>
        <Link href="/income">Income</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/predictions">Predictions</Link>
      </div>
    </div>
  )
}