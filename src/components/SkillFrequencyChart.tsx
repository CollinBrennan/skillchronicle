import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { ChartData } from 'chart.js'
import { LogDocData } from '../utils/types'
import { timeFromSeconds } from '../utils/time'

function createChartDataFromLogs(
  logs: LogDocData[] | undefined,
  numMostRecentSkills: number
): ChartData<'bar'> {
  const chartData = {
    labels: [] as string[],
    datasets: [
      {
        label: 'hours',
        data: [] as number[],
        backgroundColor: 'rgba(126, 211, 33, 1)',
      },
    ],
  }

  logs?.forEach((log) => {
    const indexOfSkill = chartData.labels.indexOf(log.skill)
    const { hours, minutes } = timeFromSeconds(log.seconds)
    if (indexOfSkill !== -1) {
      chartData.datasets[0].data[indexOfSkill] += hours + minutes / 60
    } else if (chartData.labels.length < numMostRecentSkills) {
      chartData.labels.push(log.skill)
      chartData.datasets[0].data.push(hours + minutes / 60)
    }
  })

  return chartData as ChartData<'bar'>
}

type SkillFrequencyChartProps = {
  logs: LogDocData[] | undefined
}

const SkillFrequencyChart = ({ logs }: SkillFrequencyChartProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[99%] h-72">
        <Bar
          data={createChartDataFromLogs(logs, 5)}
          options={{
            plugins: { legend: { display: false } },
            indexAxis: 'y',
            datasets: {
              bar: { barPercentage: 0.65 },
            },
            scales: {
              x: {
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

export default SkillFrequencyChart
