import { DataSource } from 'typeorm'

import Task from './models/Task'

const DB_PATH = process.env.DB_PATH || ''

export const database = new DataSource({
  type: 'sqlite',
  database: DB_PATH,
  entities: [Task],
  synchronize: true,
})

export const connectToDb = async (): Promise<void> => {
  try {
    await database.initialize()
    console.log('DB connection established')
  } catch (err) {
    console.log('Connection to database failed: ', err)
    process.exit(1)
  }
}
