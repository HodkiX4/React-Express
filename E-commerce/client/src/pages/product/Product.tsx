import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./product.module.css";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { useAuthStore } from "../../store/authStore";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { token } = useAuthStore();
  const { getProductById, product, loading } = useProducts();
  const { id } = useParams<{ id: string }>();
  
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      getProductById(id);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={style.productPage}>
      <button className={style.back} onClick={() => navigate(-1)}>← Back</button>
      <div className={style.productContainer}>
        <img src={product.imageUrl} alt={product.name} />
        <div className={style.details}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          {
            token &&
            <button onClick={() => addToCart(product._id, 1)}>To Cart</button>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
