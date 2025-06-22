/* eslint-disable no-console */
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

// Input Field Component
const InputField = ({ label, name, type = 'text', value, onChange, required, inputStyle }) => (
  <div className="mb-6">
    <label className="block font-semibold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border px-3 py-2 ${inputStyle}`}
      required={required}
    />
  </div>
)

// TextArea Field Component
const TextAreaField = ({ label, name, value, onChange, required, inputStyle }) => (
  <div className="mb-6">
    <label className="block font-semibold mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border px-3 py-2 ${inputStyle}`}
      rows={4}
      required={required}
    />
  </div>
)

const EditProductPage = () => {
  const theme = useTheme()

  // sử dụng màu từ palette
  const baseBg = theme.palette.background.paper
  const textColor = theme.palette.text.primary
  const borderColor = theme.palette.grey[300]
  const inputStyle = `bg-transparent border-[1px] text-sm text-[${textColor}] border-[${borderColor}] placeholder-gray-500`

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
    // console.log(productData)
  }

  return (
    <div
      className="max-w-5xl mx-auto p-6 shadow-md rounded-md"
      style={{ backgroundColor: baseBg, color: textColor }}
    >
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
          inputStyle={inputStyle}
        />

        <TextAreaField
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
          inputStyle={inputStyle}
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          inputStyle={inputStyle}
        />

        <InputField
          label="Count in Stock"
          name="countInStock"
          type="number"
          value={productData.countInStock}
          onChange={handleChange}
          inputStyle={inputStyle}
        />

        <InputField
          label="SKU"
          name="sku"
          value={productData.sku}
          onChange={handleChange}
          inputStyle={inputStyle}
        />

        <InputField
          label="Sizes (comma-separated)"
          name="sizes"
          value={productData.sizes.join(', ')}
          onChange={handleSizesChange}
          inputStyle={inputStyle}
        />

        <InputField
          label="Colors (comma-separated)"
          name="colors"
          value={productData.colors.join(', ')}
          onChange={handleColorsChange}
          inputStyle={inputStyle}
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
          style={{
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText
          }}
          className="w-full py-3 rounded-md transition-opacity hover:opacity-90"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProductPage
