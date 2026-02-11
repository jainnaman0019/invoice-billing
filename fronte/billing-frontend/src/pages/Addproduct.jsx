// import React from 'react'
// import api from '../api/axios';

// const Addproduct = () => {
//   const [name, setName] = React.useState("");
//   const [price, setPrice] = React.useState(0);
//   const [quantity, setQuantity] = React.useState(0);
//   const [category, setCategory] = React.useState("");

//   const handlesubmitbutton=async(e)=>{
//     e.preventDefault();
    
//     try{
//       const res=await api.post('/products',{name,price,quantity,category},{withCredentials:true});
//       console.log("Product added successfully:", res.data);
//     }
//     catch(error){
//       console.error("Error adding product:", error.response?.data || error.message);
//     }
//   }

//   return (
//     <div>
//       <h1>Add New Product</h1>
//       <form onSubmit={handlesubmitbutton}>
//         <div className='gap-6'>
//           <label>Product Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </div>
//         <button type='submit'>Add+</button>
//       </form>
//     </div>
//   )
// }

// export default Addproduct


import React from "react";
import api from "../api/axios";

const Addproduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [category, setCategory] = React.useState("");

  const handlesubmitbutton = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/products",
        { name, price, quantity, category },
        { withCredentials: true }
      );

      console.log("Product added successfully:", res.data);

      // Optional: reset form after submit
      setName("");
      setPrice(0);
      setQuantity(0);
      setCategory("");

    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white w-[400px] shadow-xl rounded-xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h1>

        <form onSubmit={handlesubmitbutton} className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter quantity"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter category"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition duration-200"
          >
            Add Product +
          </button>

        </form>
      </div>
    </div>
  );
};

export default Addproduct;
