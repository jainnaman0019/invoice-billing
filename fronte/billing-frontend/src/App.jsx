import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/protectedRoute";
import Viewinvoices from "./pages/Viewinvoices";
import CreateInvoice from "./pages/CreateInvoice";
import Addproduct from "./pages/Addproduct";
import ViewProducts from "./pages/ViewProducts";
import ViewCustomers from "./pages/ViewCustomers";
import toast from "react-hot-toast";
import InvoiceDetail from "./pages/InvoiceDetail";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/invoices",
    element: (
      <ProtectedRoute>
        <Viewinvoices />
      </ProtectedRoute>
    ),
  },
  {
    path: "/invoices/new",
    element: (
      <ProtectedRoute>
        <CreateInvoice />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <ViewProducts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products/new",
    element: (
      <ProtectedRoute>
        <Addproduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/customers",
    element: (
      <ProtectedRoute>
        <ViewCustomers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/invoices/:invoiceId",
    element: (
      <ProtectedRoute>
        <InvoiceDetail />
      </ProtectedRoute>
    ),
  }
]);

function App() {
 
  return <RouterProvider router={router} />;
}

export default App;
