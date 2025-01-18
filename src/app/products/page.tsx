"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ProductsResp, ProductQueryParams } from "../../models/products";
import { fetchAllProducts } from "../../services/products";

export default function Products() {
  const [productsResp, setproductsResp] = useState<ProductsResp>();
  const [searchWord, setSearchWord] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const queryParams: ProductQueryParams = {
    search_word: searchWord,
    page: page,
    per_page: 6,
  };

  useEffect(() => {
    fetchAllProducts(queryParams).then((data) => setproductsResp(data));
  }, [searchWord, page]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="container flex flex-col justify-center items-center mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-center items-center w-full">
            <div className="flex bg-black justify-center items-center rounded-lg border border-gray-700 focus-within:ring-2 focus:ring-blue-500 focus:border-transparent">
              <Search className="text-gray-400 w-6 h-6 pl-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-96 bg-black text-white py-3 pl-2 text-sm focus:outline-none rounded-lg"
                onChange={(e) => setSearchWord(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {productsResp?.products.map((product, index) => (
            <div
              key={index}
              className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={product.images?.[0].url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-bold">
                    {product.price} $
                  </span>
                  <button className="bg-purple_dark_mode hover:bg-blue_dark_mode text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="join mt-8">
          {Array.from({ length: productsResp?.total_page || 0 }, (_, i) => (
            <input
              key={i + 1}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={(i + 1).toString()}
              defaultChecked={i + 1 === 1}
              onClick={() => setPage(i + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
