import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";
import Header from "../common/Header";
import ProductCard from "../ProductCard";
import SearchBar from "../SearchBar";
import ProductModal from "../ProductModal";

const categories = ["All", "Electronics", "Clothing", "Books", "Home & Garden"];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const category = selectedCategory === "All" ? "" : selectedCategory;
        const data = await fetchProducts(category, searchQuery);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, searchQuery]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="text-xl text-blue-400">Loading...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <SearchBar onSearch={setSearchQuery} />
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No products found
          </div>
        )}

        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
