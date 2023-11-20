import { ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { LogDocData } from '../utils/types'
import { timeFromSeconds } from '../utils/dateAndTime'
import 'chartjs-adapter-dayjs-4'
import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'

function getChartData(logs: LogDocData[] | undefined): ChartData<'line'> {
  const chartData = {
    labels: [] as string[],
    datasets: [
      {
        label: 'hours',
        data: [] as { x: number; y: number }[],
        borderColor: 'rgba(126, 211, 33, 1)',
        backgroundColor: 'rgba(126, 211, 33, 1)',
      },
    ],
  }

  function pushMonthlyHours(timestamp: Timestamp, hours: number) {
    chartData.datasets[0].data.push({
      x: timestamp.toMillis(),
      y: hours,
    })
  }

  if (logs) {
    var totalHours = 0
    var timestamp = logs[0].createdAt
    var date = timestamp.toDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    logs.forEach((log, logIndex) => {
      const logDate = log.createdAt.toDate()
      const logMonth = logDate.getMonth()
      const logYear = logDate.getFullYear()
      const { hours, minutes } = timeFromSeconds(log.seconds)
      if (logMonth === month && logYear === year) {
        totalHours += hours + minutes / 60
      } else {
        pushMonthlyHours(timestamp, totalHours)
        totalHours = hours + minutes / 60
        timestamp = log.createdAt
        date = logDate
        month = logMonth
        year = logYear
      }
      if (logIndex === logs.length - 1) {
        pushMonthlyHours(timestamp, totalHours)
      }
    })
  }

  return chartData
}

type SkillFrequencyChartProps = {
  logs?: LogDocData[]
}

const TimeHistoryChart = ({ logs }: SkillFrequencyChartProps) => {
  const [isViewAll, setIsViewAll] = useState(false)

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => setIsViewAll((prevIsViewAll) => !prevIsViewAll)}
        className="flex self-end text-scBlue underline"
      >
        {!isViewAll ? 'View all' : 'View last 6 months'}
      </button>
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
                x: {
                  type: 'time',

                  time: {
                    displayFormats: { month: !isViewAll ? 'MMMM' : "MMM 'YY" },
                    tooltipFormat: !isViewAll ? 'MMMM' : 'MMMM YYYY',
                    unit: 'month',
                    round: 'month',
                  },
                  min: !isViewAll
                    ? Timestamp.now().toMillis() - 13149000000
                    : undefined,
                },
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
    </div>
  )
}

export default TimeHistoryChart
