/* eslint-disable no-console */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const ProductManagement = () => {
  const theme = useTheme()

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sku: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Send request to backend to add new product
    console.log('Submitting new product:', formData)
    setFormData({ name: '', price: '', sku: '' })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      // TODO: Send request to backend to delete product by ID
      console.log('Deleting product with ID:', id)
    }
  }

  const products = [
    { _id: 1, name: 'Shift', price: 110, sku: '123456789' },
    { _id: 2, name: 'Apple', price: 80, sku: '987654321' }
    // TODO: Product data should come from backend
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      {/* Add New Product Form */}
      <div
        className="border p-6 mb-8 rounded-lg shadow-sm"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary
        }}
      >
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              className="px-4 py-2 mt-2 rounded hover:opacity-90"
              style={{
                backgroundColor: theme.palette.success.main,
                color: theme.palette.success.contrastText
              }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg"
        style={{ backgroundColor: theme.palette.background.paper }}>
        <table className="min-w-full text-left" style={{ color: theme.palette.text.primary }}>
          <thead style={{ backgroundColor: theme.palette.grey[200] }} className="text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:opacity-80">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4 flex gap-2">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="px-3 py-1 rounded"
                      style={{
                        backgroundColor: theme.palette.warning.main,
                        color: theme.palette.warning.contrastText
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 rounded"
                      style={{
                        backgroundColor: theme.palette.error.main,
                        color: theme.palette.error.contrastText
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductManagement


/**
Lấy danh sách sản phẩm	GET /api/products
Thêm sản phẩm mới	POST /api/products
Xoá sản phẩm	DELETE /api/products/:id
Sửa sản phẩm	PUT /api/products/:id
 */