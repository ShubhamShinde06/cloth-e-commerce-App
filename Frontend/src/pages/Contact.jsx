import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsletterBox  from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img 
          src={assets.contact_img}
          className='w-full md:max-w-[480px]'
          alt="contact img" 
        />
        <div className=' flex flex-col justify-center items-center gap-6'>
          <p className=' font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54707 Malad Station <br /> Laxman nager, kurar village</p>
          <p className='text-gray-500 mr-5'>Tel: (+91) 989234-906745 <br /> Email: admin@gmail.com</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact