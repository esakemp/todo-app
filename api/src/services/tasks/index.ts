import { database } from '../../db'
import Task from '../../db/models/Task'

interface createNewTaskProps {
  text: string
}

interface updateTaskProps {
  body: { text?: string; priority?: number; completed?: boolean }
  taskToUpdate: Task
}

export const getAllTasks = async (): Promise<Task[]> => {
  const taskRepository = database.getRepository(Task)
  const allTasks = await taskRepository.find()

  return allTasks
}

export const createNewTask = async ({
  text,
}: createNewTaskProps): Promise<Task> => {
  const newTask = new Task()

  newTask.text = text
  newTask.createdAt = new Date()

  const taskRepository = database.getRepository(Task)
  const savedTask = await taskRepository.save(newTask)

  return savedTask
}

export const findTask = async ({
  id,
}: {
  id: number
}): Promise<Task | null> => {
  const taskRepository = database.getRepository(Task)
  const foundTask = await taskRepository.findOneBy({ id })

  return foundTask
}

export const updateTask = async ({
  body,
  taskToUpdate,
}: updateTaskProps): Promise<Task | null> => {
  const taskRepository = database.getRepository(Task)

  await taskRepository.update(taskToUpdate, body)

  return { ...taskToUpdate, ...body }
}

export const deleteTask = async ({
  taskToRemove,
}: {
  taskToRemove: Task
}): Promise<void> => {
  const taskRepository = database.getRepository(Task)

  await taskRepository.remove(taskToRemove)
}
