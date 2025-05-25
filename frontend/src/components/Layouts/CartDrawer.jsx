import { IoMdClose } from 'react-icons/io'
import { useTheme } from '@mui/material/styles'
import CartContents from '~/components/Cart/CartContents'

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div
      className={`
        fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full
        ${isDark ? 'bg-slate-800' : 'bg-white'}
        shadow-xl transform transition-transform duration-300
        flex flex-col z-50
        ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Close Button */}
      <div className={`flex justify-end p-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
        <button
          onClick={toggleCartDrawer}
          className={`${isDark ? 'text-white' : 'text-[#042956]'} hover:text-red-600 transition`}
          title="Close"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>

      {/* Cart contents */}
      <div className={`flex-grow p-5 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#0F4C81]'}`}>
          Your Cart
        </h2>
        <CartContents />
      </div>

      {/* Checkout section */}
      <div className={`p-5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-t`}>
        <button className="w-full bg-[#0F4C81] text-white py-3 rounded-xl font-semibold hover:bg-[#042956] transition duration-200 shadow-md">
          Proceed to Checkout
        </button>
        <p className={`text-xs text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  )
}

export default CartDrawer
