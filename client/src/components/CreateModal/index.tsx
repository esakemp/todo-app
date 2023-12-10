import React, { useContext, useState } from 'react'
import { Button, Modal } from '@mui/material'

import { postNewTask } from '../../api/taskService'
import { TaskContext, setTasks } from '../../context/task'
import { TaskType } from '../../schemas'

import { ModalContent } from '../ModalContent'

export const CreateModal = () => {
  const [text, setText] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [invalidText, setInvalidText] = useState<boolean>(false)

  const { items, dispatch } = useContext(TaskContext)

  const { tasks } = items

  const onClickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const postBody = {
      text,
    }

    const data = await postNewTask(postBody)

    if (data) {
      const newTasks = [...tasks, data].sort(
        (a: TaskType, b: TaskType) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      dispatch(setTasks(newTasks))
      setModalOpen(false)

      setText('')
    }
  }

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    setText(e.target.value)
    if (e.target.value.length > 50) {
      setInvalidText(true)
    } else {
      setInvalidText(false)
    }
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <>
          <ModalContent
            onChangeHandler={onChangeHandler}
            onClickHandler={onClickHandler}
            invalidText={invalidText}
            text={text}
            buttonText="Create task"
            titleText="Create task"
          />
        </>
      </Modal>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        ADD TASK
      </Button>
    </div>
  )
}
