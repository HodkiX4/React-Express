import style from './filters.module.css';

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  searchQuery,
  setSearchQuery,
}: FiltersProps) {
  return (
    <div className={style.filters}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
     </select>
     <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
       <option value="asc">Price: Low to High</option>
       <option value="desc">Price: High to Low</option>
     </select>
    </div>
  )
}

export default Filters