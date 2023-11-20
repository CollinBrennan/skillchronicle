import { ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { LogDocData } from '../utils/types'
import { timeFromSeconds } from '../utils/dateAndTime'

function getChartData(logs: LogDocData[] | undefined): ChartData<'line'> {
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

  function addDataPoint(date: Date, hours: number) {
    chartData.labels.unshift(
      date.toLocaleDateString(undefined, {
        month: 'short',
        year: 'numeric',
      })
    )
    chartData.datasets[0].data.unshift(hours)
  }

  if (logs) {
    var totalHoursInDay = 0
    var date = logs[0].createdAt.toDate()
    var month = date.getMonth()
    var year = date.getFullYear()

    logs.forEach((log, logIndex) => {
      const { hours, minutes } = timeFromSeconds(log.seconds)
      const logDate = log.createdAt.toDate()
      const logMonth = logDate.getMonth()
      const logYear = logDate.getFullYear()

      // Add hours to current month
      if (logMonth === month && logYear === year) {
        totalHoursInDay += hours + minutes / 60
      } else {
        // Push previous month, reset to current day
        addDataPoint(date, totalHoursInDay)
        totalHoursInDay = hours + minutes / 60
        date = logDate
        month = logMonth
        year = logYear
      }
      // Push if last log in array
      if (logIndex === logs.length - 1) {
        addDataPoint(date, totalHoursInDay)
      }
    })
  }
  return chartData
}

type SkillFrequencyChartProps = {
  logs?: LogDocData[]
}

const TimeHistoryChart = ({ logs }: SkillFrequencyChartProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[99%] h-72">
        <Line
          data={getChartData(logs)}
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
