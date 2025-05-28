/* eslint-disable no-console */
import { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { useTheme } from '@mui/material/styles'

const SearchBar = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSearchToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search term: ', searchTerm)
    setIsOpen(false)
  }

  const primary = theme.palette.primary.main
  const primaryDark = theme.palette.primary.dark
  const ringColor = isDark ? 'focus:ring-blue-400' : 'focus:ring-[#0F4C81]'

  return (
    <div
      className={`transition-all duration-300 ${
        isOpen
          ? `${
            isDark ? 'bg-slate-900' : 'bg-white'
          } absolute top-0 left-0 w-full h-24 shadow-md z-50 flex items-center px-6`
          : 'w-auto'
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative w-full max-w-3xl mx-auto flex items-center"
        >
          {/* Input */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full py-3 px-5 pr-12 rounded-full shadow-inner focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-slate-800 text-slate-100 placeholder:text-slate-400 focus:ring-blue-400'
                : `bg-gray-100 text-[${primaryDark}] placeholder:text-gray-600 ${ringColor}`
            }`}
          />

          {/* Search icon */}
          <button
            type="submit"
            className="absolute right-12 top-1/2 transform -translate-y-1/2 transition"
            style={{
              color: isDark ? theme.palette.info.light : primary
            }}
            title="Search"
          >
            <HiMagnifyingGlass className="w-6 h-6" />
          </button>

          {/* Close icon */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 transition"
            style={{
              color: isDark ? theme.palette.grey[400] : theme.palette.grey[600]
            }}
            onMouseEnter={(e) => {
              e.target.style.color = isDark
                ? theme.palette.error.light
                : theme.palette.error.main
            }}
            onMouseLeave={(e) => {
              e.target.style.color = isDark
                ? theme.palette.grey[400]
                : theme.palette.grey[600]
            }}
            title="Close"
          >
            <HiMiniXMark className="w-6 h-6" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="transition"
          style={{
            color: isDark ? theme.palette.info.light : primary
          }}
          title="Search"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
