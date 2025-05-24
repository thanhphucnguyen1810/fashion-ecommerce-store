/* eslint-disable no-console */
import mongoose from 'mongoose'
import { env } from '~/config/environment'

/**Biến lưu trạng thái kết nối mongoose */
let isConnected = false

/**Kết nối MongoDB qua mongoose */
export const CONNECT_DB = async () => {
  if (isConnected) {
    return // Nếu đã kết nối thì sẽ không kết nối lại
  }

  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB_NAME
    })
    isConnected = true
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('Mongoose connection error:', error)
    throw error
  }
}

/** Lấy instance connection Mongoose */
export const GET_DB = () => {
  if (!isConnected) {
    throw new Error('Must connect to Database first!')
  }
  return mongoose.connection
}

/**Đóng kết nối MongoDB */
export const CLOSE_DB = async () => {
  if (!isConnected) return

  try {
    await mongoose.disconnect()
    isConnected = false
    console.log('Mongoose disconnected')
  } catch (error) {
    console.error('Error disconnecting Mongoose:', error)
    throw error
  }
}
