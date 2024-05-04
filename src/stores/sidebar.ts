import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isSidebarOpen = ref(false)
  isSidebarOpen.value = !isSidebarOpen.value
  return { isSidebarOpen }
})
