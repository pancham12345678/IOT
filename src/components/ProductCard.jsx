const ProductCard = ({ product, onClick }) => (
  <div className="border border-gray-700 rounded-lg bg-gray-800 shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-105" onClick={onClick}>
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
    <h2 className="text-xl font-semibold mb-2 text-gray-100">{product.name}</h2>
    <p className="text-green-400 font-bold mb-2">${product.price.toFixed(2)}</p>
    <div className="flex justify-between items-center">
      <span className={`px-2 py-1 rounded ${
        product.stock_count > 0 
          ? 'bg-green-900/50 text-green-300' 
          : 'bg-red-900/50 text-red-300'
      }`}>
        {product.stock_count > 0 ? 'In Stock' : 'Out of Stock'}
      </span>
      {product.stock_count > 0 && (
        <span className="text-gray-400">
          {product.stock_count} available
        </span>
      )}
    </div>
  </div>
);

export default ProductCard;
