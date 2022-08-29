import React from 'react'

function Button({ Icon, title }) {
  return (
    <button className='flex items-center space-x-2 mb-4 hover:text-white'>
      <Icon className="w-5 h-5" />
      <p>{title}</p>
    </button>
  )
}

export default Button
