import React, { useState } from 'react'
import { useTheme, alpha } from '@mui/material/styles'

export default function SystemSettings() {
  const theme = useTheme()

  const [logo, setLogo] = useState(null)
  const [shopName, setShopName] = useState('')
  const [systemEmail, setSystemEmail] = useState('')

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const logoURL = URL.createObjectURL(file)
      setLogo(logoURL)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const settingsData = { logo, shopName, systemEmail }
    console.log('Settings saved:', settingsData)
    alert('Settings saved successfully!')
  }

  return (
    <div
      className="max-w-lg mx-auto mt-16 p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span>⚙️</span> System Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo upload */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="logoUpload"
            className="cursor-pointer px-4 py-2 rounded-md transition"
            style={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.success.contrastText
            }}
          >
            Upload Logo
          </label>
          <input
            id="logoUpload"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />

          {logo ? (
            <img
              src={logo}
              alt="Logo Preview"
              className="w-20 h-20 object-contain rounded-md"
              style={{
                border: `1px solid ${alpha(theme.palette.divider, 0.6)}`
              }}
            />
          ) : (
            <div
              className="w-20 h-20 flex items-center justify-center rounded-md"
              style={{
                backgroundColor: alpha(theme.palette.text.primary, 0.05),
                border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                color: alpha(theme.palette.text.primary, 0.5)
              }}
            >
              No Logo
            </div>
          )}
        </div>

        {/* Shop Name */}
        <div>
          <label htmlFor="shopName" className="block mb-1 font-medium">
            Shop Name
          </label>
          <input
            id="shopName"
            type="text"
            required
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
              outlineColor: theme.palette.success.main
            }}
            placeholder="Enter your shop name"
          />
        </div>

        {/* System Email */}
        <div>
          <label htmlFor="systemEmail" className="block mb-1 font-medium">
            System Email
          </label>
          <input
            id="systemEmail"
            type="email"
            required
            value={systemEmail}
            onChange={(e) => setSystemEmail(e.target.value)}
            className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
              outlineColor: theme.palette.success.main
            }}
            placeholder="Enter system email"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md text-lg font-semibold transition"
          style={{
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText
          }}
        >
          Save Settings
        </button>
      </form>
    </div>
  )
}
