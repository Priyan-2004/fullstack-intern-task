
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const templateRoutes = require('./routes/templates')
const favoriteRoutes = require('./routes/favorites')

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/favorites', favoriteRoutes)

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TemplateVault API is running',
  })
})

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from the .env file')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`TemplateVault API running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()
