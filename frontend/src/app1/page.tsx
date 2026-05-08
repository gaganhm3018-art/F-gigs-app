import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-6">
        Gig Worker Income Intelligence
      </h1>

      <p className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"">
        Smart analytics and prediction tools for freelancers and gig workers.
      </p>

      <Link
        href="/dashboard"
        className="bg-emerald-500 px-8 py-4 rounded-xl text-lg"
      >
        Open Dashboard
      </Link>
    </div>
  )