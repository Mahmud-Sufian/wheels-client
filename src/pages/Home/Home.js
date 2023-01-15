import React from 'react'
import Footer from '../Shared/Footer'
import Nav from '../Shared/Nav'
import HomeBanner from './HomeBanner'
import HomeProduct from './HomeProduct'
import Message from './Message'

const Home = () => {
  return (
    <div>
        <Nav></Nav>
        <HomeBanner></HomeBanner>
        <HomeProduct></HomeProduct>
        <Message></Message>
        <Footer></Footer>
    </div>
  )
}

export default Home