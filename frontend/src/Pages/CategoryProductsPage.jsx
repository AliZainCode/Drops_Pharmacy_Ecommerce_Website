import { useParams } from "react-router-dom";
import ProductsPage from "./ProductsPage";

function CategoryProductsPage() {
  const { categoryName } = useParams();
  return <ProductsPage filterCategory={categoryName} />;
}

export default CategoryProductsPage;
