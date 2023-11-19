import { ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { SkillLog } from './LogTable'

function createChartDataFromLogs(logs: SkillLog[]): ChartData<'line'> {
  const chartData = {
    labels: [] as string[],
    datasets: [{ label: 'hours', data: [] as number[] }],
  }

  if (logs.length > 0) {
    var totalTimeInDay = 0
    var date = logs[0].createdAt.toDate()
    var dayOfMonth = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()

    logs.forEach((log, logIndex) => {
      const logDate = log.createdAt.toDate()
      const logDayOfMonth = logDate.getDate()
      const logMonth = logDate.getMonth()
      const logYear = logDate.getFullYear()
      console.log(dayOfMonth)
      if (
        logDayOfMonth === dayOfMonth &&
        logMonth === month &&
        logYear === year &&
        logIndex !== logs.length - 1
      ) {
        totalTimeInDay += log.hours + log.minutes / 60
      } else {
        chartData.labels.unshift(
          date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })
        )
        chartData.datasets[0].data.unshift(totalTimeInDay)
        totalTimeInDay = log.hours + log.minutes / 60
        date = logDate
        dayOfMonth = logDayOfMonth
        month = logMonth
        year = logYear
      }
    })
  }
  return chartData as ChartData<'line'>
}

type SkillFrequencyChartProps = {
  logs: SkillLog[]
}

const TimeHistoryChart = ({ logs }: SkillFrequencyChartProps) => {
  return (
    <div className="w-ful flex justify-center bg-zinc-100 py-8 my-8">
      <div className="w-[99%]">
        <Line
          data={createChartDataFromLogs(logs)}
          options={{
            plugins: { legend: { display: false } },
            scales: {
              x: { border: { display: false }, grid: { display: false } },
              y: { border: { display: false }, grid: { display: false } },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  )
}

export default TimeHistoryChart
