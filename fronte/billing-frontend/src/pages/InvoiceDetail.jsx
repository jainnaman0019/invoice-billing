// import React, { use, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import api from '../api/axios';

// const InvoiceDetail = () => {
//     const [invoice, setInvoice] = React.useState(null);
//     const [shopname, setShopname] = React.useState("");
//     const [customername, setCustomername] = React.useState("");
//     const {invoiceId}= useParams(); //id hi use karna hai kuch aur variable nhi le sakta kyunki main.jsx mein tune id use kiya hai
//     console.log(`invoice id is ${invoiceId}`);

//     const FetchInvoice=async()=>{
        
//         try{
//             const res=await api.get(`/invoice/${invoiceId}`);
//             setInvoice(res.data.invoice);
                
//         }
//         catch(err){
//             console.log(err);
//         }
//     }

//     const fetchshopcustomer = async () => {
//     try {
//         const sh = await api.get('/details/shop');

//         const cu = await api.get(`/details/customer/${invoice.customerId}`);
//         console.log(sh.data.shopName);
//         console.log(cu.data.customerName);

//         setShopname(sh.data.shopName);
//         setCustomername(cu.data.customerName);

//     } catch (err) {
//         console.log(err);
//     }
// };

//     useEffect(() => {
//         FetchInvoice();
//     }, [invoiceId]);
    
//     useEffect(() => {
//         if (invoice) {
//             fetchshopcustomer();
//         }
//     }, [invoice]);
    
//   return (
//     <div className='min-h-screen w-full bg-slate-100 flex flex-row justify-center items-center'>
//       <div className='bg-white shadow-md w-[60%]'>
//         <div className='pl-5 pt-5 pb-4'>
//             <h2 className='text-gray-950 text-4xl text-pretty' >{shopname}</h2>
//         </div>
//         <div className='flex flex-row '>
//             <div className='bg-yellow-300 w-screen'></div>
//             <div className='mx-4'>
//                 <span className='text-black text-5xl'>INVOICE</span>
//             </div>
//             <div className='bg-yellow-300 w-[20%]'></div>
//         </div>
//         <div>
//             <div>
//                 <div>
//                     <h2 className='text-black'>Invoice to:</h2>
//                     <p className='text-black'>{customername}</p>
//                 </div>
//                 <div>
//                     <div>
//                         <span>Invoice#</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InvoiceDetail

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState(null);
  const [shopname, setShopname] = useState("");
  const [customername, setCustomername] = useState("");
  const [ownername, setOwnername] = useState("");

  const { invoiceId } = useParams();

  /* ================= FETCH INVOICE ================= */
  const FetchInvoice = async () => {
    try {
      const res = await api.get(`/invoice/${invoiceId}`);
      const ownername=await api.get('/details/owner');
      console.log("Invoice Data:", res.data.invoice); // DEBUG
      setInvoice(res.data.invoice);
        setOwnername(ownername.data.ownerName);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH SHOP + CUSTOMER ================= */
  const fetchshopcustomer = async (invoiceData) => {
    try {
      const sh = await api.get("/details/shop");
      const cu = await api.get(
        `/details/customer/${invoiceData.customerId}`
      );

      setShopname(sh.data.shopName);
      setCustomername(cu.data.customerName);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= USE EFFECTS ================= */
  useEffect(() => {
    FetchInvoice();
  }, [invoiceId]);

  useEffect(() => {
    if (invoice) {
      fetchshopcustomer(invoice);
    }
  }, [invoice]);

  /* ================= LOADING ================= */
  if (!invoice) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading Invoice...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">
      <div className="bg-white w-[65%] shadow-xl">

        {/* ================= HEADER ================= */}
        <div className="p-8">

          <h1 className="text-3xl font-bold text-gray-800">
            {shopname}
          </h1>

          <div className="flex items-center mt-4">
            <div className="h-3 bg-yellow-400 flex-1"></div>
            <h2 className="text-4xl font-semibold mx-4 tracking-wider text-black">
              INVOICE
            </h2>
            <div className="h-3 bg-yellow-400 w-32"></div>
          </div>

          {/* ================= CUSTOMER + INFO ================= */}
          <div className="flex justify-between mt-8">

            <div>
              <h3 className="font-semibold text-gray-700">
                Invoice To:
              </h3>
              <p className="text-gray-900 text-lg">
                {customername}
              </p>
            </div>

            <div className="text-right">
              <p>
                <span className="font-semibold">Invoice#:</span>{" "}
                {invoice.invoicenumber}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* ================= TABLE ================= */}
          <div className="mt-8 border border-gray-300">

            {/* TABLE HEADER */}
            <div className="grid grid-cols-5 bg-gray-800 text-white font-semibold p-3">
              <div>SL</div>
              <div>Item Description</div>
              <div>Price</div>
              <div>Qty</div>
              <div>Total</div>
            </div>

            {/* TABLE BODY */}
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, index) => (
                <div
                  key={item._id}
                  className={`grid grid-cols-5 p-3 border-t text-gray-800 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <div>{index + 1}</div>
                  <div>{item.productname}</div>
                  <div>₹{item.priceatthattime}</div>
                  <div>{item.quantity}</div>
                  <div>₹{item.lineTotal}</div>
                </div>
              ))
            ) : (
              <div className="p-5 text-center text-gray-500">
                No items found
              </div>
            )}
          </div>

          {/* ================= TOTAL SECTION ================= */}
          <div className="flex justify-end mt-6">
            <div className="w-72">

              <div className="flex justify-between py-1 text-black">
                <span>Sub Total:</span>
                <span>₹{invoice.subtotal}</span>
              </div>

              <div className="flex justify-between py-1 text-black">
                <span>GST:</span>
                <span>₹{invoice.gst}</span>
              </div>

              <div className="flex justify-between bg-yellow-400 text-black font-bold p-3 mt-2">
                <span>Total:</span>
                <span>₹{invoice.total}</span>
              </div>

            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="mt-12 flex justify-between text-sm text-gray-600">
            <div>
              <p>Thank you for your business</p>
            </div>

            <div className="text-right">
               <p className="text-black">{ownername}</p> 
              <p>Authorised Sign</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
