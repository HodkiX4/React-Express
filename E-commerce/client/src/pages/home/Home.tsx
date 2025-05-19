import styles from './home.module.css';
import Products from '../../components/products/Products';
import useProducts from '../../hooks/useProducts';

function Home() {
  const { products, loading } = useProducts();

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <h1>Welcome to Our Store</h1>
        <p>Find the best products at unbeatable prices.</p>
      </section>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        products ? (
          <Products products={products} />
        ) : (
          <h1>No products found</h1>
        )
      )}
    </div>
  );
}

export default Home