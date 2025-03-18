import React from 'react'

const Button = ({ children, onClick, variant, className }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm ${variant} ${className} cursor-pointer`}
    >
      {children}
    </button>
  )
}

export default Button