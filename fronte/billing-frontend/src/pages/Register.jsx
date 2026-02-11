import React from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Login from "./login";

const Register = () => {
  const [name, setName] = React.useState("");
  const [shopName, setShopName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
    const Navigate = useNavigate();

  const handleSubmitButton = async(e) => {
    e.preventDefault();
    console.log(name, email, password, shopName);
    try{
        const res=await api.post('/auth/register', {name, email, password, shopName});
        console.log('Registration successful:', res.data);
        toast.success('Registration successful! Please login to continue.');
            Navigate("/login")
    }
    catch(error){
      console.error('Registration error:', error);
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-black text-3xl">Login Page</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmitButton}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="ShopName"
            value={shopName}
            onChange={(e) => {
                setShopName(e.target.value);
            }}
            required
            className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
