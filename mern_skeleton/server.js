import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

// import routes
import contactRoutes from './server/route/contactRoute.js'
import projectRoutes from './server/route/projectRoute.js'
import educationRoutes from './server/route/educationRoute.js'
import userRoutes from './server/route/userRoute.js'
import authRoutes from './server/route/authRoute.js'

const app = express()

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// routes
app.use('/api/contacts', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

// default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MyPortfolio application.' })
})

// connect to MongoDB
const MONGO_URI = 'mongodb+srv://denniskozevnikoff_db_user:wTzULBba5tYd4hil@cluster1.sfofvex.mongodb.net/?appName=cluster1'

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected successfully')

    const PORT = 3000
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

start()
