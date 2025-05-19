import { useState, useEffect } from "react";
import { IProduct } from "../models/product.model";

interface UseFilteredProductsProps {
  products: IProduct[];
  selectedCategory: string;
  sortOrder: string;
  searchQuery: string;
}

const useFilteredProducts = ({
  products,
  selectedCategory,
  sortOrder,
  searchQuery,
}: UseFilteredProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, sortOrder, searchQuery, products]);

  return filteredProducts;
};

export default useFilteredProducts;