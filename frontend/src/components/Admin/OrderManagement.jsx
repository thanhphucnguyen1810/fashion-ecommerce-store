import { useTheme, alpha } from '@mui/material/styles'
import React, { useState } from 'react'
import { FaTimes, FaUser, FaMoneyBillWave, FaTruck, FaHome, FaBox, FaReceipt } from 'react-icons/fa'


const ORDER_STATUSES = [
  { value: 'Pending Payment', label: 'Pending Payment', color: 'bg-yellow-300 text-yellow-900' },
  { value: 'Processing', label: 'Processing', color: 'bg-blue-300 text-blue-900' },
  { value: 'Packing', label: 'Packing', color: 'bg-indigo-300 text-indigo-900' },
  { value: 'Shipped', label: 'Shipped', color: 'bg-purple-300 text-purple-900' },
  { value: 'Out for Delivery', label: 'Out for Delivery', color: 'bg-pink-300 text-pink-900' },
  { value: 'Delivered', label: 'Delivered', color: 'bg-green-300 text-green-900' },
  { value: 'Cancelled', label: 'Cancelled', color: 'bg-red-300 text-red-900' }
]

const MOCK_ORDERS = [
  {
    _id: 12345,
    user: { name: 'John Doe' },
    totalPrice: 120,
    status: 'Processing',
    createdAt: '2025-06-07',
    paymentMethod: 'Credit Card',
    address: '123 Main St, City',
    items: [
      { id: 1, name: 'Product A', quantity: 2, price: 30 },
      { id: 2, name: 'Product B', quantity: 1, price: 60 }
    ]
  },
  {
    _id: 12346,
    user: { name: 'Jane Smith' },
    totalPrice: 200,
    status: 'Pending Payment',
    createdAt: '2025-06-06',
    paymentMethod: 'COD',
    address: '456 Other Rd, City',
    items: [
      { id: 3, name: 'Product C', quantity: 4, price: 50 }
    ]
  }
  // ... Add more mock orders for pagination testing
]

const ITEMS_PER_PAGE = 5

const OrderManagement = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS) // Replace MOCK_ORDERS with API fetch later
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('createdAt_desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const theme = useTheme()
  // Filter + search
  const filteredOrders = orders
    .filter(order =>
      (order._id.toString().includes(searchTerm) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      && (filterStatus ? order.status === filterStatus : true)
    )

  // Sort
  filteredOrders.sort((a, b) => {
    if (sortBy === 'createdAt_desc') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'createdAt_asc') return new Date(a.createdAt) - new Date(b.createdAt)
    if (sortBy === 'totalPrice_desc') return b.totalPrice - a.totalPrice
    if (sortBy === 'totalPrice_asc') return a.totalPrice - b.totalPrice
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleStatusChange = (orderId, newStatus) => {
    alert(`Update order #${orderId} status to "${newStatus}"`)
    // TODO: Call backend API to update order status
    setOrders(prev =>
      prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  const handleCancelOrder = (orderId) => {
    if (!window.confirm(`Are you sure you want to cancel order #${orderId}?`)) return
    alert(`Order #${orderId} has been cancelled`)
    // TODO: Call backend API to cancel order
    setOrders(prev =>
      prev.map(o => (o._id === orderId ? { ...o, status: 'Cancelled' } : o))
    )
  }

  const openOrderDetail = (order) => {
    setSelectedOrder(order)
    setShowDetailModal(true)
  }

  const closeOrderDetail = () => {
    setSelectedOrder(null)
    setShowDetailModal(false)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>

      {/* Search - Filter - Sort */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by ID or customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderColor: alpha(theme.palette.text.primary, 0.3)
          }}
        >
          <option value="">All statuses</option>
          {ORDER_STATUSES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderColor: alpha(theme.palette.text.primary, 0.3)
          }}
        >
          <option value="createdAt_desc">Newest</option>
          <option value="createdAt_asc">Oldest</option>
          <option value="totalPrice_desc">Price high to low</option>
          <option value="totalPrice_asc">Price low to high</option>
        </select>
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created At</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">Delivery Address</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => {
                const statusObj = ORDER_STATUSES.find(s => s.value === order.status) || {}
                return (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium whitespace-nowrap cursor-pointer text-blue-600 hover:underline"
                      onClick={() => openOrderDetail(order)}>
                      #{order._id}
                    </td>
                    <td className="py-4 px-4">{order.user.name}</td>
                    <td className="py-4 px-4">{order.totalPrice.toLocaleString()} đ</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusObj.color || 'bg-gray-300 text-gray-700'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">{order.createdAt}</td>
                    <td className="py-4 px-4">{order.paymentMethod}</td>
                    <td className="py-4 px-4">{order.address}</td>
                    <td className="py-4 px-4 flex gap-2 flex-wrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1"
                      >
                        {ORDER_STATUSES.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => openOrderDetail(order)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-3">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/90 bg-opacity-20 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 relative transition-all">

            {/* Close Button */}
            <button
              onClick={closeOrderDetail}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close details"
            >
              <FaTimes />
            </button>

            {/* Header */}
            <div className="mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaReceipt /> Order #{selectedOrder._id}
              </h3>
              <p className="text-sm text-gray-500">Placed on: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaUser className="text-gray-500" /> <span className="font-medium">Customer:</span> {selectedOrder.user.name}
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" /> <span className="font-medium">Payment:</span> {selectedOrder.paymentMethod}
              </p>
              <p className="flex items-center gap-2">
                <FaTruck className="text-yellow-600" /> <span className="font-medium">Status:</span> {selectedOrder.status}
              </p>
              <p className="flex items-center gap-2">
                <FaHome className="text-blue-500" /> <span className="font-medium">Address:</span> {selectedOrder.address}
              </p>
            </div>

            {/* Items */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaBox /> Items
              </h4>
              <ul className="divide-y divide-gray-100">
                {selectedOrder.items.map((item) => (
                  <li key={item.id} className="py-2 text-gray-700 flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">{item.price.toLocaleString()} đ</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="mt-6 text-right">
              <p className="text-xl font-bold text-gray-900">
                <FaMoneyBillWave className="inline mr-1 text-green-600" /> Total: {selectedOrder.totalPrice.toLocaleString()} đ
              </p>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default OrderManagement
