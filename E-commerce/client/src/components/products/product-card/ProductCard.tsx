import { useNavigate } from 'react-router-dom'
import style from './product.module.css'
import { IProduct } from '../../../models/product.model';
import useCart from '../../../hooks/useCart';
import { ChangeEvent, useCallback, useState } from 'react';
import { useAuthStore } from '../../../store/authStore';

function ProductCard(product: IProduct) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { token } = useAuthStore();
  const [count, setCount] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setCount(value);
    } else {
      setCount(1); // Ensure the value does not go below 1
    }
  };

  const handleAddToCart = useCallback(() => {
    addToCart(product._id, count);
  }, [addToCart, product._id]);
  return (
    <div key={product._id} className={style.productCard}>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className={style.btns}>
        <button onClick={() => navigate(`/product/${product._id}`)}>View Details</button>
        {
          token &&
          <>
          <input type="number" value={count} onChange={handleChange}/>
          <button onClick={handleAddToCart}>To Cart</button>
          </>
        }
      </div>
    </div>
  )
}

export default ProductCard