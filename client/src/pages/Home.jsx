import React from 'react'
import HomeWrapperOne from '../components/Home/HomeWrapperOne'
import BlogSection from '../components/Home/BlogSection'
import { useOutletContext } from 'react-router-dom'

function Home() {
  const {isOpenForm , setIsOpenForm} = useOutletContext() ;
  setIsOpenForm(false) ;
  return (
    <main className='w-full md:px-24 px-6 h-max '>
      <HomeWrapperOne />
      <BlogSection />
    </main>
  )
}

export default Home
