import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ProductGrid from './ProductGrid'
import { useTheme } from '@mui/material/styles'

const selectedProduct = {
  name: 'Stylish Jacket',
  price: 120,
  originalPrice: 150,
  description: 'This is a stylish jacket with a great design and quality.',
  brand: 'FashionBrand',
  material: 'Leather',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Red', 'Blue', 'Green'],
  images: Array.from({ length: 5 }, (_, i) => ({
    url: `https://picsum.photos/500/500?random=${i + 1}`,
    altText: `Stylish Jacket ${i + 1}`
  }))
}

const similarProducts = [
  {
    _id: 1,
    name: 'Stylish Jacket',
    price: 120,
    images: [
      { url: 'https://picsum.photos/500/500?random=1', altText: 'Stylish Jacket' }
    ]
  },
  {
    _id: 2,
    name: 'Stylish Jacket',
    price: 80,
    images: [
      { url: 'https://picsum.photos/500/500?random=2', altText: 'Stylish Jacket' }
    ]
  },
  {
    _id: 3,
    name: 'Stylish Jacket',
    price: 150,
    images: [
      { url: 'https://picsum.photos/500/500?random=3', altText: 'Stylish Jacket' }
    ]
  },
  {
    _id: 4,
    name: 'Stylish Jacket',
    price: 100,
    images: [
      { url: 'https://picsum.photos/500/500?random=4', altText: 'Stylish Jacket' }
    ]
  }
]

const ProductDetails = () => {

  const theme = useTheme()
  const [mainImage, setMainImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url)
    }
  }, [selectedProduct])

  const handleQuantityChange = (action) => {
    if (action === 'plus') setQuantity((prev) => prev + 1)
    if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1)
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select a color and size before adding to cart.', {
        duration: 1000
      })
      return
    }
    setIsButtonDisabled(true)
    // Qúa trình xử lý thêm vào giỏ hàng mất 500ms
    setTimeout(() => {
      toast.success('Product added to cart.', {
        duration: 1000
      })
      setIsButtonDisabled(false)
    }, 500)

  }

  return (
    <div className='p-6'>
      <div
        className='max-w-6xl mx-auto p-8 rounded-lg transition-colors duration-300'
        style={{ backgroundColor: theme.palette.mode === 'dark' }}
      >
        <div className='flex flex-col md:flex-row'>
          {/* Left Thumbnail */}
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className='w-20 h-20 object-cover rounded-lg cursor-pointer border'
                style={{
                  borderColor: mainImage === image.url
                    ? theme.palette.primary.main // đã dc chọn
                    : theme.palette.divider // chưa dc chọn
                }}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='md:w-1/2'>
            <div className='mb-4'>
              <img
                src={mainImage}
                alt='Main Product'
                className='w-full h-auto object-cover rounded-lg'
              />
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className='w-20 h-20 object-cover rounded-lg cursor-pointer border'
                style={{
                  borderColor: mainImage === image.url
                    ? theme.palette.primary.main
                    : theme.palette.divider
                }}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Right Side */}
          <div className='md:w-1/2 md:ml-10'>
            <h1 className='text-2xl md:text-3xl font-semibold mb-2'
              style={{ color: theme.palette.text.primary }}
            >
              {selectedProduct.name}
            </h1>
            <p className='text-lg line-through mb-1'
              style={{ color: theme.palette.text.secondary }}
            >
              {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
            </p>
            <p className='text-xl mb-2'
              style={{ color: theme.palette.text.primary }}
            >
              ${selectedProduct.price}
            </p>
            <p className='mb-4'
              style={{ color: theme.palette.text.secondary }}
            >
              {selectedProduct.description}
            </p>

            {/* Colors */}
            <div className='mb-4'>
              <p className='text-sm' style={{ color: theme.palette.text.primary }}>Color: </p>
              <div className='flex gap-2 mt-2'>
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className='w-8 h-8 rounded-full'
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: 'brightness(0.5)',
                      border:
                        selectedColor === color
                          ? `3px solid ${theme.palette.primary.main}`
                          : `1px solid ${theme.palette.divider}`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className='mb-4'>
              <p className='text-sm' style={{ color: theme.palette.text.primary }}>Size: </p>
              <div className='flex gap-2 mt-2'>
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded border"
                    style={{
                      backgroundColor:
                        selectedSize === size
                          ? theme.palette.primary.main
                          : 'transparent',
                      color:
                        selectedSize === size
                          ? theme.palette.primary.contrastText
                          : theme.palette.text.primary,
                      borderColor: theme.palette.divider
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className='mb-6'>
              <p className='text-sm' style={{ color: theme.palette.text.primary }}>Quantity: </p>
              <div className='flex items-center space-x-4 mt-2'>
                <button
                  onClick={() => handleQuantityChange('minus')}
                  className='px-2 py-1 rounded text-lg'
                  style={{
                    backgroundColor: theme.palette.action.disabledBackground,
                    color: theme.palette.text.primary
                  }}
                >
                  -
                </button>
                <span className='text-lg' style={{ color: theme.palette.text.primary }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('plus')}
                  className="px-2 py-1 rounded text-lg"
                  style={{
                    backgroundColor: theme.palette.action.disabledBackground,
                    color: theme.palette.text.primary
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="py-2 px-6 rounded w-full uppercase transition-colors duration-300"
              style={{
                backgroundColor: isButtonDisabled
                  ? theme.palette.action.disabledBackground
                  : theme.palette.primary.main,
                color: isButtonDisabled
                  ? theme.palette.action.disabled
                  : theme.palette.primary.contrastText,
                cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                opacity: isButtonDisabled ? 0.5 : 1
              }}
            >
              {isButtonDisabled ? 'Adding...' : 'Add to cart'}
            </button>

            {/* Characteristics */}
            <div className="mt-10" style={{ color: theme.palette.text.secondary }}>
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Suggestion */}
        <div className="mt-20">
          <h2
            className="text-2xl text-center font-medium mb-4"
            style={{ color: theme.palette.text.primary }}
          >
            You may also like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>

      </div>
    </div>
  )
}

export default ProductDetails
