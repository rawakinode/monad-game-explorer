import { useState, useEffect } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function AreaChartCard({ title, description, data, dataKey, color }) {
  const [range, setRange] = useState("7d")
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    if (!data || data.length === 0) return

    let startDate
    if (range === "7d") {
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
      setFiltered(data.filter(d => d.date >= startDate))
    } else if (range === "30d") {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
      setFiltered(data.filter(d => d.date >= startDate))
    } else {
      setFiltered(data)
    }
  }, [data, range])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "all"].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded text-sm ${
                range === r ? "bg-background text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              {r === "7d" ? "7D" : r === "30d" ? "30D" : "All"}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {filtered && filtered.length > 0 ? (
          <ChartContainer config={{ [dataKey]: { label: title, color } }}>
            <AreaChart
              accessibilityLayer
              data={filtered}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={v => v.slice(5)} // tampilkan MM-DD
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey={dataKey}
                type="natural"
                fill={color}
                fillOpacity={0.4}
                stroke={color}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <p className="text-center text-muted-foreground">No chart data available</p>
        )}
      </CardContent>
    </Card>
  )
}
