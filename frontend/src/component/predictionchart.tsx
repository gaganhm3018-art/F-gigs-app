'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'May', predicted: 2800 },
  { month: 'Jun', predicted: 3000 },
  { month: 'Jul', predicted: 3200 },
]

export default function PredictionChart() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-[400px]">
      <h2 className="text-xl font-bold mb-6">Income Forecast</h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="predicted" stroke="#f59e0b" fill="#f59e0b" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}