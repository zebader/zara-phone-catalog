"use client";

import { createContext, useContext, useSyncExternalStore, ReactNode } from "react";

type CartContextType = {
  cart: Array<CartItem>;
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeCartItem: (itemId: string) => void;
};

export type CartItem = {
  id: string;
  name: string;
  color: string;
  storage: string;
  price: number;
  image: string;
};

const CART_STORAGE_KEY = "cart";

const readCartFromStorage = (): Array<CartItem> => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};

let cart: Array<CartItem> = [];
const listeners = new Set<() => void>();
const SERVER_CART_SNAPSHOT: Array<CartItem> = []; // Avoid loops when setting cart state on mount

if (typeof window !== "undefined") {
  cart = readCartFromStorage();
}

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const subscribeToCart = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getCartSnapshot = (): Array<CartItem> => cart;

export const getServerCartSnapshot = (): Array<CartItem> => SERVER_CART_SNAPSHOT;

export const addCartItem = (item: CartItem) => {
  cart = [...cart, { ...item }];
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  notify();
};

export const removeCartItem = (itemId: string) => {
  cart = cart.filter((cartItem) => cartItem.id !== itemId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  notify();
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cart = useSyncExternalStore(subscribeToCart, getCartSnapshot, getServerCartSnapshot);
  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart: addCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
