import HeroSection from "./HeroSection";
import HomePage from "../Pages/HomePage";
import Footer from "./FooterSection";
import NavMenu from "./Nav"; 

function NavBar() {
  return (
    <>
      <div className="w-full h-full bg-[#F5F5F5]">

        <NavMenu />
        <HeroSection />
        <HomePage />
        <Footer />
        
      </div>
    </>
  );
}

export default NavBar;
