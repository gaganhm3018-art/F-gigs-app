const data = [
  {
    platform: 'Uber',
    amount: 1200,
    status: 'Received',
  },
  {
    platform: 'Fiverr',
    amount: 800,
    status: 'Pending',
  },
]

export default function IncomeTable() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
      <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-slate-400">
            <th>Platform</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-slate-800 h-14">
              <td>{item.platform}</td>
              <td>${item.amount}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}