import React, { useState } from 'react'

export default function SystemSettings() {
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
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span>⚙️</span> System Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo upload */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="logoUpload"
            className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
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
              className="w-20 h-20 object-contain rounded-md border border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md border border-gray-300 text-gray-400">
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
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter system email"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  )
}
