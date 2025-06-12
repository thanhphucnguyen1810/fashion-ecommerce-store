import React, { useEffect, useState } from 'react'
import { FaTrash, FaStar } from 'react-icons/fa'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])

  // Simulate fetching reviews from API
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Review Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Rating</th>
            <th className="border border-gray-300 p-2">Comment</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id} className="text-center border border-gray-300">
              <td className="border border-gray-300 p-2">{review.id}</td>
              <td className="border border-gray-300 p-2">{review.user}</td>
              <td className="border border-gray-300 p-2">
                {review.rating} <FaStar className="inline text-yellow-400" />
              </td>
              <td className="border border-gray-300 p-2">{review.comment}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="px-3 py-1 rounded bg-red-600 text-white flex items-center justify-center mx-auto"
                  onClick={() => deleteReview(review.id)}
                  title="Delete review"
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
