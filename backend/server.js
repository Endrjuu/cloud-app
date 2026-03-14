const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

let tasks = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Study Cloud", completed: false }
]

app.get("/api/tasks", (req, res) => {
  res.json(tasks)
})

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id)
  if (!task) return res.status(404).json({ message: "Task not found" })
  res.json(task)
})

app.post("/api/tasks", (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  }
  tasks.push(task)
  res.status(201).json(task)
})

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id)
  if (!task) return res.status(404).json({ message: "Task not found" })

  task.title = req.body.title
  task.completed = req.body.completed
  res.json(task)
})

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id)
  res.status(204).send()
})

app.listen(8081, () => {
  console.log("API running on port 8081")
})