import { useEffect, useState } from "react";
import { db } from "../services/firebase";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-100">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="text-2xl text-green-400 font-bold mb-4">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded ${
              product.stock_count > 0
                ? "bg-green-900/50 text-green-300"
                : "bg-red-900/50 text-red-300"
            }`}
          >
            {product.stock_count > 0 ? "In Stock" : "Out of Stock"}
          </span>
          {product.stock_count > 0 && (
            <span className="text-gray-400">
              {product.stock_count} available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
