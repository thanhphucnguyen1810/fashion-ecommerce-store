import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import featured from '~/assets/featured.webp'

const FeaturedCollection = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const bgColor = isDark ? ' #212121' : '#f0fdf4'

  return (
    <section className="py-12">
      <div
        className='container mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl overflow-hidden'
        style={{ backgroundColor: bgColor }}
      >
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left space-y-6">
          <h2
            className="text-lg font-semibold"
            style={{ color: theme.palette.text.secondary }}
          >
            Comfort and Style
          </h2>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: theme.palette.text.primary }}
          >
            Apparel made for your everyday needs life
          </h2>
          <p
            className="text-lg"
            style={{ color: theme.palette.text.secondary }}
          >
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every day.
          </p>
          <Link
            to="/collections/all"
            className="inline-block px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md"
            style={{
              backgroundColor: isDark
                ? theme.palette.common.white
                : theme.palette.primary.main,
              color: isDark
                ? theme.palette.grey[900]
                : theme.palette.common.white
            }}
          >
            Shop Now
          </Link>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
