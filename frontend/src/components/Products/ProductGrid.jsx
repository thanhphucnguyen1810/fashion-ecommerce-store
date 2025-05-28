import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const ProductGrid = ({ products }) => {
  const theme = useTheme()
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className='block'
          style={{
            color: theme.palette.text.primary,
            textDecoration: 'none'
          }}
        >
          <div
            className="p-4 rounded-lg transition-shadow hover:shadow-md"
            style={{
              backgroundColor: theme.palette.background.paper
            }}
          >
            <div className='w-full h-96 mb-4'>
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
          </div>
          <h3
            className="text-sm mb-2 font-medium"
            style={{ color: theme.palette.text.primary }}
          >
            {product.name}
          </h3>
          <p
            className="font-medium text-sm tracking-tighter"
            style={{ color: theme.palette.text.secondary }}
          >
              ${product.price}
          </p>

        </Link>
      ))}
    </div>
  )
}

export default ProductGrid
