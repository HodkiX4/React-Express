import { useProductStore } from '../store/productStore';
import { fetchProductsData, getProductByIdApi } from '../api/productApi';
import { useToast } from '../context/ToastContext';

const useProducts = () => {
  const {
    products,
    setProducts,
    categories,
    setCategories,
    product,
    setProduct,
    loading,
    setLoading,
  } = useProductStore();

  const { showError } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsData = await fetchProductsData();
      const categoriesData = [...new Set(productsData.map((p) => p.category))];
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error(err);
      showError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    setLoading(true);
    try {
      const productData = await getProductByIdApi(id);
      setProduct(productData);
    } catch (err) {
      console.error(err);
      showError("Failed to fetch product.");
    } finally {
      setLoading(false);
    }
  };

 

  return {
    products,
    categories,
    product,
    loading,
    fetchProducts,
    getProductById,
  };
};

export default useProducts;
