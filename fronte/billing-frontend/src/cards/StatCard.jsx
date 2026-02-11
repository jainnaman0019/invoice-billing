import React from 'react'

const StatCard = ({title,value,onclick}) => {
  return (
    <div onClick={onclick} className='flex flex-col justify-evenly rounded-lg bg-white shadow p-5 border-l-4 cursor-pointer'  >
      <p className='text-sm text-gray-500'>{title}</p>
      <h2 className='text-gray-500 text-2xl font-bold mt-2'>{value}</h2>
    </div>
  )
}

export default StatCard
