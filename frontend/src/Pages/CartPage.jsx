import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import NavMenu from "../Components/Nav";
import { API } from "../services/api";
import Footer from "../Components/FooterSection";
import { useNavigate } from "react-router-dom";



function CartPage() {
  
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((acc, item) => {
    const price = parseFloat(item.Price) || 0; 
    const qty = item.quantity || 1; 
    return acc + price * qty;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-[#f9fafb] min-h-screen">
        <NavMenu />

        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="max-w-4xl w-full p-10 text-center bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">🛒 Your Cart is Empty</h2>

            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${API}/payment/create-checkout-session/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart,
          }),
        },
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      <NavMenu />
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-6 py-8 bg-white shadow-lg rounded-xl mt-8">
          <h1 className="text-3xl font-bold mb-6 border-b pb-3">
            Shopping Cart
          </h1>

          <div className="space-y-6">
            {cart.map((item) => {
              const oldPrice =
                parseFloat(item.VatPrice) || parseFloat(item.Price) || 0;
              const newPrice = parseFloat(item.Price) || 0;
              const discountPercent =
                oldPrice > newPrice
                  ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
                  : 0;
              const qty = item.quantity || 1;
              const subtotal = newPrice * qty;

              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-6 border-b pb-6 last:border-none"
                >
                  <img
                    src={item.Link || "/placeholder.png"}
                    alt={item.Title}
                    className="h-24 w-24 object-contain border rounded-lg shadow-sm"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.Title}</h2>

                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-blue-700 font-bold text-lg">
                        AED {newPrice.toFixed(2)}
                      </p>
                      {discountPercent > 0 && (
                        <>
                          <p className="text-sm text-gray-500 line-through">
                            AED {oldPrice.toFixed(2)}
                          </p>
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {discountPercent}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, qty - 1))
                          }
                          className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 text-lg font-medium text-gray-800 bg-white">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, qty + 1)}
                          className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-blue-700 text-lg">
                    AED {subtotal.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-8">
            <div className="text-right">
              <h2 className="text-2xl font-bold">
                Total:{" "}
                <span className="text-green-600">AED {total.toFixed(2)}</span>
              </h2>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-5 bg-green-600 text-white px-8 py-3 rounded-xl"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;


