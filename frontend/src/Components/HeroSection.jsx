import { useState, useEffect } from "react";


function HeroSection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/hero/`);
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching hero images:", error);
      }
    };

    fetchHeroImages();
  }, []);
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-1 text-center px-2 overflow-hidden">
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[440px] overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-[2000ms] ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((item, index) => (
            <img
              key={item.id}
              src={item.image}
              alt={`hero-${index}`}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] flex-shrink-0 object-cover"
            />
          ))}
        </div>
      </div>

      {images.length > 0 && (
        <div className="flex items-center justify-center space-x-4 border-t border-b border-gray-300 mt-1 py-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700"
          >
            ◀
          </button>

          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  currentIndex === index ? "bg-gray-700" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
