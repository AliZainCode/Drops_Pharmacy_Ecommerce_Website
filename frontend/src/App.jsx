import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FirstMain from "./Components/FirstMain";
import ContactPage from "./Pages/Contact";
import ProductsPage from "./Pages/ProductsPage";
import BrandProductsPage from "./Pages/BrandProductsPage";
import ScrollToTop from "./Components/ScrollToTop";
import CategoryProductsPage from "./Pages/CategoryProductsPage";
import ProductDetailPage from "./Pages/ProductDetailPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import { CartProvider } from "./context/CartContext";
import PaymentSuccess from "./Pages/PaymentSuccess";
import CheckoutPage from "./Pages/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<FirstMain />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/brand/:brandName" element={<BrandProductsPage />} />
          <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
