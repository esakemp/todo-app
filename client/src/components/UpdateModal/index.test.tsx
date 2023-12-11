import '@testing-library/jest-dom'
import { expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import { UpdateModal } from '.'

const mockTask = {
  text: 'foo bar',
  id: 1,
  createdAt: new Date('2112-12-31').toISOString(),
  completed: false,
}

describe('<UpdateModal /> tests', () => {
  it('Modal content not rendered by default', () => {
    const result = render(<UpdateModal task={mockTask} />)
    const updateTaskButton = result.getByTestId('icon-button-update')

    expect(updateTaskButton).toBeInTheDocument()

    const updateTaskText = screen.queryByTestId('modal-header')

    expect(updateTaskText).not.toBeInTheDocument()
  })

  it('Renders modal content after clicking update task icon', () => {
    const result = render(<UpdateModal task={mockTask} />)
    const updateTaskButton = result.getByTestId('icon-button-update')

    expect(updateTaskButton).toBeInTheDocument()
    fireEvent.click(updateTaskButton)

    const updateTaskText = result.getByTestId('modal-header')

    const taskTextInput = screen.getByLabelText('Description')

    expect(updateTaskText).toBeInTheDocument()
    expect(taskTextInput).toHaveValue('foo bar')
  })
})
