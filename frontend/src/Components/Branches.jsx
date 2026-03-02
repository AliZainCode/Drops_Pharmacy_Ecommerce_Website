import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BranchSlider({ isSearching }) {
  const [branches, setBranches] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/branch-slider/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBranches(data);
      });
  }, []);

  useEffect(() => {
    if (branches.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [branches]);

  const handlePrev = () => {
    if (branches.length === 0) return;
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + branches.length) % branches.length);
      setFade(true);
    }, 600);
  };

  const handleNext = () => {
    if (branches.length === 0) return;
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % branches.length);
      setFade(true);
    }, 600);
  };

  if (branches.length === 0) {
    return (
      <div className="w-full py-2 text-center text-gray-500">
        Loading branches...
      </div>
    );
  }

  return (
    <div
      className={`relative w-full bg-white border-b border-gray-200 flex items-center justify-center transition-all duration-500 overflow-hidden
        ${
          isSearching
            ? "h-[25px] blur-sm opacity-50 pointer-events-none mt-6" 
            : "h-[50px] opacity-100 mt-0"
        }
      `}
    >

      <button
        onClick={handlePrev}
        className="absolute left-4 text-gray-600 hover:text-blue-600"
      >
        <ChevronLeft size={20} />
      </button>

      <p
        className={`text-gray-800 text-[16px] font-medium transition-all duration-700 ease-in-out transform ${
          fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
        }`}
      >
        {branches[current].name} {branches[current].phone}
        <span className="ml-2 cursor-pointer">→</span>
      </p>

      <button
        onClick={handleNext}
        className="absolute right-4 text-gray-600 hover:text-blue-600"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default BranchSlider;
