import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { CartItem } from "../models/products";
import { StorageValue } from "zustand/middleware";

/* Data Structure ที่จะวิ่งเข้ามาที่ store */
type CartStore = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

/* Data Structure สำหรับการเก็บเข้า Local Storage */
const customStorage: PersistStorage<CartStore> = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: StorageValue<CartStore>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // สร้าง state เริ่มต้นเป็น array ว่าง
      cart: [],
      // ฟังก์ชันสำหรับเพิ่มสินค้าลงในตะกร้า
      addToCart: (product) => {
        set((state) => {
          console.log("Adding product to state:", product);
          const existingProductIndex = state.cart.findIndex(
            (item) => item.id === product.id,
          );

          if (existingProductIndex >= 0) {
            const updatedCart = [...state.cart];
            const existingItem = updatedCart[existingProductIndex];
            updatedCart[existingProductIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + (product.quantity || 1),
            };
            console.log("Updated cart after adding:", updatedCart);
            return { cart: updatedCart };
          } else {
            const newCart = [
              ...state.cart,
              { ...product, quantity: product.quantity || 1 },
            ];
            console.log("New cart after adding:", newCart);
            return { cart: newCart };
          }
        });
      },
      // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
      removeFromCart: (product) => {
        set((state) => ({
          // กรองเอาเฉพาะสินค้าที่มี id ไม่ตรงกับสินค้าที่ต้องการลบ
          cart: state.cart.filter((p) => p.id !== product.id),
        }));
      },
      // ฟังก์ชันสำหรับอัพเดทจำนวนสินค้า
      updateQuantity: (id, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },
      // ฟังก์ชันสำหรับล้างตะกร้า
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: customStorage,
    },
  ),
);
