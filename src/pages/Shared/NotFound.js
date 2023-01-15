import React from 'react'
import notFound from '../../img/notFound.jpg';

const NotFound = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div><img src={notFound} alt="" /></div>
    </div>
  )
}

export default NotFound