/* eslint-disable no-console */
// start server (port, error handling, logging server start)

import exitHook from 'async-exit-hook'

import app from '~/app'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'


const HOSTNAME = env.APP_HOST || 'localhost'
const PORT = env.APP_PORT || 8000

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  process.exit(1)
})


// Start server
let server = null
const START_SERVER = async () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`)
  })

  exitHook(() => {
    console.log('Closing MongoDB connection...')
    CLOSE_DB()
      .then(() => console.log('MongoDB connection closed.'))
      .catch((err) => console.error('Error closing MongoDB:', err))
  })
}

(async () => {
  try {
    console.log('1. Connecting to MongoDB...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB.')
    START_SERVER()
  } catch (error) {
    console.error('Failed to connect DB:', error)
    process.exit(1)
  }
})()

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  if (server) {
    server.close(() => process.exit(1))
  } else {
    process.exit(1)
  }
})
