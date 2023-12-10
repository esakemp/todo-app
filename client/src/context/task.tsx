import { useReducer } from 'react'
import { TaskType } from '../schemas'
import React from 'react'

const initialState = {
  tasks: [],
}

type ReducerAction = {type: 'SET_TASKS', payload: TaskType[]}

export const setTasks = (tasks: TaskType[]): ReducerAction => {
  return { type: 'SET_TASKS', payload: tasks }
}

export const taskReducer = (state: { tasks: TaskType[] }, action: ReducerAction) => {
  switch (action.type) {
    case 'SET_TASKS': {
      return { ...state, tasks: action.payload }
    }
    default: {
      return state
    }
  }
}

export const TaskContext = React.createContext<{
  items: {tasks: TaskType[]}
  dispatch: React.Dispatch<ReducerAction>
}>({ items: initialState, dispatch: () => initialState })

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactElement
}): JSX.Element => {
  const [items, dispatch] = useReducer(taskReducer, initialState)

  const data = { items, dispatch }

  return (
    <TaskContext.Provider value={data}>{children}</TaskContext.Provider>
  )
}
