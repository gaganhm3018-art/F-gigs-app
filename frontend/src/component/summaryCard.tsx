interface Props {
  title: string
  value: string
}

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <h3 className="text-slate-400 mb-3">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}