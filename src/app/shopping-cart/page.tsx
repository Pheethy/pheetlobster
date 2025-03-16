"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/logo/logo";
import { useCartStore } from "@/store/cart-store";
import CheckoutModal from "@/components/modals/checkout";

export default function ShoppingCart() {
  const cartItems = useCartStore((state) => state.cart);
  const updateCartQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartQuantity(id, newQuantity);
  };

  const removeItem = (id: string) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (itemToRemove) {
      removeFromCart(itemToRemove);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="container mx-auto px-4">
        {isCheckoutOpen && (
          <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
        )}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-center mb-8"
        >
          <Logo />
          <p className="text-zinc-400 mt-1 font-extralight tracking-wider animate-pulse">
            Welcome to cart, PheetchY
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-grow space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#0a0a0a] rounded-sm overflow-hidden transition-all duration-500 flex border border-zinc-900 group hover:border-zinc-700"
                >
                  <div className="w-32 h-32 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-grow p-4 flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                      <h3 className="font-light text-base tracking-wide text-white group-hover:text-gray-200 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-zinc-500 text-xs font-extralight tracking-wide">
                        {item.description}
                      </p>
                      <span className="text-zinc-400 font-light text-sm tracking-wider">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-white text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            className="lg:w-96 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#0a0a0a] border border-zinc-900 p-6 space-y-6">
              <h2 className="text-lg font-light text-white">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">
                    Items {cartItems.length}
                  </span>
                  <span className="text-white">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-zinc-400 text-sm">Shipping</span>
                  <select className="w-full bg-transparent border border-zinc-800 text-zinc-400 text-sm p-2 focus:outline-none focus:border-zinc-700">
                    <option value="standard">Standard Delivery - £5.00</option>
                    <option value="express">Express Delivery - £10.00</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="text-zinc-400 text-sm">Promo Code</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter your code"
                      className="flex-grow bg-transparent border border-zinc-800 text-zinc-400 text-sm p-2 focus:outline-none focus:border-zinc-700"
                    />
                    <button className="px-4 py-2 border border-zinc-800 text-zinc-400 text-sm hover:bg-zinc-800 hover:text-white transition-colors duration-300">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-zinc-400 text-sm">Address</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter your destination"
                      className="flex-grow bg-transparent border border-zinc-800 text-zinc-400 text-sm p-2 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400 font-light">Total Cost</span>
                  <span className="text-white text-xl font-light">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 py-3 text-xs tracking-widest uppercase font-light transition-all duration-300"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
