import React, { useEffect } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
  const [products, setProducts] = React.useState([]);
  const navigate=useNavigate();

  const fetchproducts=async()=>{
    try{
      const res=await api.get('/products');
      console.log(res.data.products);
      setProducts(res.data.products);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleaddproducts=()=>{
    navigate('/products/new');
  }

  useEffect(()=>{
    fetchproducts();
  },[]);
  return (
    <div className='min-h-screen w-full bg-white overflow-hidden '>
      <div className='pl-4 mt-6 flex flex-row justify-between pr-2'>
        <div>
        <h2 className=' text-4xl text-black'>Products</h2>
        <p className='text-gray-500'>View all products of your shop</p>
        </div>
        <div className='flex flex-col justify-center items-center' onClick={handleaddproducts}>
          <button>Add Products</button>
        </div>
      </div >
      <div className='grid grid-cols-4 mt-4 bg-slate-100 shadow-lg mx-2'>
        <div className='text-gray-500 flex flex-col justify-center ml-2 text-lg '>
          Product name
        </div>
        <div className='text-gray-500 flex flex-col justify-center ml-2 text-lg'>
          Price
        </div>
        <div className='text-gray-500 flex flex-col justify-center ml-2 text-lg'>
          Quantity
        </div>
        <div className='text-gray-500 flex flex-col justify-center ml-2 text-lg'>
          Category
        </div>
      </div>
      {products.length>0 && products.map((product,index)=>{
        return <div>
          <div key={index} className='grid grid-cols-4   h-8 mx-2'>
        <div className='text-black flex flex-col justify-center ml-2 text-lg '>
          {product.name}
        </div>
        <div className='text-black flex flex-col justify-center ml-2 text-lg'>
          {product.price}
        </div>
        <div className='text-black flex flex-col justify-center ml-2 text-lg'>
          {product.quantity}
        </div>
        <div className='text-black flex flex-col justify-center ml-2 text-lg'>
          {product.category}
        </div>
      </div>
      <div className="h-px bg-gray-700 " />
        </div>
      })}
    </div>
  )
}

export default ViewProducts
