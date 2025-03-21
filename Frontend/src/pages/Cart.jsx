import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'
import {Link} from 'react-router-dom'

const Cart = () => {

  const {products, currency, cartItems, updateQuantity} = useContext(ShopContext)

  const [cartData, setcartData] = useState([])

  useEffect(()=>{
    if(products.length > 0){
      const tempData = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setcartData(tempData)
    }
  },[cartItems])

  return (
    <div className=' border-t pt-14'>
      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)

            return(
              <div key={index} className=' py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_o.5fr] sm:grid-cols-[4fr_2fr_0.5fr] item-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img 
                    src={productData.image[0]} 
                    className='w-16 sm:w-20'
                    alt="prodcuimg" 
                  />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input 
                  type="number"
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 h-[30px] my-auto' 
                  defaultValue={item.quantity} 
                  min={1}
                  onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null :  updateQuantity(item._id,item.size,Number(e.target.value))}
                />
                <img 
                  src={assets.bin_icon} 
                  alt="delete"
                  className='w-4 mr-4 cursor-pointer my-auto'
                  onClick={()=>updateQuantity(item._id, item.size,0)}
                />
              </div>
            )
            
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <Link to="/placeorder">
              <button className='bg-black text-white text-sm my-8 px-8 py-3'>
                PROCEED TO ORDER
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart