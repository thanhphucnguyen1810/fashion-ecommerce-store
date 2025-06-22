import React, { useState } from 'react'
import { useTheme, alpha } from '@mui/material/styles'

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
  const theme = useTheme()
  const colorMap = {
    order: theme.palette.success.main,
    stock: theme.palette.warning.main,
    user: theme.palette.info.main
  }

  const iconPaths = {
    order: 'M3 10h18M7 15h10M9 21h6',
    stock: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    user: 'M5.121 17.804A7.966 7.966 0 0112 15a7.966 7.966 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z'
  }

  return (
    <svg
      className="w-6 h-6 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      style={{ color: colorMap[type] || theme.palette.text.primary }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[type]} />
    </svg>
  )
}

export default function Notifications() {
  const theme = useTheme()
  const [notifications, setNotifications] = useState(notificationsData)

  // TODO: Ở đây có thể thêm useEffect gọi API backend lấy notifications thực tế
  // useEffect(() => {
  //   fetch('/api/notifications')
  //     .then(res => res.json())
  //     .then(data => setNotifications(data))
  //     .catch(err => console.error(err))
  // }, [])

  return (
    <div
      className="max-w-xl mx-auto mt-12 p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span role="img" aria-label="bell">🛎</span> Notifications
      </h2>

      {notifications.length === 0 ? (
        <p style={{ color: theme.palette.text.secondary }}>No notifications.</p>
      ) : (
        <ul>
          {notifications.map(({ id, type, message, time }, index) => (
            <li
              key={id}
              className="flex items-center gap-4 py-4 transition cursor-pointer rounded-md"
              style={{
                borderBottom:
                  index !== notifications.length - 1
                    ? `1px solid ${alpha(theme.palette.divider, 0.6)}`
                    : 'none',
                backgroundColor: 'transparent',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.action.hover, 0.2)
                }
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = alpha(
                  theme.palette.action.hover,
                  0.12
                ))
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              <NotificationIcon type={type} />
              <div>
                <p
                  style={{
                    color: theme.palette.text.primary,
                    fontWeight: 500
                  }}
                >
                  {message}
                </p>
                <p style={{ color: theme.palette.text.secondary, fontSize: '0.875rem' }}>
                  {time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


