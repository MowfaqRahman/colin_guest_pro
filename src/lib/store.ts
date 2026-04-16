import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from './data';

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
  id: string; // unique ID mapping to productID-size
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;

  wishlistItems: Product[];
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (product: Product) => void;

  isLoggedIn: boolean;
  simulateLogin: () => void;

  wishlistPopupProduct: Product | null;
  clearWishlistPopup: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true, isWishlistOpen: false }), // automatically close wishlist if cart opens safely
  closeCart: () => set({ isOpen: false }),
  addToCart: (product, size) => set((state) => {
    const existingIndex = state.items.findIndex(item => item.product.id === product.id && item.size === size);
    if (existingIndex >= 0) {
      const newItems = [...state.items];
      newItems[existingIndex].quantity += 1;
      return { items: newItems, isOpen: true, isWishlistOpen: false };
    }
    return { 
      items: [...state.items, { product, size, quantity: 1, id: `${product.id}-${size}` }], 
      isOpen: true,
      isWishlistOpen: false
    };
  }),
  removeFromCart: (cartItemId) => set((state) => ({
    items: state.items.filter(item => item.id !== cartItemId)
  })),
  updateQuantity: (cartItemId, delta) => set((state) => ({
    items: state.items.map(item => {
      if (item.id === cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
  })),

  wishlistItems: [],
  isWishlistOpen: false,
  openWishlist: () => set({ isWishlistOpen: true, isOpen: false }), // safely close cart 
  closeWishlist: () => set({ isWishlistOpen: false }),
  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlistItems.some(item => item.id === product.id);
    if (exists) {
      return { wishlistItems: state.wishlistItems.filter(item => item.id !== product.id) };
    } else {
      return { 
        wishlistItems: [...state.wishlistItems, product], 
        wishlistPopupProduct: product 
      };
    }
  }),

  isLoggedIn: false,
  simulateLogin: () => set({ isLoggedIn: true }),

  wishlistPopupProduct: null,
  clearWishlistPopup: () => set({ wishlistPopupProduct: null })
    }),
    {
      name: 'bluorng-storage',
    }
  )
);
