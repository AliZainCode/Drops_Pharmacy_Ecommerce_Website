import { useEffect, useState } from "react";
import NavMenu from "../Components/Nav";
import Footer from "../Components/FooterSection";


export default function ContactPage() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact-banner/`)
      .then((res) => res.json())
      .then((data) => {
        const contactBanner = data.find((item) => item.category === "contact");
        setBanner(contactBanner);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <NavMenu />
      <div className="w-full">
        {banner ? (
          <img
            src={banner.image}
            alt="Contact Banner"
            className="w-full object-fit m-0 p-0 
                 h-50 sm:h-64 md:h-90 lg:h-[550px]"
          />
        ) : ( 
          <div className="w-full h-48 sm:h-64 md:h-80 lg:h-[500px] flex items-center justify-center bg-gray-100">
            Loading...
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Questions or comments? Get in touch and we'll be happy to help.
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          <input
            type="text"
            placeholder="Phone number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
          <textarea
            placeholder="Comment"
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
