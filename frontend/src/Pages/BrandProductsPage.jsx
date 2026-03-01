import { useParams } from "react-router-dom";
import ProductPage from "./ProductsPage";

function BrandProductsPage() {
  const { brandName } = useParams();
  return <ProductPage filterBrand={brandName} />; 
}

export default BrandProductsPage;
