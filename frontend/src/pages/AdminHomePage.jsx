import { Link } from 'react-router-dom'

// Format currency
const formatCurrency = (value) => `$${value.toLocaleString()}`

// Reusable Card component
const StatCard = ({ title, value, link, linkText }) => (
  <div className="p-4 shadow-md rounded-lg bg-white">
    <h2 className="text-xl font-semibold mb-1">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
    {link && linkText && (
      <Link to={link} className="text-blue-500 hover:underline text-sm mt-2 inline-block">
        {linkText}
      </Link>
    )}
  </div>
)

const AdminHomePage = () => {
  const orders = [
    {
      _id: 12345,
      user: { name: 'John Doe' },
      totalPrice: 120,
      status: 'Processing'
    },
    {
      _id: 54321,
      user: { name: 'Doe Mary' },
      totalPrice: 330,
      status: 'Processing'
    },
    {
      _id: 32451,
      user: { name: 'John Stack' },
      totalPrice: 200,
      status: 'Processing'
    }
  ]

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Revenue" value={formatCurrency(totalRevenue)} />
        <StatCard
          title="Total Orders"
          value={orders.length}
          link="/admin/orders"
          linkText="Manage Orders"
        />
        <StatCard
          title="Total Products"
          value={100}
          link="/admin/products"
          linkText="Manage Products"
        />
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto rounded-md shadow">
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">{formatCurrency(order.totalPrice)}</td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage
