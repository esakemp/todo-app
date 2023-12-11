import '@testing-library/jest-dom'
import { expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import { CreateModal } from '.'

describe('<CreateModal /> tests', () => {
  it('Modal content not rendered by default', () => {
    const result = render(<CreateModal />)
    const addTaskButton = result.getByText('ADD TASK')

    expect(addTaskButton).toBeInTheDocument()

    const createTaskText = screen.queryByTestId('modal-header')

    expect(createTaskText).not.toBeInTheDocument()
  })

  it('Renders modal content after clicking ADD TASK button', () => {
    const result = render(<CreateModal />)
    const addTaskButton = result.getByText('ADD TASK')

    expect(addTaskButton).toBeInTheDocument()
    fireEvent.click(addTaskButton)

    const createTaskText = result.getByTestId('modal-header')

    expect(createTaskText).toBeInTheDocument()
  })
})
