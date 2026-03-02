import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import NavMenu from "../Components/Nav";
import Footer from "../Components/FooterSection";
import { CartContext } from "../context/CartContext";

function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/product/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        fetch(`${import.meta.env.VITE_API_URL}/api/home/`)
          .then((res) => res.json())
          .then((allProducts) => {
            let related = allProducts.filter(
              (p) =>
                p.slug !== data.slug &&
                p.Categories &&
                p.Categories === data.Categories,
            );

            if (related.length === 0) {
              related = allProducts.filter(
                (p) =>
                  p.slug !== data.slug &&
                  p.BrandName &&
                  p.BrandName === data.BrandName,
              );
            }

            related = related.sort(() => 0.5 - Math.random()).slice(0, 5);
            setRelatedProducts(related);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [slug]);

  if (!product) {
    return (
      <>
        <NavMenu />
        <div className="max-w-7xl mx-auto p-6 text-center">Loading...</div>
        <Footer />
      </>
    );
  }

  const oldPrice = Number(product.VatPrice || product.Price || 0);
  const newPrice = Number(product.Price || 0);
  const discountPercent =
    oldPrice > newPrice
      ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
      : 0;

  const images =
    Array.isArray(product.GalleryImages) && product.GalleryImages.length > 0
      ? product.GalleryImages
      : typeof product.GalleryImages === "string" &&
        product.GalleryImages.trim() !== "0"
      ? product.GalleryImages.split(",").map((img) => img.trim())
      : [product.Link || "/placeholder.png"];

      
  const handleAddToCart = (item, qty = 1) => {
    addToCart(item, qty);
  };

  return (
    <div className="bg-[#f5f5f5] ">
      <NavMenu />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow rounded-lg mt-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col items-center relative">
              <div className="border rounded-md mb-4 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage || product.Link || "/placeholder.png"}
                  alt={product.Title}
                  className="max-h-96 object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className={`h-20 w-20 object-contain border rounded-md cursor-pointer ${
                        selectedImage === img
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-2">{product.Title}</h1>
              <p className="text-gray-500 mb-4 underline">
                {product.BrandName}
              </p>

              <div className="mb-4 flex items-center gap-2">
                <p className="text-blue-700 text-xl font-bold">
                  AED {(Number(newPrice) * quantity).toFixed(2)}
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

              <p className="mb-4">
                {product.Descriptions || "No description available."}
              </p>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-lg font-medium text-gray-800 bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(product, quantity)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
                >
                  ADD TO CART
                </button>
              </div>

              <p className="text-gray-700 font-medium">
                Total:{" "}
                <span className="text-blue-700 font-bold">
                  AED {(newPrice * quantity).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch">
              {relatedProducts.map((item) => {
                const oldPrice = Number(item.VatPrice || item.Price || 0);
                const newPrice = Number(item.Price || 0);
                const discountPercent =
                  oldPrice > newPrice
                    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
                    : 0;

                return (
                  <div
                    key={item.slug}
                    className="border rounded-lg p-3 hover:shadow-lg transition bg-white relative flex flex-col h-full min-h-[230px]"
                  >
                    {discountPercent > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1 py-1 rounded">
                        {discountPercent}% OFF
                      </span>
                    )}

                    <Link to={`/product/${item.slug}`}>
                      <img
                        src={item.Link || "/placeholder.png"}
                        alt={item.Title}
                        className="h-32 w-full object-contain mb-2"
                      />

                      <h3 className="text-sm font-semibold line-clamp-2 min-h-[42px]">
                        {item.Title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-auto">
                      <p className="text-blue-700 font-bold text-sm">
                        AED {newPrice.toFixed(2)}
                      </p>

                      {discountPercent > 0 && (
                        <p className="text-xs text-gray-500 line-through">
                          AED {oldPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(item, 1)}
                      className="mt-2 bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 transition font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
