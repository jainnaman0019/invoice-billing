import React from 'react'
import ProductCard from '../cards/ProductCard'

const Lowstock = ({products}) => {
  return (
    <div>
      <h3>Low Stock Products</h3>

      {products.length === 0?(
        <p className="text-gray-500">All Good 🎉</p>
      ):
      (
        <ul className="space-y-2">
            {products.map((product)=>(
                <li key={product._id} className="flex justify-between text-sm">
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
      )}
      
    </div>
  )
}

export default Lowstock
