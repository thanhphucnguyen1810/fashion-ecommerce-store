import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io5'
import { RiTwitterXLine } from 'react-icons/ri'

const Topbar = () => {
  return (
    <>
      <div className="bg-[#EA2E0E] text-white">
        <div className="container mx-auto">

          <div className='flex items-center space-x-4'>
            <a href='#' className='hover: text-gray-300'>
              <TbBrandMeta className='h-5 w-5' />
            </a>
            <a href='#' className='hover: text-gray-300'>
              <IoLogoInstagram className='h-5 w-5' />
            </a>
            <a href='#' className='hover: text-gray-300'>
              <RiTwitterXLine className='h-4 w-4' />
            </a>
          </div>

          <div className='text-sm text-center'>
            <span>We ship worldwide - Fast and reliable shipping!</span>
          </div>

        </div>
      </div>
    </>
  )
}

export default Topbar
