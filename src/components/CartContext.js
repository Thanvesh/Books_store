// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: [],
    
  };
  
  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItemIndex = state.cartItems.findIndex(item => item.isbn13 === action.payload.isbn13);

        if (existingItemIndex !== -1) {
          // If the book is already in the cart, update the quantity
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity: updatedCartItems[existingItemIndex].quantity + action.payload.quantity,
            
          };
          return {
            ...state,
            cartItems: updatedCartItems,
          };
        } else {
          // If the book is not in the cart, add it
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
            
          };
        }

      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.isbn13 !== action.payload),
        };
      // Add more cases for other actions (e.g., update quantity)
      default:
        return state;
    }
  };

  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
