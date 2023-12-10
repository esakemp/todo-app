import axios from 'axios'
import { TaskType } from '../schemas'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const baseUrl = BACKEND_URL || 'http://localhost:8080/api'

const axiosClient = axios.create({ baseURL: baseUrl })

export const fetchAllTasks = async (): Promise<TaskType[]> => {
  try {
    const response = await axiosClient.get('/tasks')
    return response.data
  } catch (err) {
    console.info(err)
    return []
  }
}

export const postNewTask = async (body: {
  text: string
  completed?: boolean
}): Promise<TaskType> => {
  try {
    const response = await axiosClient.post('/tasks', body)
    return response.data
  } catch (err) {
    console.info(err)
    return {} as TaskType
  }
}

export const patchTask = async (
  body: {
    text?: string
    completed?: boolean
  },
  id: number
): Promise<TaskType> => {
  try {
    const response = await axiosClient.patch(`/tasks/${id}`, body)
    return response.data
  } catch (err) {
    console.info(err)
    return {} as TaskType
  }
}

export const deleteTask = async (id: number): Promise<TaskType> => {
  try {
    const response = await axiosClient.delete(`/tasks/${id}`)
    return response.data
  } catch (err) {
    console.info(err)
    return {} as TaskType
  }
}
