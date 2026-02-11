import React, { useEffect } from "react";
import api from "../api/axios";
import Salescharts from "../components/Salescharts";
import ProductCard from "../cards/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";

const Dashboard = () => {
  const [name, setName] = React.useState("");
  const [todaysales, setTodaysales] = React.useState(0);
  const [weeklysales, setWeeklysales] = React.useState([]);
  const [monthlysales, setMonthlysales] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [isdraweropen, setIsDrawerOpen] = React.useState(false);

  const navigate = useNavigate();

  const fetchusername = async () => {
    const res = await api.get("/reports/getusername", { withCredentials: true });
    setName(res.data.name);
  };

  const fetchdetails = async () => {
    const [daily, weekly, monthly, productsRes] = await Promise.all([
      api.get("/reports/today", { withCredentials: true }),
      api.get("/reports/last-seven-days", { withCredentials: true }),
      api.get("/reports/monthly", { withCredentials: true }),
      api.get("/products", { withCredentials: true }),
    ]);

    setTodaysales(daily.data.todaySales);
    setWeeklysales(weekly.data);
    setMonthlysales(monthly.data);
    setProducts(productsRes.data.products);
  };

  useEffect(() => {
    fetchusername();
    fetchdetails();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-2 sm:p-4 lg:p-6 max-w-full mx-0">
      <Drawer name={name} open={isdraweropen} onclose={() => setIsDrawerOpen(false)} />

      {/* FULL WIDTH TOP BAR */}
      <div className="w-full max-w-full mx-0 mb-6 bg-white rounded-xl shadow-lg p-4 sm:p-6 border">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button 
            className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-all" 
            onClick={() => setIsDrawerOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button 
            onClick={() => navigate("/profile")} 
            className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            👤
          </button>
        </div>
      </div>

      {/* FULL WIDTH MAIN GRID */}
      <div className="w-full max-w-full mx-0 px-2 sm:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            
            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border">
                <p className="text-gray-600 font-medium mb-2 text-sm sm:text-base">Today Sales</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">₹{todaysales}</h2>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border">
                <p className="text-gray-600 font-medium mb-2 text-sm sm:text-base">Total Products</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{products.length}</h2>
                <p className="text-sm text-green-600 mt-2 font-medium">All active & ready</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border">
                <p className="text-gray-600 font-medium mb-4 text-sm sm:text-base">Owner</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {name.charAt(0) || 'U'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 truncate">{name || 'Loading...'}</h3>
                    <p className="text-sm text-gray-600">Store Owner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📊 Last 7 Days Sales
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm">Sales performance trend</p>
                <div className="h-64 sm:h-80 bg-gray-50 rounded-lg border p-3 sm:p-4">
                  <Salescharts title="Last 7 Days Sales" data={weeklysales} type="daily" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📈 Monthly Sales
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm">Revenue overview</p>
                <div className="h-64 sm:h-80 bg-gray-50 rounded-lg border p-3 sm:p-4">
                  <Salescharts title="Monthly Sales" data={monthlysales} type="monthly" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Low Stock</h2>
              {/* <Link to="/products" className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                View all →
              </Link> */}
            </div>

            <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
              {products.filter((product) => (product.quantity < 5)||(product.quantity === 5)) .map((product, idx) => (
                <div key={product._id || idx} className="p-3 sm:p-4 bg-gray-50 rounded-lg border hover:bg-white transition-all">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2">
                    {product.name || `Product ${idx + 1}`}
                  </div>
                  <div className="text-sm text-orange-600 font-bold">
                    Stock: {product.quantity || 'Low'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Price: ₹{product.price || 0}
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-2xl mb-4">✅</div>
                  <p className="font-medium text-sm">No low stock items</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



// import React, { useEffect } from "react";
// import api from "../api/axios";
// import Salescharts from "../components/Salescharts";
// import ProductCard from "../cards/ProductCard";
// import { Link, useNavigate } from "react-router-dom";
// import Drawer from "../components/Drawer";


// const Dashboard = () => {
//   const [name, setName] = React.useState("");
//   const [todaysales, setTodaysales] = React.useState(0);
//   const [weeklysales, setWeeklysales] = React.useState([]);
//   const [monthlysales, setMonthlysales] = React.useState([]);
//   const [products, setProducts] = React.useState([]);
//   const [isdraweropen, setIsDrawerOpen] = React.useState(false);


//   const navigate = useNavigate();


//   const fetchusername = async () => {
//     const res = await api.get("/reports/getusername", { withCredentials: true });
//     setName(res.data.name);
//   };


//   const fetchdetails = async () => {
//     const [daily, weekly, monthly, products] = await Promise.all([
//       api.get("/reports/today", { withCredentials: true }),
//       api.get("/reports/last-seven-days", { withCredentials: true }),
//       api.get("/reports/monthly", { withCredentials: true }),
//       api.get("/products", { withCredentials: true }),
//     ]);


//     setTodaysales(daily.data.todaySales);
//     setWeeklysales(weekly.data);
//     setMonthlysales(monthly.data);
//     setProducts(products.data.products);
//   };


//   useEffect(() => {
//     fetchusername();
//     fetchdetails();
//   }, []);


//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <Drawer name={name} open={isdraweropen} onclose={() => setIsDrawerOpen(false)} />


//       {/* TOP BAR */}
//       <div className="flex justify-between items-center mb-8">
//         <button className="text-2xl" onClick={() => setIsDrawerOpen(true)}>☰</button>
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <button onClick={() => navigate("/profile")} className="text-xl">👤</button>
//       </div>


//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
       
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-3 space-y-6">
         
//           {/* STATS */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             <div className="bg-white rounded-xl shadow p-6">
//               <p className="text-gray-500">Today Sales</p>
//               <h2 className="text-3xl font-bold mt-2">₹{todaysales}</h2>
//             </div>


//             <div className="bg-white rounded-xl shadow p-6">
//               <p className="text-gray-500">Total Products</p>
//               <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
//             </div>


//             <div className="bg-white rounded-xl shadow p-6">
//               <p className="text-gray-500">Owner</p>
//               <h2 className="text-xl font-semibold mt-3">{name}</h2>
//             </div>
//           </div>


//           {/* CHARTS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-xl shadow p-4 h-80">
//               <Salescharts
//                 title="Last 7 Days Sales"
//                 data={weeklysales}
//                 type="daily"
//               />
//             </div>


//             <div className="bg-white rounded-xl shadow p-4 h-80">
//               <Salescharts
//                 title="Monthly Sales"
//                 data={monthlysales}
//                 type="monthly"
//               />
//             </div>
//           </div>
//         </div>


//         {/* RIGHT COLUMN – PRODUCTS */}
//         <div className="bg-white rounded-xl shadow p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-bold text-lg">Low Stock</h2>
//             <Link to="/products" className="text-blue-600 text-sm">
//               View all
//             </Link>
//           </div>


//           <ul className="space-y-3">
//             {products.slice(0, 3).map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Dashboard;