import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import NavMenu from "../Components/Nav";
import Footer from "../Components/FooterSection";

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    phone2: "",
    address: "",
    paymentMethod: "cod",
  });

  const total = cart.reduce((acc, item) => {
    return acc + Number(item.Price) * (item.quantity || 1);
  }, 0);

  const handleSubmit = async () => {
    if (!cart.length || total <= 0) {
      alert("Your cart is empty. Please add products before checkout.");
      return;
    }

    if (form.paymentMethod === "cod") {
      const res = await fetch("http://127.0.0.1:8002/api/payment/cod-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customer: form,
        }),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        window.location.href = "/payment-success"; 
      }
    }
    if (form.paymentMethod === "stripe") {
      const res = await fetch(
        "http://127.0.0.1:8002/api/payment/create-checkout-session/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            customer: form,
          }),
        },
      );

      const data = await res.json();
      window.location.href = data.url;
    }
  };
  return (
    <>
      <NavMenu />

      <div className="bg-[#f5f5f5] min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

            <input
              placeholder="Full Name"
              className="border rounded-lg w-full p-3 mb-3"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email Address"
              className="border rounded-lg w-full p-3 mb-3"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Phone Number"
              className="border rounded-lg w-full p-3 mb-3"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder="Second Phone (optional)"
              className="border rounded-lg w-full p-3 mb-3"
              onChange={(e) => setForm({ ...form, phone2: e.target.value })}
            />

            <textarea
              placeholder="Full Address"
              className="border rounded-lg w-full p-3 mb-3"
              rows="3"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <select
              className="border rounded-lg w-full p-3 mb-4"
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              <option value="cod">Cash on Delivery</option>
              <option value="stripe">Pay with Card (Stripe)</option>
            </select>

            <button
              onClick={handleSubmit}
              disabled={!cart.length || total <= 0}
              className={`w-full py-3 rounded-lg font-semibold transition
                 ${
                !cart.length || total <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white" }`} >
              Place Order
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <p className="max-w-[70%]">{item.Title}</p>
                  <p>AED {(item.Price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-600">AED {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CheckoutPage;
