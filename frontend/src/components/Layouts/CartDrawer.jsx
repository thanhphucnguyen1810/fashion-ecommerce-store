import { IoMdClose } from 'react-icons/io'
import { useTheme } from '@mui/material/styles'
import CartContents from '~/components/Cart/CartContents'

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const textPrimary = isDark ? theme.palette.common.white : theme.palette.primary.dark
  const bgMain = isDark ? 'bg-slate-800' : 'bg-white'
  const bgSection = isDark ? 'bg-slate-900' : 'bg-gray-50'
  const borderColor = isDark ? 'border-slate-700' : 'border-gray-200'
  const btnBg = theme.palette.primary.main
  const btnHover = theme.palette.primary.dark
  const secondaryText = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <div
      className={`
        fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full
        ${bgMain}
        shadow-xl transform transition-transform duration-300
        flex flex-col z-50
        ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Close Button */}
      <div className={`flex justify-end p-4 border-b ${borderColor}`}>
        <button
          onClick={toggleCartDrawer}
          className={'hover:text-red-600 transition'}
          style={{ color: textPrimary }}
          title="Close"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>

      {/* Cart contents */}
      <div className={`flex-grow p-5 overflow-y-auto ${bgSection}`}>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: textPrimary }}
        >
          Your Cart
        </h2>
        <CartContents />
      </div>

      {/* Checkout section */}
      <div className={`p-5 border-t ${borderColor} ${bgMain}`}>
        <button
          className={'w-full text-white py-3 rounded-xl font-semibold transition duration-200 shadow-md'}
          style={{
            backgroundColor: btnBg
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = btnHover)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = btnBg)}
        >
          Proceed to Checkout
        </button>
        <p className={`text-xs text-center mt-3 ${secondaryText}`}>
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  )
}

export default CartDrawer
