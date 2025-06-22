import { useState } from 'react'
import { useTheme, alpha } from '@mui/material/styles'

const UserManagement = () => {
  const theme = useTheme()

  const [users, setUsers] = useState([
    {
      _id: 12345,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    }
  ])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [message, setMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      _id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role
    }

    setUsers(prev => [...prev, newUser])
    setMessage('User added successfully!')

    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer'
    })

    setTimeout(() => setMessage(''), 3000)
  }

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map(user =>
      user._id === userId ? { ...user, role: newRole } : user
    )
    setUsers(updatedUsers)
    setMessage('User role updated!')
    setTimeout(() => setMessage(''), 2000)
  }

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?')
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user._id !== userId)
      setUsers(updatedUsers)
      setMessage('User deleted!')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (roleFilter === '' || user.role === roleFilter)
  )

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  )

  const inputClass = `w-full p-2 border rounded bg-transparent text-[${theme.palette.text.primary}] border-[${alpha(theme.palette.text.primary, 0.3)}]`
  const labelClass = 'block mb-1'

  return (
    <div
      className="max-w-7xl mx-auto p-6"
      style={{ color: theme.palette.text.primary }}
    >
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {message && (
        <div
          className="mb-4 p-2 border rounded"
          style={{
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            color: theme.palette.success.main,
            borderColor: alpha(theme.palette.success.main, 0.4)
          }}
        >
          {message}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderColor: alpha(theme.palette.text.primary, 0.3)
          }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderColor: alpha(theme.palette.text.primary, 0.3)
          }}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      <section
        className="p-6 rounded-lg border mb-8"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputClass}
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderColor: alpha(theme.palette.text.primary, 0.3)
              }}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="py-2 px-4 rounded hover:opacity-90"
            style={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.success.contrastText
            }}
          >
            Add User
          </button>
        </form>
      </section>

      <section className="overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className="min-w-full text-left"
          style={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.paper }}
        >
          <thead
            className="text-xs uppercase"
            style={{ backgroundColor: alpha(theme.palette.grey[500], 0.2) }}
          >
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b"
                style={{ borderBottomColor: alpha(theme.palette.divider, 0.2) }}
              >
                <td className="p-4 font-medium whitespace-nowrap">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className={inputClass}
                    style={{
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      borderColor: alpha(theme.palette.text.primary, 0.3)
                    }}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-4 py-2 rounded hover:opacity-90"
                    style={{
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.error.contrastText
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
          style={{ backgroundColor: theme.palette.action.hover }}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
          style={{ backgroundColor: theme.palette.action.hover }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UserManagement
