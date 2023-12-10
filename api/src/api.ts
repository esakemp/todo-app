import express from 'express'
import cors from 'cors'

import { routes } from './routes'

export const api = express()

api.use(cors({ origin: true }))
api.use(express.json())

api.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

api.use('/tasks', routes)

api.use('*', (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})
