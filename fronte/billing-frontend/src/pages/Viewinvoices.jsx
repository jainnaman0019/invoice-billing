import React, { useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


const Viewinvoices = () => {
  const [invoices, setInvoices] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const navigate = useNavigate();

  const fetchinvoices = async () => {
    try {
      const res = await api.get("/invoice");
      console.log(res.data.invoices);
      setInvoices(res.data.invoices);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      console.log(res.data.customers);
      setCustomers(res.data.customers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleviewbutton = (invoice)=>{
      
    return ()=>{
      navigate(`/invoices/${invoice._id}`)
    }
  }

  useEffect(() => {
    fetchinvoices();
    fetchCustomers();
  }, []);
  return (
    <div className="min-h-screen pt-4 pl-4 w-full">
      <div className="flex flex-col justify-end h-[80px] gap-2">
        <h2 className="text-white text-4xl">Invoices</h2>
        <p className="text-gray-400">View all invoices of your shop</p>
      </div>
      <div className="h-px bg-gray-700 my-5" />
      <div >
        <p className="pb-3">
          showing {invoices.length} invoices
        </p>

        <div className="grid grid-rows-1 grid-cols-5 w-full bg-zinc-600 h-10 rounded-t-md ">
          <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg ">
            Invoice id
          </div>
          <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg">
            Customer name
          </div>
          <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg">
            Created at
          </div>
          <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg">
            Total amount
          </div>
          <div className="w-28">

          </div>
        </div>

        <div>
          {invoices.length > 0 &&
            invoices.map((invoice, index) => {
              return (
                <div>
                  <div
                  key={index}
                  className="grid grid-rows-1 grid-cols-5 w-full  h-10 rounded-t-md "
                >
                  <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg ">
                    {invoice.invoicenumber}
                  </div>
                  <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg">
                    {customers.find(
                      (customer) => invoice.customerId === customer._id
                    )?.name || "N/A"}
                  </div>
                  <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg">
                    {invoice.createdAt}
                  </div>
                  <div className="text-gray-400 flex flex-col justify-center ml-2 text-lg">
                    {invoice.total}
                  </div>
                  <button className="w-28" onClick={handleviewbutton(invoice)}>View</button>
                </div>
                  <div className="h-px bg-gray-700 my-2" />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Viewinvoices;
