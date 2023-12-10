import React, { useContext, useState } from 'react'
import { Box, Checkbox, IconButton } from '@mui/material'
import {
  CheckCircle,
  Delete,
  Edit,
  RadioButtonUnchecked,
} from '@mui/icons-material'

import { TaskType } from '../../schemas'
import { deleteTask, patchTask } from '../../api/taskService'
import { TaskContext, setTasks } from '../../context/task'
import { UpdateModal } from '../UpdateModal'

export const TaskList = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [taskToUpdate, setTaskToUpdate] = useState<TaskType>({} as TaskType)

  const { items, dispatch } = useContext(TaskContext)

  const { tasks } = items

  const deleteClickHandler = async (
    e: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    e.preventDefault()

    const responseData = await deleteTask(id)

    const newTasks = [...tasks].filter(
      (task: TaskType) => task.id !== responseData.id
    )

    dispatch(setTasks(newTasks))
  }

  const checkboxHandler = async (e: React.ChangeEvent, task: TaskType) => {
    e.preventDefault()

    const patchBody = {
      completed: !task.completed,
    }

    const data = await patchTask(patchBody, task.id)

    const filteredList = tasks.filter((task: TaskType) => task.id !== data.id)

    const newTasks = [...filteredList, data].sort(
      (a: TaskType, b: TaskType) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    dispatch(setTasks(newTasks))
    setModalOpen(false)
  }

  return (
    <Box>
      <h2>TASK LISTING</h2>
      <UpdateModal
        task={taskToUpdate}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      {tasks
        ?.sort(
          (a: TaskType, b: TaskType) =>
            Number(a.completed) - Number(b.completed) ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((task: TaskType, i: number) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              margin: '1rem',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: 'rgba(149, 157, 165, 0.2) 0rem 0.5rem 1.5rem',
            }}
            key={i}
          >
            <Checkbox
              icon={<RadioButtonUnchecked />}
              checkedIcon={<CheckCircle />}
              checked={task.completed}
              onChange={(e) => checkboxHandler(e, task)}
            />
            <Box
              sx={{
                overflow: 'scroll',
              }}
            >
              {task.completed ? <s>{task.text}</s> : task.text}
            </Box>
            <IconButton
              sx={{ marginLeft: 'auto' }}
              onClick={(e) => deleteClickHandler(e, task.id)}
            >
              <Delete />
            </IconButton>
            <IconButton
              onClick={() => {
                setTaskToUpdate(task)
                setModalOpen(true)
              }}
            >
              <Edit />
            </IconButton>
          </Box>
        ))}
    </Box>
  )
}
