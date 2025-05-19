import { IProduct } from '../../models/product.model';
import ProductCard from './product-card/ProductCard';
import style from './products.module.css';


const Products = ({ products }: { products: IProduct[] }) => {
  return (
    <section className={style.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </section>
  )
}

export default Products