import React, { useState } from 'react'
import { FaTrash, FaPlus } from 'react-icons/fa'
import { useTheme } from '@mui/material/styles'

const AdminDiscountCodes = () => {
  const theme = useTheme()

  const [codes, setCodes] = useState([
    {
      id: 1,
      code: 'SAVE10',
      type: 'percent',
      discount: 10,
      minOrder: 0,
      startDate: '2025-06-01',
      endDate: '2025-06-30',
      useForAll: true,
      allowedUsers: [],
      description: 'Save 10% on orders'
    },
    {
      id: 2,
      code: 'FREESHIP',
      type: 'amount',
      discount: 0,
      minOrder: 100,
      startDate: '2025-06-05',
      endDate: '2025-07-05',
      useForAll: true,
      allowedUsers: [],
      description: 'Free shipping on orders over 100'
    }
  ])

  const [newCode, setNewCode] = useState('')
  const [newType, setNewType] = useState('percent')
  const [newDiscount, setNewDiscount] = useState('')
  const [newMinOrder, setNewMinOrder] = useState('')
  const [newStartDate, setNewStartDate] = useState('')
  const [newEndDate, setNewEndDate] = useState('')
  const [useForAll, setUseForAll] = useState(true)
  const [allowedUsers, setAllowedUsers] = useState('')
  const [newDesc, setNewDesc] = useState('')

  // TODO: useEffect gọi API backend để load danh sách mã giảm giá khi component mount
  // useEffect(() => {
  //   fetch('/api/discount-codes')
  //     .then(res => res.json())
  //     .then(data => setCodes(data))
  //     .catch(err => console.error('Failed to load discount codes', err))
  // }, [])

  const addCode = () => {
    if (!newCode.trim()) return alert('Please enter discount code')
    if (newDiscount === '' || isNaN(newDiscount)) return alert('Please enter valid discount value')
    if (!newStartDate || !newEndDate) return alert('Please select start and end dates')
    if (newEndDate < newStartDate) return alert('End date must be after start date')
    if (!useForAll && !allowedUsers.trim()) return alert('Please enter allowed user emails or select "All users"')

    // TODO: Gọi API backend để tạo mới mã giảm giá
    /*
    fetch('/api/discount-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: newCode.toUpperCase(),
        type: newType,
        discount: Number(newDiscount),
        minOrder: Number(newMinOrder) || 0,
        startDate: newStartDate,
        endDate: newEndDate,
        useForAll,
        allowedUsers: allowedUsers
          .split(',')
          .map(email => email.trim())
          .filter(email => email.length > 0),
        description: newDesc
      })
    })
      .then(res => res.json())
      .then(newCodeFromServer => {
        setCodes([...codes, newCodeFromServer]) // Thêm mã mới do server trả về
      })
      .catch(err => alert('Failed to add discount code'))
    */

    const id = codes.length ? codes[codes.length - 1].id + 1 : 1
    setCodes([
      ...codes,
      {
        id,
        code: newCode.toUpperCase(),
        type: newType,
        discount: Number(newDiscount),
        minOrder: Number(newMinOrder) || 0,
        startDate: newStartDate,
        endDate: newEndDate,
        useForAll,
        allowedUsers: allowedUsers
          .split(',')
          .map(email => email.trim())
          .filter(email => email.length > 0),
        description: newDesc
      }
    ])

    setNewCode('')
    setNewType('percent')
    setNewDiscount('')
    setNewMinOrder('')
    setNewStartDate('')
    setNewEndDate('')
    setUseForAll(true)
    setAllowedUsers('')
    setNewDesc('')
  }

  const deleteCode = (id) => {
    if (window.confirm('Are you sure you want to delete this discount code?')) {
      // TODO: Gọi API backend để xoá mã giảm giá
      // fetch(/api/discount-codes/${id}, { method: 'DELETE' })
      //   .then(res => {
      //     if (res.ok) setCodes(codes.filter(c => c.id !== id))
      //     else alert('Failed to delete discount code')
      //   })
      //   .catch(() => alert('Failed to delete discount code'))
      setCodes(codes.filter(c => c.id !== id))
    }
  }

  const inputStyle = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`
  }

  return (
    <div className="p-6 max-w-5xl mx-auto" style={{ color: theme.palette.text.primary }}>
      <h2 className="text-3xl font-bold mb-6 text-center">Discount Codes Management</h2>

      <div
        className="rounded p-6 mb-10 shadow-md"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <h3 className="text-xl font-semibold mb-4">Create New Discount Code</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Discount Code *</label>
            <input
              type="text"
              value={newCode}
              onChange={e => setNewCode(e.target.value.toUpperCase())}
              className="w-full rounded px-3 py-2"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Discount Type *</label>
            <select
              value={newType}
              onChange={e => setNewType(e.target.value)}
              className="w-full rounded px-3 py-2"
              style={inputStyle}
            >
              <option value="percent">Percentage (%)</option>
              <option value="amount">Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Discount Value *</label>
            <input
              type="number"
              value={newDiscount}
              onChange={e => setNewDiscount(e.target.value)}
              className="w-full rounded px-3 py-2"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Minimum Order Amount</label>
            <input
              type="number"
              value={newMinOrder}
              onChange={e => setNewMinOrder(e.target.value)}
              className="w-full rounded px-3 py-2"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Start Date *</label>
            <input
              type="date"
              value={newStartDate}
              onChange={e => setNewStartDate(e.target.value)}
              className="w-full rounded px-3 py-2"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">End Date *</label>
            <input
              type="date"
              value={newEndDate}
              onChange={e => setNewEndDate(e.target.value)}
              className="w-full rounded px-3 py-2"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Who can use this code? *</label>
          <div className="flex items-center space-x-6 mb-2">
            <label className="inline-flex items-center">
              <input type="radio" checked={useForAll} onChange={() => setUseForAll(true)} className="mr-2" />
              All users
            </label>
            <label className="inline-flex items-center">
              <input type="radio" checked={!useForAll} onChange={() => setUseForAll(false)} className="mr-2" />
              Specific users
            </label>
          </div>
          {!useForAll && (
            <textarea
              value={allowedUsers}
              onChange={e => setAllowedUsers(e.target.value)}
              className="w-full rounded px-3 py-2"
              rows={3}
              style={inputStyle}
            />
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            className="w-full rounded px-3 py-2"
            rows={2}
            style={inputStyle}
          />
        </div>

        <button
          onClick={addCode}
          className="w-full text-white font-semibold py-3 rounded transition-colors"
          style={{ backgroundColor: theme.palette.success.main }}
        >
          <FaPlus className="inline mr-2" /> Add Discount Code
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse shadow-sm text-sm" style={{ color: theme.palette.text.primary }}>
          <thead style={{ backgroundColor: theme.palette.background.neutral }}>
            <tr>
              {['ID', 'Code', 'Type', 'Discount', 'Min Order', 'Start Date', 'End Date', 'Users Allowed', 'Description', 'Actions'].map((header) => (
                <th key={header} className="border p-3 text-center" style={{ borderColor: theme.palette.divider }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.length === 0 ? (
              <tr>
                <td colSpan="10" className="p-6 text-center" style={{ color: theme.palette.text.secondary }}>
                  No discount codes available
                </td>
              </tr>
            ) : (
              codes.map(({ id, code, type, discount, minOrder, startDate, endDate, useForAll, allowedUsers, description }) => (
                <tr key={id} style={{ backgroundColor: theme.palette.background.paper }}>
                  {[id, code, type === 'percent' ? 'Percentage (%)' : 'Fixed Amount', discount, minOrder, startDate, endDate, useForAll ? 'All users' : allowedUsers.join(', '), description].map((val, i) => (
                    <td key={i} className="border p-2 text-center" style={{ borderColor: theme.palette.divider }}>
                      {val}
                    </td>
                  ))}
                  <td className="border p-2 text-center" style={{ borderColor: theme.palette.divider }}>
                    <button
                      onClick={() => deleteCode(id)}
                      style={{ color: theme.palette.error.main }}
                      title="Delete this discount code"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDiscountCodes
