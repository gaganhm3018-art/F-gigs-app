'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', income: 1200 },
  { month: 'Feb', income: 2100 },
  { month: 'Mar', income: 1800 },
  { month: 'Apr', income: 2600 },
]

export default function IncomeChart() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-[400px]">
      <h2 className="text-xl font-bold mb-6">Income Trends</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}