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
      <div className="container flex flex-col justify-between items-center mx-auto px-4 py-4 min-h-screen">
        {/* Search bar zone */}
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

        {/* Product list zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {productsResp?.products.map((product, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] rounded-sm overflow-hidden transition-all duration-500 flex flex-col h-[450px] w-[300px] border border-zinc-900 group hover:border-zinc-700"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={product.images?.[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-col space-y-1 mb-4">
                  <h3 className="font-light text-lg tracking-wide text-white line-clamp-1 group-hover:text-gray-200 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <span className="text-zinc-400 font-light text-sm tracking-wider">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm mb-6 line-clamp-2 flex-grow font-extralight tracking-wide">
                  {product.description}
                </p>
                <div className="mt-auto">
                  <button className="w-full bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 py-3 text-xs tracking-widest uppercase font-light transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Zone */}
        <div className="w-full flex justify-center py-2 border-t border-zinc-900">
          <div className="flex space-x-2">
            {Array.from({ length: productsResp?.total_page || 0 }, (_, i) => (
              <button
                key={i + 1}
                className={`w-10 h-10 border ${page === i + 1 ? "border-zinc-500 text-white" : "border-zinc-800 text-zinc-600"} 
              hover:border-zinc-600 hover:text-zinc-300 transition-colors duration-300 text-xs font-light`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
