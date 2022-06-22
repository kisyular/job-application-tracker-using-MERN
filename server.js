// Imports
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import cors from 'cors'
import 'express-async-errors'
import morgan from 'morgan'

// initialize the server
dotenv.config()
const app = express()
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}
app.use(express.json())
app.use(cors())

// Import middleware.
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

//Routes.
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is listening on port ${port}...`))
