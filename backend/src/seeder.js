/* eslint-disable no-console */
import Product from '~/models/product.model'
import User from '~/models/user.model'
import products from '~/data/products.data'
import { CONNECT_DB } from './config/mongodb'


// Connect to MongoDB
CONNECT_DB()

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany()
    await User.deleteMany()

    // Create a default admin User
    const createUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '12345678',
      role: 'admin'
    })

    // Assign the default user ID to each product
    const userID = createUser._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID }
    })

    // Insert the products into the database
    await Product.insertMany(sampleProducts)
    console.log('Product data seeded successfully!')

    process.exit()
  } catch (error) {
    console.error('Error seeding the data: ', error)
    process.exit(1)

  }
}

seedData()

