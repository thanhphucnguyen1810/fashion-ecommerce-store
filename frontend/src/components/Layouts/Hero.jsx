import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import heroImg from '~/assets/rabbit-hero.webp'

const Hero = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const overlayStyle = {
    backgroundColor: isDark
      ? 'rgba(0, 0, 0, 0.6)'
      : 'rgba(255, 255, 255, 0.3)'
  }

  const textColor = {
    color: isDark ? theme.palette.common.white : theme.palette.text.primary
  }

  const buttonStyle = {
    backgroundColor: isDark ? theme.palette.common.white : theme.palette.primary.main,
    color: isDark ? theme.palette.grey[900] : theme.palette.common.white
  }

  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover object-center"
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={overlayStyle}
      >
        <div className="text-center p-6" style={textColor}>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase mb-4 drop-shadow-lg">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm md:text-lg mb-6 max-w-xl mx-auto drop-shadow-sm">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="#"
            className="inline-block px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:opacity-90 transition"
            style={buttonStyle}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
