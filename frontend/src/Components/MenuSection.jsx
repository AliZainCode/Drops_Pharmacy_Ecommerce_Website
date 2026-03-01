import React from "react";
import { X } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SideMenu({ open, onClose }) {
  const navigate = useNavigate(); 

  const handleNavClick = (path) => {
    navigate(path);
    onClose(); 
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-1/2 md:w-1/3 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 text-gray-800 font-medium text-xl">
          <button
            className="text-left hover:bg-gray-100 hover:underline p-2 rounded"
            onClick={() => handleNavClick("/")}
          >
            Home
          </button>

          <button
            className="text-left hover:bg-gray-100 hover:underline p-2 rounded"
            onClick={() => handleNavClick("/products")}
          >
            Products
          </button>

          <button
            className="text-left hover:bg-gray-100 hover:underline p-2 rounded"
            onClick={() => handleNavClick("/contact")}
          >
            Contact
          </button>
        </nav>

        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6 text-gray-700">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook size={22} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={22} />
          </a>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-gray-200/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}
