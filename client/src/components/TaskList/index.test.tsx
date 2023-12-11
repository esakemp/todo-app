import '@testing-library/jest-dom'
import { expect, it } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'

import { TaskList } from '.'
import { TaskContext, taskReducer } from '../../context/task'
import { useReducer } from 'react'

describe('<TaskList /> tests', () => {
  it('Should render task listing', () => {
    renderHook(() => {
      const [items, dispatch] = useReducer(taskReducer, {
        tasks: [
          {
            text: 'foo',
            id: 1,
            createdAt: new Date('2112-12-31').toISOString(),
            completed: false,
          },
          {
            text: 'bar',
            id: 2,
            createdAt: new Date('2112-12-30').toISOString(),
            completed: false,
          },
        ],
      })

      const data = { items, dispatch }

      const result = render(
        <TaskContext.Provider value={data}>
          <TaskList />
        </TaskContext.Provider>
      )
      return result
    })

    const taskText1 = screen.queryByText('foo')
    const taskText2 = screen.queryByText('bar')

    expect(taskText1).toBeInTheDocument()
    expect(taskText2).toBeInTheDocument()
  })
})
