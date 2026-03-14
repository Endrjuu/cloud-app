import { useEffect, useState } from "react"
import api from "../services/api"

function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    api.get("/todos")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>StudyPlanner Tasks</h1>
      <ul>
        {tasks.slice(0,10).map((task:any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard