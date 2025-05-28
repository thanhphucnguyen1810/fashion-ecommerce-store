import { useTheme } from '@mui/material/styles'
import Hero from '~/components/Layouts/Hero'
import GenderCollectionSection from '~/components/Products/GenderCollectionSection'
import NewArrivals from '~/components/Products/NewArrivals'
import ProductDetails from '~/components/Products/ProductDetails'
import ProductGrid from '~/components/Products/ProductGrid'

const placeholderProducts = [
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
  },
  {
    _id: 5,
    name: 'Stylish Jacket',
    price: 120,
    images: [
      { url: 'https://picsum.photos/500/500?random=5', altText: 'Stylish Jacket' }
    ]
  },
  {
    _id: 6,
    name: 'Stylish Jacket',
    price: 80,
    images: [
      { url: 'https://picsum.photos/500/500?random=6', altText: 'Stylish Jacket' }
    ]
  },
  {
    _id: 7,
    name: 'Stylish Jacket',
    price: 150,
    images: [
      { url: 'https://picsum.photos/500/500?random=7', altText: 'Stylish Jacket' }
    ]
  },
  {
    _id: 8,
    name: 'Stylish Jacket',
    price: 100,
    images: [
      { url: 'https://picsum.photos/500/500?random=8', altText: 'Stylish Jacket' }
    ]
  }
]

const Home = () => {
  const theme = useTheme()
  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Sellers */}
      <h2
        className="text-3xl text-center font-bold mb-4"
        style={{ color: theme.palette.text.primary }}
      >
        Best Sellers
      </h2>
      <ProductDetails />

      <div className="container mx-auto">
        <h2
          className="text-3xl text-center font-bold mb-4"
          style={{ color: theme.palette.text.primary }}
        >
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
    </div>
  )
}

export default Home
