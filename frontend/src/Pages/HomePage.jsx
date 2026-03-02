import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { API } from "../services/api";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const catScrollRef = useRef(null);
  const [catPage, setCatPage] = useState(1);
  const [catTotalPages, setCatTotalPages] = useState(1);

  useEffect(() => {
     fetch(`${API}/collections/`)
       .then((res) => res.json())
       .then((data) => setCategories(data));

    fetch(`${API}/brands/`)
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);


  useEffect(() => {
    if (categories.length > 0) {
      setCatTotalPages(categories.length);
    }
  }, [categories]);

  const handleCatScroll = () => {
    const container = catScrollRef.current;
    if (!container) return;

    const itemWidth = container.firstChild?.offsetWidth || 1;
    const page = Math.round(container.scrollLeft / itemWidth) + 1;
    setCatPage(page);
  };

  const babyBrands = brands.filter((b) => b.category?.toLowerCase() === "baby");
  const skinCareBrands = brands.filter(
    (b) => b.category?.toLowerCase() === "skin care"
  );
  const wellnessBrands = brands.filter(
    (b) => b.category?.toLowerCase() === "wellness"
  );

  const BrandSection = ({ title, items }) => {
    const scrollRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      if (items.length > 0) {
        setTotalPages(items.length);
      }
    }, [items]);

    const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;

      const itemWidth = container.firstChild?.offsetWidth || 1;
      const scrollLeft = container.scrollLeft;
      const page = Math.round(scrollLeft / itemWidth) + 1;
      setCurrentPage(page);
    };

    return (
      <div className="mt-10 relative bg-[#F5F5F5]">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth lg:hidden"
        >
          {items.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${encodeURIComponent(brand.name)}`}
              className="bg-white rounded-xl flex-shrink-0 
                         w-[10rem] sm:w-auto 
                         h-[12rem] sm:h-[13rem] md:h-[22rem] 
                         md:w-[20rem] 
                         shadow hover:shadow-lg p-3 flex flex-col items-center transition-all duration-300"
            >
              <div className="overflow-hidden w-full h-[17rem] flex justify-center items-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-[17rem] object-contain transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="mt-3 font-semibold flex items-center gap-1 text-gray-700 sm:text-lg md:text-3xl lg:text-5xl">
                {brand.name}
                <span className="block md:hidden">
                  <ArrowRight size={14} />
                </span>
                <span className="hidden md:block mt-1 pl-2">
                  <ArrowRight size={26} />
                </span>
              </p>
            </Link>
          ))}
        </div>

        <div className="hidden lg:grid grid-cols-5 gap-6">
          {items.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${encodeURIComponent(brand.name)}`}
              className="bg-white rounded-xl h-[14rem] 
                         shadow hover:shadow-lg p-3 flex flex-col items-center transition-all duration-300"
            >
              <div className="overflow-hidden w-full h-[9rem] flex justify-center items-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-[7rem] object-contain transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="mt-3 font-semibold flex items-center gap-2 text-gray-700 text-xl ">
                {brand.name}
                <span className="mt-1 pl-2">
                  <ArrowRight size={18} />
                </span>
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-2 lg:hidden">
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
            }
            className="text-gray-500 hover:text-gray-700 text-md"
          >
            ◀
          </button>

          <p className="text-gray-700 text-sm">
            {currentPage} / {totalPages}
          </p>

          <button
            onClick={() =>
              scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
            }
            className="text-gray-500 hover:text-gray-700 text-md"
          >
            ▶
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 bg-[#F5F5F5] overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
      <div className="relative">
        <div
          ref={catScrollRef}
          onScroll={handleCatScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth lg:hidden"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${encodeURIComponent(cat.category)}`}
              className="bg-white rounded-xl flex-shrink-0 
                         w-[11rem] sm:w-auto
                         h-[13rem] sm:h-[15rem] md:h-[22rem] md:w-[19rem]
                         shadow hover:shadow-lg p-1 flex flex-col items-center transition-all duration-300"
            >
              <div className="overflow-hidden rounded-t-xl w-full h-[18rem] flex justify-center items-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="mt-3 font-semibold flex items-center gap-1 text-gray-700 sm:text-lg md:text-3xl lg:text-5xl">
                {cat.name}
                <span className="block md:hidden">
                  <ArrowRight size={14} />
                </span>
                <span className="hidden md:block mt-1 pl-2">
                  <ArrowRight size={26} />
                </span>
              </p>
            </Link>
          ))}
        </div>

        <div className="hidden lg:grid grid-cols-5 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${encodeURIComponent(cat.category)}`} 
              className="bg-white rounded-xl h-[18rem] 
                         shadow hover:shadow-lg p-1 flex flex-col items-center transition-all duration-300"
            >
              <div className="overflow-hidden rounded-t-xl w-full h-56 flex justify-center items-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="mt-3 font-semibold flex items-center gap-2 text-gray-700 text-xl ">
                {cat.name}
                <span className="mt-1 pl-2">
                  <ArrowRight size={18} />
                </span>
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-2 lg:hidden">
          <button
            onClick={() =>
              catScrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
            }
            className="text-gray-500 hover:text-gray-700 text-md"
          >
            ◀
          </button>

          <p className="text-gray-700 text-sm">
            {catPage} / {catTotalPages}
          </p>

          <button
            onClick={() =>
              catScrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
            }
            className="text-gray-500 hover:text-gray-700 text-md"
          >
            ▶
          </button>
        </div>
      </div>

      <BrandSection title="Baby Popular Brands" items={babyBrands} />
      <BrandSection title="Skin Care Popular Brands" items={skinCareBrands} />
      <BrandSection title="Wellness Popular Brands" items={wellnessBrands} />
    </div>
  );
}

export default HomePage;
