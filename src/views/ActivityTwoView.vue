<script setup lang="ts">
import DashboardLayout from './layouts/DashboardLayout.vue'
import { Chart } from 'chart.js/auto'
import { onMounted, ref } from 'vue'
import { getRequest } from '@/shared/requests'
import type { Params } from '@/types/params'

let chart: Chart
const periods = ref<string[]>()
const programs = ref<string[]>()
const filterOptions = ref<string[]>(['sexo_feme', 'sexo_masc', 'total_matricula'])
const param = ref<Params>({
  period: undefined,
  options: undefined
})

const endpoint = '/r86y-229a.json'

function defineGraphic(defineData: { label: string; labels: string[]; values: number[] }) {
  if (chart) chart.destroy()
  const element = document.getElementById('graphic') as HTMLCanvasElement
  chart = new Chart(element, {
    type: 'bar',
    data: {
      labels: defineData.labels,
      datasets: [
        {
          label: defineData.label,
          data: defineData.values,
          backgroundColor: '#00498D'
        }
      ]
    },
    options: {
      scales: { y: { beginAtZero: true } }
    }
  })
}

async function loadDataOnGraphic() {
  const { period, options } = param.value
  let queryParams = endpoint
  if (period) queryParams += (queryParams.includes('?') ? '&' : '?') + `periodo=${period}`
  if (options) queryParams += (queryParams.includes('?') ? '&' : '?') + `$where=${options} > 0`
  const data = await getRequest(queryParams)
  const values = [
    ...data?.map((value) => {
      if (options === 'sexo_feme') return Number(value.sexo_feme)
      if (options === 'sexo_masc') return Number(value.sexo_masc)
      if (options === 'total_matricula') return Number(value.total_matricula)
      return 0
    })!
  ]
  const label = options ? options : 'Resultados'
  defineGraphic({ label, labels: programs.value!, values })
}

onMounted(async () => {
  const data = await getRequest(endpoint)
  periods.value = [...new Set(data?.map((value) => value.periodo))]
  programs.value = [...new Set(data?.map((value) => value.programa))]
  defineGraphic({ label: 'Resultados', labels: programs.value, values: [] })
})
</script>

<template>
  <DashboardLayout>
    <form class="grid grid-cols-3 gap-2 mb-2">
      <div class="w-full">
        <label for="" class="">Periodos</label>
        <select
          v-model="param.period"
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="item in periods" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="w-full">
        <label for="" class="">Opciones</label>
        <select
          v-model="param.options"
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="item in filterOptions" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="pt-6 w-full">
        <button
          @click="loadDataOnGraphic"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
        >
          Buscar
        </button>
      </div>
    </form>
    <canvas id="graphic" class="flex justify-center"></canvas>
  </DashboardLayout>
</template>
