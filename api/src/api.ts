import express from 'express'
import cors from 'cors'

import { taskRoutes } from './routes/tasks'

export const api = express()

api.use(cors({ origin: true }))
api.use(express.json())

api.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

api.use('/tasks', taskRoutes)

api.use('*', (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})
