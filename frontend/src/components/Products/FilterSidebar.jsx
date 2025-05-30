import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const theme = useTheme()

  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100
  })

  const [priceRange, setPriceRange] = useState([0, 100])

  const categories = ['Top Wear', 'Bottom Wear']
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Gray', 'White', 'Pink', 'Beige', 'Navy']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const materials = ['Cotton', 'Wool', 'Denim', 'Polyester', 'Silk', 'Linen', 'Viscose', 'Fleece']
  const brands = ['Urban Threads', 'Modern Fit', 'Street Style', 'Beach Breeze', 'Fashionista', 'ChicStyle']
  const genders = ['Men', 'Women']

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    setFilters({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100
    })
    setPriceRange([0, Number(params.maxPrice) || 100])
  }, [searchParams])

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target
    const newFilters = { ...filters }

    if (type === 'checkbox') {
      newFilters[name] = checked
        ? [...(newFilters[name] || []), value]
        : newFilters[name].filter((item) => item !== value)
    } else {
      newFilters[name] = value
    }

    setFilters(newFilters)
    updateURLParams(newFilters)
  }

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams()
    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key]
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(','))
      } else if (value && value !== '') {
        params.append(key, value.toString())
      }
    })
    setSearchParams(params)
    navigate(`?${params.toString()}`)
  }

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value)
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice }
    setPriceRange([0, newPrice])
    setFilters(newFilters)
    updateURLParams(newFilters)
  }

  const clearFilters = () => {
    const reset = {
      category: '',
      gender: '',
      color: '',
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100
    }
    setFilters(reset)
    setPriceRange([0, 100])
    setSearchParams({})
    navigate('?')
  }

  const labelStyle = 'font-medium mb-2'
  const checkboxStyle = 'mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400'

  return (
    <div className='p-4' style={{ backgroundColor: theme.palette.background.paper }}>
      <h3 className='text-xl font-medium mb-4' style={{ color: theme.palette.text.primary }}>Filter</h3>

      {/* Category */}
      <div className='mb-6'>
        <label className={labelStyle} style={{ color: theme.palette.text.secondary }}>Category</label>
        {categories.map((category) => (
          <div key={category} className='flex items-center mb-1'>
            <input
              type='radio'
              name='category'
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className={checkboxStyle}
            />
            <span style={{ color: theme.palette.text.primary }}>{category}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className='mb-6'>
        <label className={labelStyle} style={{ color: theme.palette.text.secondary }}>Gender</label>
        {genders.map((gender) => (
          <div key={gender} className='flex items-center mb-1'>
            <input
              type='radio'
              name='gender'
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className={checkboxStyle}
            />
            <span style={{ color: theme.palette.text.primary }}>{gender}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className='mb-6'>
        <label className={labelStyle} style={{ color: theme.palette.text.secondary }}>Color</label>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => (
            <button
              type='button'
              key={color}
              name='color'
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border cursor-pointer transition hover:scale-105 ${filters.color === color ? 'ring-2 ring-blue-500' : ''}`}
              style={{
                backgroundColor: color.toLowerCase(),
                borderColor: theme.palette.divider
              }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className='mb-6'>
        <label className={labelStyle} style={{ color: theme.palette.text.secondary }}>Size</label>
        {sizes.map((size) => (
          <div key={size} className='flex items-center mb-1'>
            <input
              type='checkbox'
              name='size'
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className={checkboxStyle}
            />
            <span style={{ color: theme.palette.text.primary }}>{size}</span>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className='mb-6'>
        <label className={labelStyle} style={{ color: theme.palette.text.secondary }}>Material</label>
        {materials.map((material) => (
          <div key={material} className='flex items-center mb-1'>
            <input
              type='checkbox'
              name='material'
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className={checkboxStyle}
            />
            <span style={{ color: theme.palette.text.primary }}>{material}</span>
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className='mb-6'>
        <label className={labelStyle} style={{ color: theme.palette.text.secondary }}>Brand</label>
        {brands.map((brand) => (
          <div key={brand} className='flex items-center mb-1'>
            <input
              type='checkbox'
              name='brand'
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className={checkboxStyle}
            />
            <span style={{ color: theme.palette.text.primary }}>{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className='mb-8'>
        <label className={labelStyle} style={{ color: theme.palette.text.secondary }}>Price Range</label>
        <input
          type='range'
          name='priceRange'
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className='w-full h-2 rounded-lg appearance-none cursor-pointer'
          style={{ backgroundColor: theme.palette.divider }}
        />
        <div className='flex justify-between mt-2' style={{ color: theme.palette.text.secondary }}>
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        type='button'
        className='mt-4 px-4 py-2 rounded-md font-medium transition'
        style={{
          backgroundColor: theme.palette.action.hover,
          color: theme.palette.text.primary
        }}
        onClick={clearFilters}
      >
        Clear All Filters
      </button>
    </div>
  )
}

export default FilterSidebar
