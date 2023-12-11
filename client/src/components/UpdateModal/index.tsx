import { useContext, useState } from 'react'
import { Box, IconButton, Modal } from '@mui/material'

import { TaskType } from '../../schemas'
import { patchTask } from '../../api/taskService'
import { TaskContext, setTasks } from '../../context/task'

import { ModalContent } from '../ModalContent'
import { Edit } from '@mui/icons-material'

export const UpdateModal = ({ task }: { task: TaskType }) => {
  const [updatedText, setUpdatedText] = useState<string>()
  const [invalidText, setInvalidText] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { items, dispatch } = useContext(TaskContext)

  const { tasks } = items

  const onClickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const patchBody = {
      text: updatedText,
    }

    const data = await patchTask(patchBody, task.id)

    const filteredList = tasks.filter((task: TaskType) => task.id !== data?.id)

    const newTasks = [...filteredList, data].sort(
      (a: TaskType, b: TaskType) =>
        new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
    )

    dispatch(setTasks(newTasks))
    setModalOpen(false)
    setUpdatedText(undefined)
  }

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    setUpdatedText(e.target.value)
    if (e.target.value.length > 50) {
      setInvalidText(true)
    } else {
      setInvalidText(false)
    }
  }

  const text = updatedText !== undefined ? updatedText : task.text
  const disableUpdateButton = !updatedText || updatedText === task.text

  return (
    <Box style={{ marginLeft: 'auto' }}>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setUpdatedText(undefined)
        }}
      >
        <>
          <ModalContent
            onChangeHandler={onChangeHandler}
            onClickHandler={onClickHandler}
            invalidText={invalidText}
            text={text}
            buttonText="Update task"
            titleText="Update task"
            disableButton={disableUpdateButton}
          />
        </>
      </Modal>
      <IconButton
        onClick={() => {
          setModalOpen(true)
        }}
      >
        <Edit />
      </IconButton>
    </Box>
  )
}
