import express from 'express'

import { patchSchema, postSchema, validate } from '../../middlewares'
import {
  deleteTaskHandler,
  getTasksHandler,
  patchTaskHandler,
  postTasksHandler,
} from '../../controllers/tasks'

export const taskRoutes = express()

taskRoutes.get('/', getTasksHandler)

taskRoutes.post('/', validate(postSchema), postTasksHandler)

taskRoutes.patch('/:id', validate(patchSchema), patchTaskHandler)

taskRoutes.delete('/:id', deleteTaskHandler)
