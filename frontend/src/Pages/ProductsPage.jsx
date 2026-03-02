import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import NavMenu from "../Components/Nav";
import Footer from "../Components/FooterSection";
import Searchbar from "../Components/Searchbar";
import { useCart } from "../context/CartContext";
const API_BASE = import.meta.env.VITE_API_URL;

function ProductsPage({ filterCategory }) {
  const { brandName } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [draftAvailability, setDraftAvailability] = useState("");
  const [draftPriceRange, setDraftPriceRange] = useState([0, 10000]);
  const [draftSortOption, setDraftSortOption] = useState("newest");
  const [draftCategory, setDraftCategory] = useState("");
  const [draftSearchTerm, setDraftSearchTerm] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 35; 

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");


  useEffect(() => {
    fetch("http://127.0.0.1:8002/api/home/")
      .then((res) => {
        if (!res.ok) throw new Error("Backend not found");
        return res.json();
      })
      .then((data) => {
        setProducts(data); 
      })
      .catch(() => {
        fetch("/products.json")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
          });
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchTerm(query);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);


  useEffect(() => {
    let updated = [...products];

    if (brandName) {
      updated = updated.filter((p) => {
        const brand = String(p.BrandName || "").toLowerCase();
        return brand === brandName.toLowerCase();
      });
    }

    const categoryFilter = filterCategory || category;
    if (categoryFilter) {
      if (categoryFilter.toLowerCase() === "sale") {
        updated = updated.filter((p) => p.VatPrice && p.VatPrice > p.Price);
      } else {
        updated = updated.filter((p) => {
          const cat = String( p.Categories || "").toLowerCase();
          return cat.includes(categoryFilter.toLowerCase());
        });
      }
    }

    if (availability === "in-stock") {
      updated = updated.filter((p) => p.InStock === true);
    } else if (availability === "out-stock") {
      updated = updated.filter((p) => p.InStock === false);
    }

    updated = updated.filter(
      (p) =>
        Number(p.Price) >= priceRange[0] && Number(p.Price) <= priceRange[1]
    );

    if (searchTerm.trim()) {
      updated = updated.filter((p) =>
        String(p.Title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "low-high") updated.sort((a, b) => a.Price - b.Price);
    if (sortOption === "high-low") updated.sort((a, b) => b.Price - a.Price);
    if (sortOption === "a-z")
      updated.sort((a, b) => String(a.Title).localeCompare(String(b.Title)));
    if (sortOption === "z-a")
      updated.sort((a, b) => String(b.Title).localeCompare(String(a.Title)));

    setFilteredProducts(updated);
    setCurrentPage(1); 
  }, [
    availability,
    priceRange,
    sortOption,
    searchTerm,
    category,
    products,
    brandName,
    filterCategory,
  ]);

  const applyFilters = () => {
    setAvailability(draftAvailability);
    setPriceRange(draftPriceRange);
    setSortOption(draftSortOption);
    setCategory(draftCategory);
    setSearchTerm(draftSearchTerm);
    setMobileFilterOpen(false);
  };

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <NavMenu />

      {searchOpen && (
        <Searchbar
          onClose={() => setSearchOpen(false)}
          products={products} 
        />
      )}

      <div className="w-full bg-[#F5F5F5] max-w-[90rem] mx-auto px-3 py-4 relative overflow-x-hidden">
        {mobileFilterOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>
        )}

        <div className="flex justify-between items-center mb-4 lg:hidden relative z-10">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 border px-3 py-2 rounded-md shadow-sm bg-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter & Sort</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 relative z-30 w-full overflow-hidden">
          <aside className="hidden lg:block w-64 bg-white shadow rounded-lg p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded p-2"
                value={draftSearchTerm}
                onChange={(e) => setDraftSearchTerm(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Availability</h3>
              <select
                className="w-full border rounded p-2"
                value={draftAvailability}
                onChange={(e) => setDraftAvailability(e.target.value)}
              >
                <option value="">All</option>
                <option value="in-stock">In Stock</option>
                <option value="out-stock">Out of Stock</option>
              </select>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Price</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-1/2 border rounded p-2"
                  value={draftPriceRange[0]}
                  onChange={(e) =>
                    setDraftPriceRange([+e.target.value, draftPriceRange[1]])
                  }
                />
                <input
                  type="number"
                  className="w-1/2 border rounded p-2"
                  value={draftPriceRange[1]}
                  onChange={(e) =>
                    setDraftPriceRange([draftPriceRange[0], +e.target.value])
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Sort by</h3>
              <select
                className="w-full border rounded p-2"
                value={draftSortOption}
                onChange={(e) => setDraftSortOption(e.target.value)}
              >
                <option value="newest">Date, new to old</option>
                <option value="a-z">Alphabetically, A-Z</option>
                <option value="z-a">Alphabetically, Z-A</option>
                <option value="low-high">Price, low to high</option>
                <option value="high-low">Price, high to low</option>
              </select>
            </div>

            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </aside>

          <div className="flex-1">
            <h1 className="text-xl font-semibold mb-4">
              {searchTerm.trim()
                ? `${searchTerm} (${filteredProducts.length})`
                : brandName
                  ? `${capitalizeWords(brandName)} Products (${
                      filteredProducts.length
                    })`
                  : filterCategory || category
                    ? `${capitalizeWords(filterCategory || category)} Products (${
                        filteredProducts.length
                      })`
                    : `All Products (${filteredProducts.length})`}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
              {currentProducts.map((product, i) => {
                const oldPrice = Number(product.VatPrice || product.Price || 0);
                const newPrice = Number(product.Price || 0);
                const discountPercent =
                  oldPrice > newPrice
                    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
                    : 0;

                return (
                  <Link
                    key={i}
                    to={`/product/${product.slug}`}
                    className="group relative bg-white rounded-lg border border-gray-200 shadow-sm p-2 flex flex-col h-full w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {discountPercent > 0 && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-30">
                        -{discountPercent}%
                      </span>
                    )}

                    <div className="w-full h-44 flex items-center justify-center mb-2 overflow-hidden relative">
                      <img
                        src={product.Link || "/placeholder.png"}
                        alt={product.Title}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                      ></img>
                    </div>

                    <div className="flex-1 text-left">
                      <h2 className="text-sm font-medium leading-tight line-clamp-2 group-hover:underline">
                        {product.Title}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.BrandName}
                      </p>
                      <div className="mt-1">
                        <p className="text-blue-700 font-bold">
                          Dhs. {newPrice.toFixed(2)}
                        </p>
                        {discountPercent > 0 && (
                          <p className="text-xs text-gray-500 line-through">
                            Dhs. {oldPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="w-3/4 max-w-sm bg-white h-full p-4 shadow-lg overflow-y-auto">
            <button
              className="mb-4 text-sm underline"
              onClick={() => setMobileFilterOpen(false)}
            >
              Close
            </button>
            <h2 className="text-lg font-semibold mb-4">Filter & Sort</h2>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded p-2"
                value={draftSearchTerm}
                onChange={(e) => setDraftSearchTerm(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Availability</h3>
              <select
                className="w-full border rounded p-2"
                value={draftAvailability}
                onChange={(e) => setDraftAvailability(e.target.value)}
              >
                <option value="">All</option>
                <option value="in-stock">In Stock</option>
                <option value="out-stock">Out of Stock</option>
              </select>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Price</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-1/2 border rounded p-2"
                  value={draftPriceRange[0]}
                  onChange={(e) =>
                    setDraftPriceRange([+e.target.value, draftPriceRange[1]])
                  }
                />
                <input
                  type="number"
                  className="w-1/2 border rounded p-2"
                  value={draftPriceRange[1]}
                  onChange={(e) =>
                    setDraftPriceRange([draftPriceRange[0], +e.target.value])
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Sort by</h3>
              <select
                className="w-full border rounded p-2"
                value={draftSortOption}
                onChange={(e) => setDraftSortOption(e.target.value)}
              >
                <option value="newest">Date, new to old</option>
                <option value="a-z">Alphabetically, A-Z</option>
                <option value="z-a">Alphabetically, Z-A</option>
                <option value="low-high">Price, low to high</option>
                <option value="high-low">Price, high to low</option>
              </select>
            </div>

            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ProductsPage;
