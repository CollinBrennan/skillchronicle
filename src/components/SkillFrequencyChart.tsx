import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { ChartData } from 'chart.js'

const data: ChartData<'bar'> = {
  labels: [10, 20, 30],
  datasets: [
    {
      label: 'Hello!',
      data: [100, 400, 300],
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
