import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { FaOpencart } from 'react-icons/fa'

const slides = [
  'Sharp & smart – Up to 40% off suits and shirts!',
  'Casual comfort – Polo shirts & chinos now on sale!',
  'Floral dresses & flowy skirts – Shine with every step!',
  'Elegant looks, effortless style – Discover the new arrivals!',
  'Let them play in style – Comfy outfits for little champs!',
  'Bright colors & cute prints – Your kid\'s wardrobe upgrade starts here!'
]

const CarouselMid = () => {
  const theme = useTheme()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const textColor = theme.palette.text.secondary

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4 text-center">
      <div
        className="transition-opacity duration-500 ease-in-out text-lg"
        style={{ color: textColor }}
      >
        <FaOpencart className="inline mr-2" style={{ color: textColor }} />
        {slides[current]}
      </div>
    </div>
  )
}

export default CarouselMid
