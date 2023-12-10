import 'dotenv/config'
import express from 'express'

import { connectToDb } from './db'
import { api } from './api'

export const server = express()

server.use('/api', api)

const startServer = async () => {
  await connectToDb()
  const PORT = 8080

  server.listen(PORT, () => console.log(`Backend listening on port ${PORT}`))
}

startServer()
