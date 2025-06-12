import React, { useState } from 'react'

const initialProducts = [
  { id: 1, name: 'Men\'s T-Shirt', stockQuantity: 20, stockThreshold: 5 },
  { id: 2, name: 'Women\'s Jeans', stockQuantity: 4, stockThreshold: 5 },
  { id: 3, name: 'Leather Jacket', stockQuantity: 0, stockThreshold: 5 }
]

const StockManagement = () => {
  const [products, setProducts] = useState(initialProducts)

  const updateStock = (id, newQuantity) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, stockQuantity: newQuantity } : p
    ))
    // TODO: Call backend API to update stock quantity
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Stock Management</h2>

      <table className="w-full border border-gray-300 rounded shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300 text-left">Product</th>
            <th className="p-3 border border-gray-300 text-center">Stock Quantity</th>
            <th className="p-3 border border-gray-300 text-center">Alert</th>
            <th className="p-3 border border-gray-300 text-center">Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, stockQuantity, stockThreshold }) => {
            const isLowStock = stockQuantity <= stockThreshold
            return (
              <tr key={id} className="border border-gray-300">
                <td className="p-3">{name}</td>
                <td className="p-3 text-center">{stockQuantity}</td>
                <td className="p-3 text-center">
                  {isLowStock ? (
                    <span className="text-red-600 font-semibold">Low Stock!</span>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <input
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={e => updateStock(id, Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StockManagement
