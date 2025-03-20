import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Gerekli elementleri kaydediyoruz
ChartJS.register(ArcElement, Tooltip, Legend)

// Plugin tanımı
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width, height } = chart
    const ctx = chart.ctx
    const text = chart.data.datasets[0].data.reduce((a, b) => a + b, 0) // Toplamı hesapla

    ctx.save()
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#fff'
    ctx.fillText(text, width / 2, height / 2) // Ortaya yerleştir
    ctx.restore()
  },
}

// Chart.js'ye plugin'i kaydediyoruz
ChartJS.register(centerTextPlugin)

// DonutChartCard Component'i
const DonutChartCard = ({ title, data, colors, hoverColors, labels }) => {
  const chartData = {
    labels: labels, // Gerektiğinde özelleştirilebilir
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
      },
    ],
  }

  return (
    <div className="max-w-sm w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-slate-300 dark:bg-gray-800 p-6">
      <h3 className="text-lg text-center font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {title}
      </h3>
      <div className="flex justify-center ">
        <Doughnut
          data={chartData}
          options={{
            plugins: { centerText: true },
          }}
        />
      </div>
    </div>
  )
}

export default DonutChartCard
