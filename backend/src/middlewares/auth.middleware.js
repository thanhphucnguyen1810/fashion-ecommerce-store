import jwt from 'jsonwebtoken'
import User from '~/models/User.model'
import { env } from '~/config/environment'

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, env.JWT_SECRET)
      req.user = await User.findById(decoded.user.id).select('-password')
      next()
    } catch (error) {
      console.error('Token verification failed: ', error)
      res.status(401).json({ message: 'Not authorized, token failed.' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided.' })
  }
}

export {
  protect
}