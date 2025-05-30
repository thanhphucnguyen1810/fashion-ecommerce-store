import { useSearchParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const theme = useTheme()

  const handleSortChange = (e) => {
    const sortBy = e.target.value
    searchParams.set('sortBy', sortBy)
    setSearchParams(searchParams)
  }

  return (
    <div
      className="mb-6 flex items-center justify-end"
      style={{ color: theme.palette.text.primary }}
    >
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get('sortBy') || ''}
        className="rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{
          border: `1.5px solid ${theme.palette.grey[300]}`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary
        }}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="nameAsc">Name: A to Z</option>
        <option value="nameDesc">Name: Z to A</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOptions
