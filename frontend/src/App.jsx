import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setTasks)
  }, [])

  const updateTask = async (id, changes) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
    const updated = await res.json()
    setTasks(tasks.map((task) => (task._id === id ? updated : task)))
  }

  const addTask = async (title) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const created = await res.json()
    setTasks([created, ...tasks])
  }

  const toggleTask = (task) => updateTask(task._id, { completed: !task.completed })

  const editTask = (id, title) => updateTask(id, { title })

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  return (
    <main className="app">
      <h1>Tasks</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />
    </main>
  )
}

export default App
