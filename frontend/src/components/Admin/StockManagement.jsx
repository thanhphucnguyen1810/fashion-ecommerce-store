import React, { useState } from 'react'
import { useTheme, alpha } from '@mui/material/styles'

const initialProducts = [
  { id: 1, name: 'Men\'s T-Shirt', stockQuantity: 20, stockThreshold: 5 },
  { id: 2, name: 'Women\'s Jeans', stockQuantity: 4, stockThreshold: 5 },
  { id: 3, name: 'Leather Jacket', stockQuantity: 0, stockThreshold: 5 }
]

const StockManagement = () => {
  const theme = useTheme()
  const [products, setProducts] = useState(initialProducts)

  const updateStock = (id, newQuantity) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, stockQuantity: newQuantity } : p
    ))
    // TODO: Call backend API to update stock quantity
  }

  return (
    <div className="max-w-4xl mx-auto p-6" style={{ color: theme.palette.text.primary }}>
      <h2 className="text-3xl font-bold mb-6">Stock Management</h2>

      <table
        className="w-full border rounded shadow-sm"
        style={{
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <thead
          style={{
            backgroundColor: alpha(theme.palette.grey[500], 0.1)
          }}
        >
          <tr>
            {['Product', 'Stock Quantity', 'Alert', 'Update'].map((title) => (
              <th
                key={title}
                className="p-3 text-left"
                style={{
                  border: `1px solid ${theme.palette.divider}`,
                  textAlign: title === 'Product' ? 'left' : 'center'
                }}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map(({ id, name, stockQuantity, stockThreshold }) => {
            const isLowStock = stockQuantity <= stockThreshold
            return (
              <tr key={id}>
                <td
                  className="p-3"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {name}
                </td>
                <td
                  className="p-3 text-center"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {stockQuantity}
                </td>
                <td
                  className="p-3 text-center"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {isLowStock ? (
                    <span style={{ color: theme.palette.error.main, fontWeight: 600 }}>
                      Low Stock!
                    </span>
                  ) : (
                    <span style={{ color: theme.palette.success.main }}>In Stock</span>
                  )}
                </td>
                <td
                  className="p-3 text-center"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  <input
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={e => updateStock(id, Number(e.target.value))}
                    className="rounded px-2 py-1 w-20 text-center"
                    style={{
                      border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary
                    }}
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
