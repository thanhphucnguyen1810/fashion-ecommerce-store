import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const MyOrdersPage = () => {
  const theme = useTheme()
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: '12345',
          createdAt: new Date(),
          shippingAddress: { city: 'New York', country: 'USA' },
          orderItems: [{ name: 'Product 1', image: 'https://picsum.photos/500/500?random=1' }],
          totalPrice: 100,
          isPaid: true
        },
        {
          _id: '67890',
          createdAt: new Date(),
          shippingAddress: { city: 'London', country: 'UK' },
          orderItems: [{ name: 'Product 2', image: 'https://picsum.photos/500/500?random=2' }],
          totalPrice: 150,
          isPaid: true
        },
        {
          _id: '34567',
          createdAt: new Date(),
          shippingAddress: { city: 'Paris', country: 'France' },
          orderItems: [{ name: 'Product 3', image: 'https://picsum.photos/500/500?random=3' }],
          totalPrice: 300,
          isPaid: false
        }
      ]
      setOrders(mockOrders)
    }, 1000)
  }, [])

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2
        className="text-xl sm:text-2xl font-bold mb-6"
        style={{ color: theme.palette.text.primary }}
      >
      My Orders
      </h2>

      <div
        className="relative shadow-md sm:rounded-lg overflow-hidden"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <table className="min-w-full text-left">
          <thead
            className="text-xs uppercase"
            style={{
              backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[200],
              color: theme.palette.text.primary
            }}
          >
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50"
                  style={{
                    borderColor: theme.palette.divider,
                    backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.background.default
                      : 'white',
                    color: theme.palette.text.primary
                  }}
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>

                  <td
                    className="py-2 px-2 sm:py-4 sm:px-4 font-medium whitespace-nowrap"
                    style={{ color: theme.palette.text.primary }}
                  >
                  #{order._id}
                  </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span style={{ color: theme.palette.text.secondary }}>
                      {new Date(order.createdAt).toLocaleDateString()}{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : 'N/A'}
                  </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">{order.orderItems.length}</td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">${order.totalPrice}</td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className="px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
                      style={{
                        backgroundColor: order.isPaid
                          ? theme.palette.success.light
                          : theme.palette.error.light,
                        color: order.isPaid
                          ? theme.palette.success.lighter
                          : theme.palette.error.lighter
                      }}
                    >
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-4 text-center"
                  style={{ color: theme.palette.text.secondary }}
                >
                You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default MyOrdersPage
