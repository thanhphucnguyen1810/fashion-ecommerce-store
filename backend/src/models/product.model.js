import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    time: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  disCountPrice: {
    type: Number
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  sizes: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  collections: {
    type: String,
    required: true
  },
  material: {
    type: String
  },
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex']
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      altText: {
        type: String
      }
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  metaKeywords: {
    type: String
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  weight: Number
},
{ timestamps: true }
)

export default mongoose.model('Product', productSchema)
