import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io5'
import { RiTwitterXLine } from 'react-icons/ri'
import { useTheme } from '@mui/material/styles'

import CarouselMid from '~/components/Common/CarouselMid'

const Topbar = () => {
  const theme = useTheme()

  const iconClass = theme.palette.mode === 'light' ? 'text-[#b8b9c2]' : 'text-[#94a3b8]'

  return (
    <div className="bg-[#042956] text-[#b8b9c2] text-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">

        {/* Left - Social Icons */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="#" className={`hover:text-[#b8b9c2] transition ${iconClass}`} title="Meta">
            <TbBrandMeta className="w-5 h-5" />
          </a>
          <a href="#" className={`hover:text-[#b8b9c2] transition ${iconClass}`} title="Instagram">
            <IoLogoInstagram className="w-5 h-5" />
          </a>
          <a href="#" className={`hover:text-[#b8b9c2] transition ${iconClass}`} title="X (Twitter)">
            <RiTwitterXLine className="w-5 h-5" />
          </a>
        </div>

        {/* Center - Announcement */}
        <div className="flex-1 text-center px-2">
          <CarouselMid />
        </div>

        {/* Right - Phone */}
        <div className="hidden md:block">
          <a href="tel:+12345678901" className="hover:text-[#b8b9c2] transition" title="Call us">
            +1 (234) 567-8901
          </a>
        </div>

      </div>
    </div>
  )
}

export default Topbar
