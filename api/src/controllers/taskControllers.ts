import { Request, Response } from 'express'

import {
  createNewTask,
  deleteTask,
  findTask,
  getAllTasks,
  updateTask,
} from '../services/taskService'

const getTasksHandler = async (req: Request, res: Response): Promise<void> => {
  const allTasks = await getAllTasks()
  res.status(200).json(allTasks)
}

const postTasksHandler = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body

  const savedTask = await createNewTask({ text })

  res.status(201).json(savedTask)
}

const patchTaskHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const body = req.body

  const keysToUpdate = Object.keys(body)

  if (keysToUpdate.length < 1) {
    res.status(400).send('no data to update')
    return
  }

  const parsedId = parseInt(id)

  const foundTask = await findTask({ id: parsedId })

  if (!foundTask) {
    res.status(404).send('data not found')
    return
  }

  const updatedTask = await updateTask({
    body,
    taskToUpdate: foundTask,
  })

  res.status(200).json(updatedTask)
}

const deleteTaskHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  const parsedId = parseInt(id)

  const foundTask = await findTask({ id: parsedId })

  if (!foundTask) {
    res.status(404).send('data not found')
    return
  }

  await deleteTask({ taskToRemove: foundTask })
  res.status(200).json({ id: parsedId })
}

export {
  getTasksHandler,
  postTasksHandler,
  patchTaskHandler,
  deleteTaskHandler,
}
