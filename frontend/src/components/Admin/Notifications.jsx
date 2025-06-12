import React, { useState, useEffect } from 'react'

const notificationsData = [
  {
    id: 1,
    type: 'order',
    message: 'New order received: #12345',
    time: '5 minutes ago'
  },
  {
    id: 2,
    type: 'stock',
    message: 'Product \'Blue Denim Jacket\' is running low in stock.',
    time: '15 minutes ago'
  },
  {
    id: 3,
    type: 'user',
    message: 'New user registered: john.doe@example.com',
    time: '30 minutes ago'
  },
  {
    id: 4,
    type: 'order',
    message: 'Order #12344 has been shipped.',
    time: '1 hour ago'
  }
]

// Icon component for notification type
function NotificationIcon({ type }) {
  switch (type) {
  case 'order':
    return (
      <svg
        className="w-6 h-6 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h10M9 21h6"></path>
      </svg>
    )
  case 'stock':
    return (
      <svg
        className="w-6 h-6 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  case 'user':
    return (
      <svg
        className="w-6 h-6 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A7.966 7.966 0 0112 15a7.966 7.966 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    )
  default:
    return null
  }
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData)

  // TODO: Ở đây có thể thêm useEffect gọi API backend lấy notifications thực tế
  // useEffect(() => {
  //   fetch('/api/notifications')
  //     .then(res => res.json())
  //     .then(data => setNotifications(data))
  //     .catch(err => console.error(err))
  // }, [])

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span role="img" aria-label="bell">
          🛎
        </span>{' '}
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications.map(({ id, type, message, time }) => (
            <li
              key={id}
              className="flex items-center gap-4 py-4 hover:bg-gray-50 rounded-md transition cursor-pointer"
            >
              <NotificationIcon type={type} />
              <div>
                <p className="text-gray-800 font-medium">{message}</p>
                <p className="text-gray-400 text-sm">{time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
