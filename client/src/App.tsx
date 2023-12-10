import { TaskContextProvider } from './context/task'
import { TasksContainer } from './containers/tasks'

const App = (): JSX.Element => {
  return (
    <>
      <TaskContextProvider>
        <TasksContainer />
      </TaskContextProvider>
    </>
  )
}

export default App
