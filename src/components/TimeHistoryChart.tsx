import { ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { LogDocData } from '../utils/types'
import { timeFromSeconds } from '../utils/dateAndTime'

function createChartDataFromLogs(
  logs: LogDocData[] | undefined
): ChartData<'line'> {
  const chartData = {
    labels: [] as string[],
    datasets: [
      {
        label: 'hours',
        data: [] as number[],
        borderColor: 'rgba(126, 211, 33, 1)',
        backgroundColor: 'rgba(126, 211, 33, 1)',
      },
    ],
  }

  if (logs && logs.length > 0) {
    var totalTimeInDay = 0
    var date = logs[0].createdAt.toDate()
    var month = date.getMonth()
    var year = date.getFullYear()

    logs.forEach((log, logIndex) => {
      const { hours, minutes } = timeFromSeconds(log.seconds)
      const logDate = log.createdAt.toDate()
      const logMonth = logDate.getMonth()
      const logYear = logDate.getFullYear()

      if (logMonth === month && logYear === year) {
        totalTimeInDay += hours + minutes / 60
        if (logIndex === logs.length - 1) {
          chartData.labels.unshift(
            date.toLocaleDateString(undefined, {
              month: 'short',
              year: 'numeric',
            })
          )
          chartData.datasets[0].data.unshift(totalTimeInDay)
        }
      } else {
        chartData.labels.unshift(
          date.toLocaleDateString(undefined, {
            month: 'short',
            year: 'numeric',
          })
        )
        chartData.datasets[0].data.unshift(totalTimeInDay)
        totalTimeInDay = hours + minutes / 60
        date = logDate
        month = logMonth
        year = logYear
        if (logIndex === logs.length - 1) {
          chartData.labels.unshift(
            date.toLocaleDateString(undefined, {
              month: 'short',
              year: 'numeric',
            })
          )
          chartData.datasets[0].data.unshift(totalTimeInDay)
        }
      }
    })
  }
  return chartData as ChartData<'line'>
}

type SkillFrequencyChartProps = {
  logs?: LogDocData[]
}

const TimeHistoryChart = ({ logs }: SkillFrequencyChartProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[99%] h-72">
        <Line
          data={createChartDataFromLogs(logs)}
          options={{
            plugins: { legend: { display: false } },
            elements: {
              point: {
                radius: 8,
                hoverRadius: 10,
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: (val) => (val === 1 ? val + ' hr' : val + ' hrs'),
                },
              },
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
