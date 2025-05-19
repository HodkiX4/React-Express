import { ChangeEvent } from "react";
import styles from './cartItem.module.css'; 
import { IProduct } from "../../models/product.model";

interface CartItemProps {
  item: { product: IProduct, quantity: number };
  handleUpdate: (e: ChangeEvent<HTMLInputElement>, id: string, current: number) => void;
  handleRemove: (productId: string) => void;
}

const CartItem = ({ item, handleUpdate, handleRemove }: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <img
        src={item.product.imageUrl}
        alt={item.product.name} // Fallback to product name
        className={styles.cartImage}
      />
      <p className={styles.cartProductName}>{item.product.name}</p>
      <p className={styles.cartProductPrice}>${item.product.price}</p>
      <div className={styles.cartActions}>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleUpdate(e, item.product._id, item.quantity)}
          className={styles.quantityInput}
        />
        <button
          onClick={() => handleRemove(item.product._id)}
          className={styles.removeButton}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
