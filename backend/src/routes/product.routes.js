/* eslint-disable no-console */
import express from 'express'
import Product from '~/models/product.model'

import { protect, admin } from '~/middlewares/auth.middleware'
const productRoutes = express.Router()

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
productRoutes.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      disCountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku
    } = req.body

    const product = new Product({
      name,
      description,
      price,
      disCountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id // reference to the admin user who created it
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!!!')
  }
})

// @route PUT /api/products/:id
// @desc update an existing product ID
// @access Private/Admin
productRoutes.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      disCountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku
    } = req.body

    // Find  product by ID
    const product = await Product.findById(req.params.id)
    if (product) {
      // Update product fields
      product.name = name || product.name
      product.description = description || product.description
      product.price = price || product.price
      product.disCountPrice = disCountPrice || product.disCountPrice
      product.countInStock = countInStock || product.countInStock
      product.category = category || product.category
      product.brand = brand || product.brand
      product.sizes = sizes || product.sizes
      product.colors = colors || product.colors
      product.collections = collections || product.collections
      product.materials = materials || product.materials
      product.gender = gender || product.gender
      product.images = images || product.images
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
      product.tags = tags || product.tags
      product.dimensions = dimensions || product.dimensions
      product.weight = weight || product.weight
      product.sku = sku || product.sku

      // Save the updated product
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!!!')
  }
})

// @router DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
productRoutes.delete('/:id', protect, admin, async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id)
    if (product) {
      // Remove the product from DB
      await product.deleteOne()
      res.json({ message: 'Product removed.' })
    } else {
      res.status(404).send({ message: 'Product not found!' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!!!')
  }
})

// @route GET /api/products
// @route Get all products with optional query filters
// @access Public
productRoutes.get('/', async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit
    } = req.query

    let query = {}

    // Filter logic
    if (collection && collection.toLocaleLowerCase() !== 'all') {
      query.collections = collection
    }

    if (category && category.toLocaleLowerCase() !== 'all') {
      query.category = category
    }

    if (material) {
      query.material = { $in: material.split(',') }
    }

    if (brand) {
      query.brand = { $in: brand.split(',') }
    }

    if (size) {
      query.sizes = { $in: size.split(',') }
    }

    if (color) {
      query.colors = { $in: [color] }
    }

    if (gender) {
      query.gender = gender
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }

    // Sort Logic
    let sort = {}
    if (sortBy) {
      switch (sortBy) {
      case 'priceAsc':
        sort = { price: 1 }
        break
      case 'priceDesc':
        sort = { price: -1 }
        break
      case 'popularity':
        sort = { rating: -1 }
        break
      default:
        break
      }
    }

    // Fetch products and apply sorting and limit
    let products = await Product
      .find(query)
      .sort(sort)
      .limit(Number(limit) || 0)
    res.json(products)

  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!')
  }
})

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
productRoutes.get('/best-seller', async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 })
    if (bestSeller) {
      res.json(bestSeller)
    } else {
      res.status(404).json({ message: 'No best seller found!' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!')
  }
})

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 product - creation date
// @access Public
productRoutes.get('/new-arrivals', async (req, res) => {
  try {
    // Fetch latest 8 products
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
    res.json(newArrivals)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!')
  }
})

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
productRoutes.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not Found!' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!')
  }
})


// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
productRoutes.get('/similar/:id', async (req, res) => {
  const { id } = req.params

  try {
    if (!product) {
      return res.status(404).json({ message: 'Product Not Found!' })
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product ID
      gender: product.gender,
      category: product.category
    }).limit(4)

    res.json(similarProducts)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error!')
  }
})


export default productRoutes
