// Khởi tạo app, middleware, routes, cấu hình logic express
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import xss from 'xss-clean'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'

import { corsOptions } from './config/cors'
import { errorHandlingMiddleware } from '~/middlewares/errorHandling.middleware'

import userRoutes from './routes/user.routes'

// Load environment variables
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Enable cors
app.use(cors(corsOptions))

// Bảo vệ ứng dụng khỏi các cuộc tấn công Cross-Site Scripting (XSS)
app.use(xss())

//Bảo vệ ứng dụng khỏi các cuộc tấn công NoSQL Injection
app.use(mongoSanitize())

// kích thước body tối đa là 10kb, tránh DoS
app.use(express.json({ limit: '10kb' }))

// Bảo mật http headers: tránh XSS, CSRF, phishing, clickjacking, etc.
app.use(helmet())

// Middleware xử lý lỗi tập trung
app.use(errorHandlingMiddleware)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: 'Too many requests from this IP, Please try again in an hour'
})

app.use('/e-commerce', limiter)

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', userRoutes)


export default app
