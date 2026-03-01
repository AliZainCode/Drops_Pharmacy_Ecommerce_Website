import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [branchesRes, contactsRes, downloadsRes, paymentsRes] =
          await Promise.all([
            fetch("http://127.0.0.1:8002/api/branches/"),
            fetch("http://127.0.0.1:8002/api/contacts/"),
            fetch("http://127.0.0.1:8002/api/downloads/"),
            fetch("http://127.0.0.1:8002/api/payments/"),
          ]);

        const branchesData = await branchesRes.json();
        const contactsData = await contactsRes.json();
        const downloadsData = await downloadsRes.json();
        const paymentsData = await paymentsRes.json();

        console.log("Branches API:", branchesData);

        const groupedBranches = {
          abuDhabi: branchesData.filter(
            (b) => b.city === "abuDhabi" || b.city === "Abu Dhabi",
          ),
          alAin: branchesData.filter(
            (b) => b.city === "alAin" || b.city === "Al Ain",
          ),
        };

        setData({
          branches: groupedBranches,
          contacts: contactsData,
          downloads: downloadsData,
          payments: paymentsData,
        });
      } catch (error) {
        console.error("Footer API Error:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!data) return null; 

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-xl mb-3 text-[#505050]">
              Abu Dhabi Branches
            </h3>
            <ul className="space-y-2 text-sm">
              {data.branches?.abuDhabi?.map((b, i) => (
                <li key={i}>
                  <a
                    href={`tel:${b.phone}`}
                    className="underline font-futura text-md font-bold text-[rgba(0,17,40,0.85)]"
                  >
                    {b.name} {b.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 text-[#505050]">
              Al Ain Branches
            </h3>
            <ul className="space-y-2 text-sm">
              {data.branches?.alAin?.map((b, i) => (
                <li key={i}>
                  <a
                    href={b.phone ? `tel:${b.phone}` : "#"}
                    className="underline font-futura text-md font-bold text-[rgba(0,17,40,0.85)]"
                  >
                    {b.name} {b.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 text-[#505050]">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              {data.contacts.map((c, i) => (
                <li key={i}>
                  <a
                    href={c.link}
                    className="hover:underline font-futura text-md font-bold text-[rgba(0,17,40,0.85)]"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start md:pl-12">
            <h3 className="font-semibold text-lg mb-3">Download App</h3>
            <div className="flex space-x-3 md:block md:w-[7rem]">
              {data.downloads.map((d, i) => (
                <img key={i} src={d.img} alt={d.label} className="h-12" />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe size={18} />
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>English</option>
              <option>Arabic</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {data.payments.map((p, i) => (
              <img key={i} src={p.img} alt={p.alt} className="h-8" />
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          © 2025, Drops Pharmacy · Privacy Policy · Terms of Service
        </div>
      </div>
    </footer>
  );
}
