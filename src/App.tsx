import { useState } from "react"
import "./App.css"
import Clock from "./components/Clock"
import CRUD from "./components/Crud"
import TaskSwitcher from "./components/TaskSwitcher"

const App = () => {
  const [task, setTask] = useState("1")

  const handler = (e: any) => {
    setTask(e.target.value)
  }

  return (
    <>
      <TaskSwitcher task={task} onChangeHandler={handler} />

      {task == "1" && <Clock />}

      {task == "2" && <CRUD />}

      {task == "3" && <>Task 3</>}
    </>
  )
}

export default App
