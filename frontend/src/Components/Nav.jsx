import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import BranchSlider from "./Branches";
import SideMenu from "./MenuSection";
import menu from "../assets/images/menu.png";
import logo from "../assets/images/logo.png";
import search from "../assets/images/search.png";
import addtocart from "../assets/images/addtocart.png";
import DeliveryFree from "./DeliveryFree";
import { useCart } from "../context/CartContext";

export default function NavMenu() {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);


  return (
    <>
      <DeliveryFree />

      <nav className="navbar sticky top-0 z-50 w-full h-[56px] sm:h-[54px] md:h-[60px] bg-[#0A3077] shadow-md">
        {showSearch ? (
          <Searchbar onClose={() => setShowSearch(false)} />
        ) : (
          <div className="flex w-full h-full px-4 sm:px-4">
            <div className="flex w-1/3 items-center">
              <button
                onClick={() => setMenuOpen(true)}
                className="flex items-center"
              >
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer"
                  src={menu}
                  alt="menu"
                />
              </button>
            </div>

            <div className="flex w-1/3 items-center justify-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold gap-2">
              <Link to="/" className="flex items-center">
                <img
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  src={logo}
                  alt="logo"
                />
                <span className="hidden sm:inline">Drops Pharmacy</span>
              </Link>
            </div>

            <div className="flex w-1/3 items-center justify-end gap-3 sm:gap-4 md:gap-5">
              <div className="hidden sm:block text-xs sm:text-sm text-white border-b border-gray-600">
                <p>English</p>
              </div>

              <div>
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer"
                  src={search}
                  alt="search"
                  onClick={() => setShowSearch(true)}
                />
              </div>
              <div className="relative">
                <Link to="/cart">
                  <img
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer"
                    src={addtocart}
                    alt="cart"
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <BranchSlider />
    </>
  );
}
