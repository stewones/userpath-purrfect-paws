'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cat, CartItem, CartContextType } from '@/lib/types';
import { useUserPath } from '@/components/userpath-provider';

// Cart reducer actions
type CartAction =
  | { type: 'ADD_TO_CART'; cat: Cat }
  | { type: 'REMOVE_FROM_CART'; catId: string }
  | { type: 'UPDATE_QUANTITY'; catId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

// Cart reducer
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item.cat.id === action.cat.id);
      if (existingItem) {
        return state.map(item =>
          item.cat.id === action.cat.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { cat: action.cat, quantity: 1, addedAt: new Date() }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.cat.id !== action.catId);
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return state.filter(item => item.cat.id !== action.catId);
      }
      return state.map(item =>
        item.cat.id === action.catId
          ? { ...item, quantity: action.quantity }
          : item
      );
    }
    case 'CLEAR_CART':
      return [];
    case 'LOAD_CART':
      return action.items;
    default:
      return state;
  }
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const { trackEvent } = useUserPath();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('kitty-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', items: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kitty-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (cat: Cat) => {
    if (cat.isAdopted) {
      // Track failed add to cart attempt for adopted cats
      trackEvent('add_to_cart_failed', {
        reason: 'cat_already_adopted',
        cat_id: cat.id,
        cat_name: cat.name,
        cat_breed: cat.breed
      });
      return;
    }

    dispatch({ type: 'ADD_TO_CART', cat });
    
    // Track successful add to cart - this is essential e-commerce tracking
    trackEvent('add_to_cart', {
      cat_id: cat.id,
      cat_name: cat.name,
      cat_breed: cat.breed,
      cat_price: cat.price,
      cart_size: items.length + 1
    });
  };

  const removeFromCart = (catId: string) => {
    const item = items.find(item => item.cat.id === catId);
    dispatch({ type: 'REMOVE_FROM_CART', catId });
    
    // Track removal - this is essential e-commerce tracking
    if (item) {
      trackEvent('remove_from_cart', {
        cat_id: catId,
        cat_name: item.cat.name,
        cat_breed: item.cat.breed,
        quantity_removed: item.quantity,
        cart_size: items.length - 1
      });
    }
  };

  const updateQuantity = (catId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', catId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.cat.price * item.quantity), 0);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 