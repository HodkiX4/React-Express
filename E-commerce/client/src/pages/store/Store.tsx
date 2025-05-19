import { useState } from "react";
import style from "./Store.module.css";
import Products from "../../components/products/Products";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import useProducts from "../../hooks/useProducts";
import Filters from "../../components/products/filters/Filters";

const Store = () => {
  const { products, categories, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Use the custom hook to get the filtered products
  const filteredProducts = useFilteredProducts({
    products,
    selectedCategory,
    sortOrder,
    searchQuery,
  });

  return (
    <div className={style.storePage}>
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        filteredProducts.length ? (
          <Products products={filteredProducts}/>
        ) : (
          <h1>No products found</h1>
        )
      )}
    </div>
  );
};

export default Store;
