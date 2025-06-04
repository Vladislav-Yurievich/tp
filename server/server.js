import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import signupRoute from './routes/signup.js'
import loginRoute from './routes/login.js'
import profileRoutes from './routes/profile.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Маршруты авторизации
app.post('/signup', signupRoute)
app.post('/login', loginRoute)

// Маршруты профиля
app.use('/', profileRoutes)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
