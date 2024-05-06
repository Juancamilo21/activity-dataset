<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [{ label: 'Resultados', backgroundColor: '#00498D', data: [40, 20, 12, 5, 10] }]
}

const chartOptions = {
  responsive: true
}
</script>

<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
