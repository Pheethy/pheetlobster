"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { Order } from "@/models/orders";
import { OrdersProducts } from "@/models/orders";
import { createOrder } from "@/services/order";

export default function CheckoutModal({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    if (onClose) onClose();
  };

  async function handleCheckout() {
    const cart = useCartStore.getState().cart;
    let orderProds: OrdersProducts[] = [];
    for (let i = 0; i < cart.length; i++) {
      orderProds.push({
        product_id: cart[i].id,
        qty: cart[i].quantity,
        price: cart[i].price,
      });
    }

    const customerId = localStorage.getItem("user_id");
    let orderReq: Order = {
      id: "",
      customer_id: customerId ? customerId : "",
      contact: "customer@example.com",
      address: "123 Example Street, Example City",
      status: "pending",
      product_order_list: orderProds,
      created_at: "",
      updated_at: "",
    };

    let resp = await createOrder(orderReq);
    console.log("resp:", resp);

    clearCart();
    router.push("/dashboard");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-zinc-900 rounded-sm p-8 shadow-xl group hover:border-zinc-700 transition-all duration-500"
        role="dialog"
        aria-labelledby="checkout-title"
      >
        {/* ปุ่มปิดโมดอล */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors duration-300"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          {/* อนิเมชั่นไอคอนตะกร้าสินค้า */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mx-auto w-16 h-16 border border-zinc-700 rounded-full flex items-center justify-center mb-4 group-hover:border-blue-500 transition-all duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-zinc-400 group-hover:text-blue-500 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </motion.div>

          {/* หัวข้อหลักของโมดอล */}
          <motion.h3
            id="checkout-title"
            className="text-lg text-white mb-2 font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Confirm Your Order
          </motion.h3>

          {/* ข้อความอธิบาย */}
          <motion.p
            className="text-zinc-500 text-sm mb-6 font-extralight tracking-wide"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Please review your items before proceeding to payment.
          </motion.p>

          {/* ปุ่มดำเนินการชำระเงิน */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleCheckout}
              className="w-full bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 py-3 text-xs tracking-widest uppercase font-light transition-all duration-300"
            >
              Proceed to Payment
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
