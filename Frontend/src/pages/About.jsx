import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className=' text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img 
          src={assets.about_img} 
          className='w-full md:max-w-[450px]'
          alt="about-img" 
        />
        <div className=' flex flex-col justify-center gap-6 ms:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque repudiandae mollitia quibusdam consequuntur voluptate officiis vitae odit quia eius vel quod cum, reprehenderit repellat dignissimos laboriosam minima commodi hic quisquam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat magnam nesciunt officia alias provident aperiam, quod quo expedita at iure.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas omnis necessitatibus voluptate, eaque ullam sint soluta mollitia maiores minus laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore inventore laboriosam culpa expedita reprehenderit officiis voluptatum vero consequatur autem iste!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni expedita deserunt nisi voluptas molestiae nulla at provident temporibus. Quaerat culpa temporibus ipsam, perspiciatis sit quis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, accusantium?</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className=' flex flex-col md:flex-row text-sm mb-20'>
        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ducimus!</p>
        </div>
        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p  className='text-gray-600'>Lorem ipsum dolor sit amet. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ducimus!</p>
        </div>
        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p  className='text-gray-600'>Lorem ipsum dolor sit amet. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ducimus!</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About