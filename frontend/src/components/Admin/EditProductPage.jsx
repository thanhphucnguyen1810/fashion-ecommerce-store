/* eslint-disable no-console */
import { useState } from 'react'

// Input Field Component
const InputField = ({ label, name, type = 'text', value, onChange, required }) => (
  <div className="mb-6">
    <label className="block font-semibold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2"
      required={required}
    />
  </div>
)

// TextArea Field Component
const TextAreaField = ({ label, name, value, onChange, required }) => (
  <div className="mb-6">
    <label className="block font-semibold mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2"
      rows={4}
      required={required}
    />
  </div>
)

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: '',
    images: [
      { url: 'https://picsum.photo/150?random=1' },
      { url: 'https://picsum.photo/150?random=2' }
    ]
  })

  // General field updater
  const updateProductField = (name, value) => {
    setProductData(prev => ({ ...prev, [name]: value }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    updateProductField(name, value)
  }

  const handleSizesChange = (e) => {
    const sizes = e.target.value.split(',').map(s => s.trim())
    updateProductField('sizes', sizes)
  }

  const handleColorsChange = (e) => {
    const colors = e.target.value.split(',').map(c => c.trim())
    updateProductField('colors', colors)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    console.log(file)
    // TODO: Add upload logic here
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(productData)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />

        <TextAreaField
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
        />

        <InputField
          label="Count in Stock"
          name="countInStock"
          type="number"
          value={productData.countInStock}
          onChange={handleChange}
        />

        <InputField
          label="SKU"
          name="sku"
          value={productData.sku}
          onChange={handleChange}
        />

        <InputField
          label="Sizes (comma-separated)"
          name="sizes"
          value={productData.sizes.join(', ')}
          onChange={handleSizesChange}
        />

        <InputField
          label="Colors (comma-separated)"
          name="colors"
          value={productData.colors.join(', ')}
          onChange={handleColorsChange}
        />

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || 'Product Image'}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProductPage
