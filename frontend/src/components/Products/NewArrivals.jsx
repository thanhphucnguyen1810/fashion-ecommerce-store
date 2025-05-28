import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import palette from '~/theme/palette'

const NewArrivals = () => {
  const theme = useTheme()
  const mode = theme.palette.mode
  const colors = palette[mode]

  const newArrivals = [
    {
      _id: '1',
      name: 'Stylish Jacket',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=1', altText: 'Stylish Jacket' },
        { url: 'https://picsum.photos/500/500?random=2', altText: 'Stylish Jacket' },
        { url: 'https://picsum.photos/500/500?random=3', altText: 'Stylish Jacket' }
      ]
    },
    {
      _id: '2',
      name: 'Stylish Shirt',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=4', altText: 'Stylish Shirt' },
        { url: 'https://picsum.photos/500/500?random=5', altText: 'Stylish Shirt' },
        { url: 'https://picsum.photos/500/500?random=6', altText: 'Stylish Shirt' }
      ]
    },
    {
      _id: '3',
      name: 'Stylish Pants',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=7', altText: 'Stylish Pants' },
        { url: 'https://picsum.photos/500/500?random=8', altText: 'Stylish Pants' },
        { url: 'https://picsum.photos/500/500?random=9', altText: 'Stylish Pants' }
      ]
    },
    {
      _id: '4',
      name: 'Stylish Dress',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=10', altText: 'Stylish Dress' },
        { url: 'https://picsum.photos/500/500?random=11', altText: 'Stylish Dress' },
        { url: 'https://picsum.photos/500/500?random=12', altText: 'Stylish Dress' }
      ]
    },
    {
      _id: '5',
      name: 'Stylish Sweater',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=13', altText: 'Stylish Sweater' },
        { url: 'https://picsum.photos/500/500?random=14', altText: 'Stylish Sweater' },
        { url: 'https://picsum.photos/500/500?random=15', altText: 'Stylish Sweater' }
      ]
    },
    {
      _id: '6',
      name: 'Stylish Top',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=16', altText: 'Stylish Top' },
        { url: 'https://picsum.photos/500/500?random=17', altText: 'Stylish Top' },
        { url: 'https://picsum.photos/500/500?random=18', altText: 'Stylish Top' }
      ]
    },
    {
      _id: '7',
      name: 'Stylish Top',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=19', altText: 'Stylish Top' },
        { url: 'https://picsum.photos/500/500?random=20', altText: 'Stylish Top' },
        { url: 'https://picsum.photos/500/500?random=21', altText: 'Stylish Top' }
      ]
    },
    {
      _id: '8',
      name: 'Stylish Top',
      price: 120,
      images: [
        { url: 'https://picsum.photos/500/500?random=22', altText: 'Stylish Top' },
        { url: 'https://picsum.photos/500/500?random=23', altText: 'Stylish Top' },
        { url: 'https://picsum.photos/500/500?random=24', altText: 'Stylish Top' }
      ]
    }
  ]

  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX)
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const updateScrollButtons = () => {
    const container = scrollRef.current
    if (container) {
      const leftScroll = container.scrollLeft
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth

      setCanScrollLeft(leftScroll > 0)
      setCanScrollRight(rightScrollable)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollButtons)
      updateScrollButtons()
      return () => {
        container.removeEventListener('scroll', updateScrollButtons)
      }
    }
  }, [])

  return (
    <section className='py-16 px-4 lg:px-0' style={{ backgroundColor: colors.background }}>
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='text-3xl font-bold mb-4' style={{ color: colors.text }}>Explore New Arrivals</h2>
        <p className='text-lg mb-8' style={{ color: colors.mutedText }}>
          Discover the latest styles straight off the runway, freshly added to keep your
          wardrobe on the cutting edge of fashion.
        </p>
        {/* Scroll Buttons */}
        <div className='absolute right-0 bottom-[30px] flex space-x-2'>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className='p-2 rounded border'
            style={{
              backgroundColor: canScrollLeft ? colors.background : colors.border,
              color: canScrollLeft ? colors.text : colors.mutedText,
              cursor: canScrollLeft ? 'pointer' : 'not-allowed',
              borderColor: colors.border
            }}
          >
            <FiChevronLeft className='text-2xl' />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className='p-2 rounded border'
            style={{
              backgroundColor: canScrollRight ? colors.background : colors.border,
              color: canScrollRight ? colors.text : colors.mutedText,
              cursor: canScrollRight ? 'pointer' : 'not-allowed',
              borderColor: colors.border
            }}
          >
            <FiChevronRight className='text-2xl' />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
            <img
              src={product.images[0].url}
              alt={product.images[0]?.altText || product.name}
              className='w-full h-[500px] object-cover rounded-lg'
              draggable='false'
            />
            <div
              className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md p-4 rounded-b-lg'
              style={{ backgroundColor: `${colors.background}cc`, color: colors.text }}
            >
              <Link to={`/product/${product._id}`} className='block'>
                <h4 className='font-medium'>{product.name}</h4>
                <p className='mt-1'>${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewArrivals
