// import React, { useEffect, useState } from 'react'
// import api from '../api/axios'
// import { toast } from 'react-hot-toast'

// const CreateInvoice = () => {
//   const [searchPhone, setSearchPhone] = useState("")
//   const [customers, setCustomers] = useState([])
//   const [selectedCustomer, setSelectedCustomer] = useState(null)
  
//   const [products, setProducts] = useState([])
//   const [searchProduct, setSearchProduct] = useState("")
//   const [filteredProducts, setFilteredProducts] = useState([])
//   const [selectedProduct, setSelectedProduct] = useState(null)
//   const [quantity, setQuantity] = useState(1)
//   const [cart, setCart] = useState([])

//   const fetchCustomers=async()=>{
//     const res=await api.get('/customers');
//     console.log(res.data)
//     setCustomers(res.data.customers); //res.data->res.data.customers
//   }

//   const fetchProducts=async()=>{
//     const res=await api.get('/products');
//     console.log(res.data)
//     setProducts(res.data.products); 
//   }

//   const handleFindCustomer=()=>{
//     const res=customers.find((customer)=>customer.phone.toString()===searchPhone);
//     if(!res){
//       toast.error("Customer not found");
//   }
//     else{
      
//       setSelectedCustomer(res);
      
//     }
//   }

//   const handleonchangesearchproduct=(e)=>{
//     setSearchProduct(e.target.value);
//     const temp=e.target.value;
//     if(temp.length>0){ //find for single object and filter for multiple objects
//       const res=products.filter((product)=>product.name.toLowerCase().includes(temp.toLowerCase()));
//      setFilteredProducts(res);
//     }
//     else{
//       setFilteredProducts([]);
//     }
//   }

//   const handleadditembutton=()=>{
//     if(!selectedProduct){
//       toast.error("Please select a product");
//       return;
//     }
//     if(quantity>selectedProduct.quantity){
//       toast.error("Quantity exceeds available stock");
//       return;
//     }
//     const cartitem={
//       productId:selectedProduct._id,
//       quantity:quantity,
//     }
//     setCart((prev) => {
//       const existing = prev.find(
//         (item) => item.productId === selectedProduct._id
//       );
    
//       if (existing) {
//         return prev.map((item) =>
//           item.productId === selectedProduct._id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
    
//       return [...prev, cartitem];
//     });
    
//     setQuantity(1);
// setSelectedProduct(null);
// setSearchProduct("");

// //... means cart array ke sare items ko leke usme naya item add kar do
//   }

//   const handlecreateinvoicebutton=async()=>{
//     try{
//       if (!selectedCustomer) {
//         toast.error("Please select a customer");
//         return;
//       }
      
//       if (cart.length === 0) {
//         toast.error("Cart is empty");
//         return;
//       }
      
//       const res=await api.post('/invoice',{
//         items:cart,
//         customerId:selectedCustomer._id,
//       },{withCredentials:true});
//       toast.success("Invoice created successfully");

//       setCart([]);
//       setSelectedCustomer(null);
//       setSearchPhone("");
//       setSearchProduct("");
//       setSelectedProduct(null);
//       setQuantity(1);      
//     }
//     catch(error){
//       console.log(error);
//       toast.error("Failed to create invoice");
//     }
//   }

//   useEffect(()=>{
    
//     fetchCustomers();
//     fetchProducts();
//   },[])
//   return (
//     <div>
//       <div>Create Invoice</div>
//       <div>
//         <span>Search Customer (Mobile)</span>
//         <div>
//           <input type="text" value={searchPhone} onChange={(e)=>{setSearchPhone(e.target.value)}} />
//           <button onClick={handleFindCustomer}>Find Customer</button>
//         </div>
//       </div>
//       <div>
//         <span>Add items:</span>
//         <input type="text" placeholder='search item' value={searchProduct} onChange={handleonchangesearchproduct}/>
//         {filteredProducts.length>0 && (
//           <div>
//             {filteredProducts.map((product)=>{
//               return (
//                 <div  key={product._id}>
//                   <span onClick={()=>{
//                     setSearchProduct(product.name);
//                     setSelectedProduct(product);
//                     setFilteredProducts([]);
//                   }}>{product.name}</span>
//                 </div>
//               )
//             })}
//           </div>
//         )}
//         <input type="Number" value={quantity} onChange={(e)=>{setQuantity(Number(e.target.value))}} />
//         <button onClick={handleadditembutton}>Add item</button>
//         {cart.length>0 && (
//           <div >
//             <ul>
//               {cart.map((items,index)=>{
//                 const product=products.find((p)=>p._id===items.productId);
//                 return (
//                   <li key={index}>{product?.name} - {items.quantity}</li>
//                 )
//               })}
//             </ul>
//           </div>
//         )}
//         <button onClick={handlecreateinvoicebutton}>Create Invoice</button>
//       </div>
//     </div>

//   )
// }

// export default CreateInvoice


import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const CreateInvoice = () => {
  /* ================= CUSTOMER ================= */
  const [customers, setCustomers] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [mode, setMode] = useState("idle"); // idle | found | notfound

  const [showDialog, setShowDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  /* ================= PRODUCTS ================= */
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  /* ================= ITEMS ================= */
  const [items, setItems] = useState([]);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    const res = await api.get("/customers", { withCredentials: true });
    setCustomers(res.data.customers);
  };

  const fetchProducts = async () => {
    const res = await api.get("/products", { withCredentials: true });
    setProducts(res.data.products);
  };

  /* ================= FIND CUSTOMER ================= */
  const handleFindCustomer = () => {
    const found = customers.find(
      (c) => c.phone.toString() === searchPhone
    );

    if (found) {
      setSelectedCustomer(found);
      setMode("found");
      toast.success("Customer found");
    } else {
      setSelectedCustomer(null);
      setMode("notfound");
      toast.error("Customer not found");
    }
  };

  /* ================= ADD CUSTOMER ================= */
  const openAddCustomer = () => {
    setNewCustomer({
      name: "",
      phone: searchPhone,
      email: "",
    });
    setShowDialog(true);
  };

  const handleAddCustomer = async () => {
    const res = await api.post(
      "/customers",
      { ...newCustomer, phone: Number(newCustomer.phone) },
      { withCredentials: true }
    );

    setSelectedCustomer(res.data.customer);
    setShowDialog(false);
    setMode("found");
    fetchCustomers();
    toast.success("Customer added");
  };

  /* ================= PRODUCT SEARCH ================= */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  /* ================= ADD ITEM ================= */
  const addItem = () => {
    if (!selectedProduct || quantity <= 0) {
      toast.error("Select product & quantity");
      return;
    }

    setItems([
      ...items,
      { productId: selectedProduct._id, quantity: Number(quantity) },
    ]);

    setSelectedProduct(null);
    setProductSearch("");
    setQuantity(1);
  };

  /* ================= TRANSFORM BACKEND RESPONSE ================= */
  const transformInvoiceForUI = (invoice) => ({
    invoiceNumber: invoice.invoicenumber,
    customerId: invoice.customerId,
    items: invoice.items.map((item) => ({
      productName: item.productname,
      priceAtThatTime: item.priceatthattime,
      quantity: item.quantity,
      lineTotal: item.lineTotal,
    })),
    subTotal: invoice.subtotal,
    gstAmount: invoice.gst,
    grandTotal: invoice.total,
  });

  /* ================= CREATE INVOICE ================= */
  const createInvoice = async () => {
    const res = await api.post(
      "/invoice",
      {
        customerId: selectedCustomer._id,
        items,
      },
      { withCredentials: true }
    );

    const finalInvoice = transformInvoiceForUI(res.data.invoice);

    console.log("FINAL INVOICE (UI READY)", finalInvoice);
    toast.success("Invoice created");

    // reset
    setItems([]);
    setSelectedCustomer(null);
    setSearchPhone("");
    setMode("idle");
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      {/* SEARCH CUSTOMER */}
      <label className="font-semibold">Search Customer (Mobile)</label>
      <div className="flex gap-3 mb-4">
        <input
          className="border p-2 flex-1"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          placeholder="Enter mobile"
        />
        {mode !== "notfound" ? (
          <button onClick={handleFindCustomer} className="bg-blue-600 text-white px-4">
            Find
          </button>
        ) : (
          <button onClick={openAddCustomer} className="bg-green-600 text-white px-4">
            Add Customer
          </button>
        )}
      </div>

      {selectedCustomer && (
        <div className="p-3 bg-green-100 rounded mb-4">
          Selected: <b>{selectedCustomer.name}</b>
        </div>
      )}

      {/* ADD CUSTOMER DIALOG */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold mb-3">Add Customer</h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Name"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
            />
            <input className="border p-2 w-full mb-2" value={newCustomer.phone} disabled />
            <input
              className="border p-2 w-full mb-3"
              placeholder="Email"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDialog(false)}>Cancel</button>
              <button
                onClick={handleAddCustomer}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ITEMS */}
      <h2 className="font-semibold mt-6 mb-2">Add Items</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Search product"
        value={productSearch}
        onChange={(e) => {
          setProductSearch(e.target.value);
          setSelectedProduct(null);
        }}
      />

      {productSearch && !selectedProduct && (
        <div className="border mb-2 max-h-40 overflow-y-auto">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedProduct(p);
                setProductSearch(p.name);
              }}
            >
              {p.name} (Stock: {p.quantity})
            </div>
          ))}
        </div>
      )}

      <input
        type="number"
        className="border p-2 w-full mb-2"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />

      <button onClick={addItem} className="bg-gray-800 text-white px-4 py-2 mb-4">
        Add Item
      </button>

      <ul className="mb-4">
        {items.map((item, idx) => {
          const p = products.find((p) => p._id === item.productId);
          return (
            <li key={idx}>
              {p?.name} × {item.quantity}
            </li>
          );
        })}
      </ul>

      <button onClick={createInvoice} className="bg-green-600 text-white px-6 py-3">
        Create Invoice
      </button>
    </div>
  );
};

export default CreateInvoice;
