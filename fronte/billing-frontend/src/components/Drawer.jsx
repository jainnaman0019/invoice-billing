import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Drawer = ({ name, open, onclose }) => {
  if (!open) return null; // 🔧 CHANGE 1

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      toast.success("Logout successful!");
      navigate("/login");
      onclose(); // 🔧 CHANGE 2
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  console.log("Drawer rendered with name:", name);
  const menuItemClass =
    "flex justify-center items-center py-2 rounded-md shadow-sm bg-gray-800 text-white hover:bg-gray-700 transition";

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* 🔧 CHANGE 3: Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40"
        onClick={onclose}
      ></div>

      {/* 🔧 CHANGE 4: Drawer panel */}
      <div className="relative w-64 bg-white h-full shadow-lg p-4">
        <nav className="flex flex-col justify-between h-full">
          {/* Top */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-black">Hello {name} 👋</h2>

            <ul className="flex flex-col gap-3">
              <li className={menuItemClass}>
                <Link to="/" onClick={onclose}>Dashboard</Link>
              </li>

              <li className={menuItemClass}>
                <Link to="/invoices" onClick={onclose}>
                  📄 View Invoices
                </Link>
              </li>

              <li className={menuItemClass}>
                <Link to="/invoices/new" onClick={onclose}>
                  ➕ Create Invoice
                </Link>
              </li>

              {/* <li className={menuItemClass}>
                <Link to="/customers" onClick={onclose}>
                📄 View Customers
                </Link>
              </li> */}

              <li className={menuItemClass}>
                <Link to="/products" onClick={onclose}>
                  📦 View Products
                </Link>
              </li>

              <li className={menuItemClass}>
                <Link to="/profile" onClick={onclose}>
                  👤 Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom */}
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-6 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Drawer;
