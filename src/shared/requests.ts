import type { Registers } from '@/types/registers'
import axiosInstance from './axios.instance'

export async function getRequest(endpoint: string) {
  try {
    const response = await axiosInstance.get<Registers[]>(endpoint)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
