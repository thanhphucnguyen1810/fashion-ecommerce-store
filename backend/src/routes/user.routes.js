import express from 'express'
import jwt from 'jsonwebtoken'
import User from '~/models/User.model'
import { env } from '~/config/environment'
import { protect } from '~/middlewares/auth.middleware'
const router = express.Router()

// @route POST /api/users/register
// @desc Register a new user
// @access Public

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Registration logic
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    user = new User({ name, email, password })
    await user.save()

    // Create JWT payload
    const payload = { user: { id: user._id, role: user.role } }

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: '40h' },
      (err, token) => {
        if (err) throw err
        // Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token
        })
      }
    )

  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error!')
  }
})

// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    // Find the user by email
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    // Create JWT payload
    const payload = { user: { id: user._id, role: user.role } }

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: '40h' },
      (err, token) => {
        if (err) throw err
        // Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token
        })
      }
    )
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!!!')
  }
})

// @route GET /api/users/profile
// @desc GET logged-in user's profile (Protected Route)
// @access private
router.get('/profile', protect, async (req, res) => {
  res.json(req.user)
})

export default router

