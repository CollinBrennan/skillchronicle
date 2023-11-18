import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { DocumentData } from 'firebase/firestore'
import { ChartData } from 'chart.js'

function createChartDataFromLogs(
  logs: DocumentData[] | undefined
): ChartData<'bar'> {
  const chartData = {
    labels: [] as string[],
    datasets: [{ data: [] as number[] }],
  }

  logs?.forEach((log) => {
    if (chartData.labels.includes(log.skill)) {
      const indexOfSkill = chartData.labels.indexOf(log.skill)
      chartData.datasets[0].data[indexOfSkill] += 1
    } else {
      chartData.labels.push(log.skill)
      chartData.datasets[0].data.push(1)
    }
  })

  return chartData as ChartData<'bar'>
}

type SkillFrequencyChartProps = {
  logs: DocumentData[] | undefined
}

const SkillFrequencyChart = ({ logs }: SkillFrequencyChartProps) => {
  return (
    <div className="w-ful flex justify-center bg-zinc-100 py-8 my-8">
      <div className="w-[99%]">
        <Bar
          data={createChartDataFromLogs(logs)}
          options={{
            plugins: { legend: { display: false } },
            scales: {
              x: { border: { display: false }, grid: { display: false } },
              y: { border: { display: false }, grid: { display: false } },
            },
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  )
}

export default SkillFrequencyChart
