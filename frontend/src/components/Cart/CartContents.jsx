import { FiTrash2 } from 'react-icons/fi'
import { useTheme } from '@mui/material/styles'

const cartProducts = [
  {
    productId: 1,
    name: 'T-shirt',
    size: 'M, L, XL, XXL',
    color: 'Red, Blue, Pink',
    price: 39.99,
    quantity: 1,
    image: 'https://picsum.photos/200?random=1'
  },
  {
    productId: 2,
    name: 'Jeans',
    size: 'M, L, XL, S',
    color: 'Blue, Gray, White',
    price: 89.99,
    quantity: 1,
    image: 'https://picsum.photos/200?random=2'
  },
  {
    productId: 3,
    name: 'Kaki',
    size: 'S, M, L, XL',
    color: 'Green, Blue, Red',
    price: 80.00,
    quantity: 1,
    image: 'https://picsum.photos/200?random=3'
  }
]

const CartContents = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-slate-800' : 'bg-white'} w-full max-w-3xl mx-auto`}>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className={`flex items-center justify-between py-4 border-b last:border-none ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          {/* Left */}
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded-xl shadow-sm"
            />
            <div>
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-[#042956]'}`}>
                {product.name}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Size:{' '}
                <span className="font-medium text-[#0F4C81]">{product.size}</span><br />
                Color:{' '}
                <span className="font-medium text-[#236899]">{product.color}</span>
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <button className="w-7 h-7 flex items-center justify-center border border-gray-300 dark:border-slate-600 rounded-full text-[#0F4C81] text-sm font-bold hover:bg-[#0F4C81] hover:text-white transition">
                  −
                </button>
                <span className={`${isDark ? 'text-white' : 'text-[#042956]'} text-sm font-semibold`}>
                  {product.quantity}
                </span>
                <button className="w-7 h-7 flex items-center justify-center border border-gray-300 dark:border-slate-600 rounded-full text-[#0F4C81] text-sm font-bold hover:bg-[#0F4C81] hover:text-white transition">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#042956]'}`}>
              ${product.price.toFixed(2)}
            </p>
            <button className="hover:text-red-700 transition" title="Remove item">
              <FiTrash2 className="h-5 w-5 text-red-600 hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents
