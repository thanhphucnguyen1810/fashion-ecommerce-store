import React, { useEffect, useState } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import { FaTrash, FaStar } from 'react-icons/fa'

const AdminReviews = () => {
  const theme = useTheme()

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const data = [
        { id: 1, user: 'Alice', rating: 5, comment: 'Excellent!' },
        { id: 2, user: 'Bob', rating: 3, comment: 'Okay service' },
        { id: 3, user: 'Charlie', rating: 4, comment: 'Good fruits' }
      ]
      setReviews(data)
    }
    fetchReviews()
  }, [])

  const deleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(r => r.id !== id))
    }
  }

  return (
    <div className="p-6" style={{ color: theme.palette.text.primary }}>
      <h2 className="text-2xl font-bold mb-4">Review Management</h2>
      <table
        className="w-full border-collapse"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: alpha(theme.palette.grey[500], 0.2)
            }}
          >
            {['ID', 'User', 'Rating', 'Comment', 'Actions'].map((header) => (
              <th
                key={header}
                style={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                  padding: '0.5rem'
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id} className="text-center">
              <td
                style={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  padding: '0.5rem'
                }}
              >
                {review.id}
              </td>
              <td
                style={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  padding: '0.5rem'
                }}
              >
                {review.user}
              </td>
              <td
                style={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  padding: '0.5rem'
                }}
              >
                {review.rating}{' '}
                <FaStar style={{ color: theme.palette.warning.main }} className="inline" />
              </td>
              <td
                style={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  padding: '0.5rem'
                }}
              >
                {review.comment}
              </td>
              <td
                style={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  padding: '0.5rem'
                }}
              >
                <button
                  onClick={() => deleteReview(review.id)}
                  title="Delete review"
                  className="px-3 py-1 rounded flex items-center justify-center mx-auto"
                  style={{
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.error.contrastText
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminReviews
