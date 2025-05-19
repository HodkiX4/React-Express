import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./pages/auth/Signup"
import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import NotFound from "./pages/not-found/NotFound"
import { Toaster } from "react-hot-toast"
import ProtectedLayout from "./layouts/ProtectedLayout"
import Store from "./pages/store/Store"
import PublicLayout from "./layouts/PublicLayout"
import Header from "./components/header/Header"
import ProductDetail from "./pages/product/Product"
import Profile from "./pages/profile/Profile"
import Cart from "./pages/cart/Cart"
import './index.css'
import { MdCheckBox, MdError } from "react-icons/md"
import Checkout from "./pages/checkout/Checkout"
import Order from "./pages/order/Order"
import useProducts from "./hooks/useProducts"
import { useEffect } from "react"
function App() {
  const { fetchProducts, products } = useProducts();
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);
  return (
    <>
    <Router>
      <Header/>
      <main className="outlet">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          <Route element={<PublicLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="/protected/cart" element={<Cart />} />
            <Route path="/protected/checkout" element={<Checkout />} />
            <Route path="/protected/profile" element={<Profile />} />
            <Route path="/protected/order/:orderId" element={<Order />} />
          </Route>

          <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
    </Router>
    <Toaster
      position="bottom-left"
      toastOptions={{
        className: 'toaster',
        removeDelay: 1000,
        success: {
          duration: 2500,
          className: 'toaster success-toast',
          icon: <MdCheckBox />
        },
        error: {
          duration: 5000,
          className: 'toaster error-toast',
          icon: <MdError />
        },
      }}
    />
    </>
  )
}

export default App