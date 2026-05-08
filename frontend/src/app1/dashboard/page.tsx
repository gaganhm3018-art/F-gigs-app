import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import SummaryCard from '@/components/SummaryCard'
import IncomeChart from '@/components/IncomeChart'
import PredictionChart from '@/components/PredictionChart'
import IncomeTable from '@/components/IncomeTable'

export default function DashboardPage() {
  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <SummaryCard title="Monthly Income" value="$4,200" />
            <SummaryCard title="Pending" value="$950" />
            <SummaryCard title="Projected" value="$52,000" />
            <SummaryCard title="Growth" value="+12%" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <IncomeChart />
            <PredictionChart />
          </div>

          <IncomeTable />
        </div>
      </div>
    </div>
  )
}