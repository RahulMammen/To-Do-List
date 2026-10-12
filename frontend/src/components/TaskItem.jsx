import { useState } from 'react'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  const save = () => {
    if (title.trim()) onEdit(task._id, title.trim())
    else setTitle(task.title)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') save()
    if (e.key === 'Escape') {
      setTitle(task.title)
      setEditing(false)
    }
  }

  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
      {editing ? (
        <input
          className="edit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="title">{task.title}</span>
      )}
      {!editing && (
        <button className="ghost" onClick={() => setEditing(true)}>
          Edit
        </button>
      )}
      <button className="ghost danger" onClick={() => onDelete(task._id)}>
        ✕
      </button>
    </li>
  )
}
