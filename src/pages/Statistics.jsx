import { useEffect, useState } from "react"
import { API_BASE } from "@/constants/api"
import AreaChartCard from "@/components/chart/AreaChartCard"

function Statisctics() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/chart`)
      .then(res => res.json())
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <p className="text-gray-500 text-center">Loading chart data...</p>
  }

  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center">No chart data available</p>
  }

  return (
    <section className="w-full border-b border-border backdrop-blur-md p-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        <AreaChartCard
          title="Daily Activity"
          description="Transactions per day"
          data={data}
          dataKey="dailyTx"
          color="var(--chart-4)"
        />

        <AreaChartCard
          title="Total Activity"
          description="Cumulative transactions"
          data={data}
          dataKey="cumulativeTx"
          color="var(--chart-4)"
        />

        <AreaChartCard
          title="Daily Active Players"
          description="Unique players per day"
          data={data}
          dataKey="dailyActiveAccounts"
          color="var(--chart-4)"
        />

        <AreaChartCard
          title="Total Active Players"
          description="All-time unique players"
          data={data}
          dataKey="totalActiveAccounts"
          color="var(--chart-4)"
        />

        <AreaChartCard
          title="Daily Active Games"
          description="Unique games per day"
          data={data}
          dataKey="dailyActiveGames"
          color="var(--chart-4)"
        />

        <AreaChartCard
          title="Total Active Games"
          description="All-time unique games"
          data={data}
          dataKey="totalActiveGames"
          color="var(--chart-4)"
        />

        <AreaChartCard
          title="Daily Score"
          description="Scores earned per day"
          data={data}
          dataKey="dailyScore"
          color="var(--chart-4)"
        />

        <AreaChartCard
          title="Total Score"
          description="Cumulative scores"
          data={data}
          dataKey="totalScore"
          color="var(--chart-4)"
        />

      </div>
    </section>
  )
}

export default Statisctics
