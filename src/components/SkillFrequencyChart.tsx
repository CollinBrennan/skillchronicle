import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { ChartData } from 'chart.js'

const data: ChartData<'bar'> = {
  labels: ['Skill', 'Skill', 'Skill'],

  datasets: [
    {
      data: [1, 15, 10, 20],
    },
  ],
}

const SkillFrequencyChart = () => {
  return (
    <div className="w-ful flex justify-center bg-zinc-100 py-8 my-8">
      <div className="w-[99%]">
        <Bar
          data={data}
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
