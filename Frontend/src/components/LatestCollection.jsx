import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { motion } from "framer-motion";


const LatestCollection = () => {

    const {products, loading} = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0,10))
    },[products])

   

    

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, provident? Lorem ipsum dolor sit amet.
            </p>
        </div>
        {/* rendering product */}
        <div className='grid grid-cols-2 sm:grid:cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            loading
            ?
            [...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[200px] h-[300px] bg-gray-300 animate-pulse rounded-lg"
                ></motion.div>
              ))
            :
            latestProducts.map((item, index) => (
                <ProductItem
                    key={index}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                />
            ))
        }
        </div>
    </div>
  )
}

export default LatestCollection