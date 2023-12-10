import express from 'express'

import { patchSchema, postSchema, validate } from '../middlewares'
import {
  deleteTaskHandler,
  getTasksHandler,
  patchTaskHandler,
  postTasksHandler,
} from '../controllers/taskControllers'

export const routes = express()

routes.get('/', getTasksHandler)

routes.post('/', validate(postSchema), postTasksHandler)

routes.patch('/:id', validate(patchSchema), patchTaskHandler)

routes.delete('/:id', deleteTaskHandler)
