import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const {productId} = useParams()
  const {products, currency, addTocart} = useContext(ShopContext)
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {

    products.map((item) => {
      if(item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })

  }

  useEffect(()=>{
    fetchProductData()
  },[productId,products])

  return productData ?  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/* product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex md:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full overflow-scroll'>
          {
            productData.image.map((item, index) => (
              <img 
                src={item}
                key={index}
                onClick={()=>setImage(item)}
                alt='imgs'
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
              />
            ))
          }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img 
              src={image} 
              className='w-full h-auto'
              alt="productimg" 
            />
          </div>
        </div>

         {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="rathing" className="w-3 5"></img>
            <img src={assets.star_icon} alt="rathing" className="w-3 5"></img>
            <img src={assets.star_icon} alt="rathing" className="w-3 5"></img>
            <img src={assets.star_icon} alt="rathing" className="w-3 5"></img>
            <img src={assets.star_dull_icon} alt="rathing" className="w-3 5"></img>
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
            {
              productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={()=>setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? ' border-orange-500' : ''}`}
                >
                  {item}
                </button>
              ))
            }
            </div>
          </div>
          <button onClick={()=>addTocart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return  and exchange policy within 7 days.</p>
          </div>
         </div>
        </div>

        {/* description & review */}
        <div className='mt-20'>
            <div className='flex'>
              <b className='border px-5 text-sm py-3'>Description</b>
              <p className='border px-5 text-sm py-3'>Reviews (122)</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis aut soluta sapiente unde reprehenderit laborum dolore tempore, perferendis quam dolorem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque pariatur, voluptate, enim et qui ipsum odit illo illum maxime, libero quibusdam labore eligendi? Autem, consequatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, perspiciatis?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, ab nostrum eaque sint error velit accusamus tempora explicabo cum sit suscipit quas iure quam doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero deserunt maxime, unde explicabo voluptatibus cumque culpa esse odit nulla similique repellendus quis harum incidunt necessitatibus.</p>
            </div>
        </div>

        {/* related product */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  )  : <div className=' opacity-0'></div>
}

export default Product