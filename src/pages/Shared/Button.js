import React from 'react'

const Button = ({children}) => {
  return (
    <button className=' bg-gradient-to-r from-cyan-300 to-cyan-700 font-bold uppercase text-white rounded py-3 px-5'>{children}</button>
  )
}

export default Button