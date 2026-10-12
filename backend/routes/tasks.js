import { Router } from 'express'
import Task from '../models/Task.js'

const router = Router()

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 })
  res.json(tasks)
})

router.post('/', async (req, res) => {
  const title = String(req.body.title ?? '').trim()
  if (!title) return res.status(400).json({ message: 'Title is required' })

  const task = await Task.create({ title })
  res.status(201).json(task)
})

router.put('/:id', async (req, res) => {
  const changes = {}

  if (req.body.title !== undefined) {
    const title = String(req.body.title).trim()
    if (!title) return res.status(400).json({ message: 'Title is required' })
    changes.title = title
  }
  if (req.body.completed !== undefined) changes.completed = Boolean(req.body.completed)

  const task = await Task.findByIdAndUpdate(req.params.id, changes, { returnDocument: 'after' })
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json(task)
})

router.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id)
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json({ message: 'Task deleted' })
})

export default router
