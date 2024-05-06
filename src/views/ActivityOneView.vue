<script setup lang="ts">
import DashboardLayout from './layouts/DashboardLayout.vue'
import type { Params } from '@/types/params'
import type { Registers } from '@/types/registers'
import { getRequest } from '@/shared/requests'
import { onMounted, ref } from 'vue'

const items = ref<Registers[]>()
const periods = ref<string[]>()
const faculties = ref<string[]>()
const programs = ref<string[]>()

const param = ref<Params>({
  period: undefined,
  faculty: undefined,
  program: undefined
})

const endpoint = '/r86y-229a.json'

async function filterData() {
  const { period, faculty, program } = param.value
  let queryParams = endpoint
  if (period) queryParams += (queryParams.includes('?') ? '&' : '?') + `periodo=${period}`
  if (faculty) queryParams += (queryParams.includes('?') ? '&' : '?') + `facultad=${faculty}`
  if (program) queryParams += (queryParams.includes('?') ? '&' : '?') + `programa=${program}`
  const data = await getRequest(queryParams)
  items.value = data
}

onMounted(async () => {
  const data = await getRequest(endpoint)
  periods.value = [...new Set(data?.map((value) => value.periodo))]
  faculties.value = [...new Set(data?.map((value) => value.facultad))]
  programs.value = [...new Set(data?.map((value) => value.programa))]
  items.value = data
})
</script>

<template>
  <DashboardLayout>
    <form class="grid grid-cols-4 gap-2 mb-2">
      <div class="w-full">
        <label for="" class="">Periodos</label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="param.period"
        >
          <option v-for="item in periods" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="w-full">
        <label for="" class="">Facultades</label>
        <select
          v-model="param.faculty"
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="item in faculties" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="w-full">
        <label for="" class="">Programas</label>
        <select
          v-model="param.program"
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="item in programs" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="pt-6">
        <button
          @click="filterData"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
        >
          Buscar
        </button>
      </div>
    </form>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Facultad</th>
            <th scope="col" class="px-6 py-3">Programa</th>
            <th scope="col" class="px-6 py-3">Periodo</th>
            <th scope="col" class="px-6 py-3">Total Matriculados</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.facultad }}
            </th>
            <td class="px-6 py-4">{{ item.programa }}</td>
            <td class="px-6 py-4">{{ item.periodo }}</td>
            <td class="px-6 py-4">{{ item.total_matricula }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>
