import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import taskRoutes from './routes/tasks.js'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())
app.use('/api/tasks', taskRoutes)

app.use((err, req, res, next) => {
  const status = err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500
  res.status(status).json({ message: err.message })
})

await mongoose.connect(process.env.MONGO_URI)
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
