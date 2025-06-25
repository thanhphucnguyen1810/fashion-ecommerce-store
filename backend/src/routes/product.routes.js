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

export default productRoutes
