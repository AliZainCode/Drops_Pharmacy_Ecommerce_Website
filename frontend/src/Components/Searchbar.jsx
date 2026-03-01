import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import search from "../assets/images/search.png";
import cross from "../assets/images/cross.png";

function Searchbar({ onClose, products = [] }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = products
        .filter((p) =>
          String(p?.Title || "")
            .toLowerCase()
            .includes(query.toLowerCase().trim())
        )
        .slice(0, 8);
      setSuggestions(filtered);
    }
  }, [query, products]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      onClose?.();
    }
  };

  const handleSuggestionClick = (title) => {
    navigate(`/products?search=${encodeURIComponent(title)}`);
    onClose?.();
  };

  return (
    <div className="w-full bg-[#0A3077] flex flex-col items-center py-2 px-3 sm:px-4 relative">
      <div className="flex items-center w-full sm:w-[90%] max-w-[800px] h-[48px] border-2 border-white rounded-lg px-3 sm:px-4 bg-[#0A3077]">
        <img className="w-6 h-6 mr-3" src={search} alt="search" />

        <input
          className="flex-1 text-base text-white placeholder-gray-300 focus:outline-none bg-transparent"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
        />

        <img
          className="w-6 h-6 ml-3 cursor-pointer hover:scale-110 transition"
          src={cross}
          alt="close"
          onClick={onClose}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-[100%] mt-3 w-full sm:w-[90%] max-w-[850px] bg-white rounded-2xl shadow-2xl z-50 p-4">
          <h3 className="text-gray-700 font-semibold mb-3">
            Trending Products
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-2 border rounded-lg hover:shadow-md transition cursor-pointer"
                onClick={() => handleSuggestionClick(product.Title)}
              >
                <img
                  src={product.Link || "/placeholder.png"}
                  alt={product.Title}
                  className="w-14 h-14 object-contain rounded-md border"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {product.Title}
                  </p>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {product.DiscountPrice ? (
                      <>
                        <p className="text-red-600 font-semibold text-sm">
                          AED {Number(product.DiscountPrice).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          AED {Number(product.Price).toFixed(2)}
                        </p>
                        <span className="text-green-600 text-xs font-medium border border-green-500 rounded px-1">
                          Flat{" "}
                          {Math.round(
                            100 - (product.DiscountPrice / product.Price) * 100
                          )}
                          % OFF
                        </span>
                      </>
                    ) : (
                      <p className="text-blue-600 font-semibold text-sm">
                        AED {Number(product.Price).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <button className="w-8 h-8 flex items-center justify-center border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
