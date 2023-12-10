import { useContext, useEffect } from 'react'
import { Box } from '@mui/material'

import { fetchAllTasks } from '../api/taskService'
import { TaskContext, setTasks } from '../context/task'
import { TaskList } from '../components/TaskList'
import { CreateModal } from '../components/CreateModal'

export const TasksContainer = () => {
  const { dispatch } = useContext(TaskContext)

  useEffect(() => {
    const fetchTasks = async () => {
      const responseData = await fetchAllTasks()

      dispatch(setTasks(responseData))
    }

    fetchTasks()
  }, [])

  return (
    <Box
      sx={{
        justifyContent: 'center',
        margin: '5rem',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <TaskList />
      <CreateModal />
    </Box>
  )
}
