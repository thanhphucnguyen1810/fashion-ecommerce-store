import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import heroImg from '~/assets/rabbit-hero.webp'

const Hero = () => {
  const theme = useTheme()

  const overlayColor = theme.palette.mode === 'dark'
    ? 'bg-black/60'
    : 'bg-white/30'

  const textColor = theme.palette.mode === 'dark'
    ? 'text-white'
    : 'text-[#042956]'

  const buttonClass = theme.palette.mode === 'dark'
    ? 'bg-white text-gray-900'
    : 'bg-[#042956] text-white'

  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover object-center"
      />
      <div className={`absolute inset-0 ${overlayColor} flex items-center justify-center`}>
        <div className={`text-center p-6 ${textColor}`}>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase mb-4 drop-shadow-lg">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm md:text-lg mb-6 max-w-xl mx-auto drop-shadow-sm">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="#"
            className={`inline-block ${buttonClass} px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:opacity-90 transition`}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
