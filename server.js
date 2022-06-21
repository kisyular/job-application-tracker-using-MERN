// Imports
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import cors from 'cors'
import 'express-async-errors'

// initialize the server
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

//routers
import authRoutes from './routes/authRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'

//Connect to the database
connectDB()
//Routes
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the Job Board' })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is listening on port ${port}...`))
