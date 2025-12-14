// src/context/CartContext.jsx

import { createSignal, createContext, useContext, ParentComponent, createEffect , createMemo} from "solid-js";
import * as Interface from "~/interface/Interface"



const CartContext = createContext<any>({}); 


export const CartProvider: ParentComponent = (props) => {

    const [cartItems, setCartItems] = createSignal<Interface.CartItems_if[]>([]); 
    const [isCartOpen, setIsCartOpen] = createSignal(false);  
    const cartItemCount = createMemo(() => cartItems().length);

    const addToCart = (newItem: Interface.CartItems_if) => {
        setCartItems(currentItems => {
            // ۱. بررسی می‌کنیم آیتم قبلاً در سبد هست یا نه
            const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);

            if (existingItemIndex > -1) {
                return currentItems; // آرایه فعلی را بدون تغییر برگردان
            } else {
                return [...currentItems, { ...newItem, quantity: 1 }]; 
            }
        });
        console.log("Current Cart Items:", cartItems());
    };
    const removeItemFromCart = (itemId: string) => {
            setCartItems(prev => {
                // فیلتر کردن و نگه داشتن آیتم‌هایی که ID آن‌ها با itemId یکسان نیست
                return prev.filter(item => item.id !== itemId);
            });
        };

    // ۲. توابع کمکی
    const toggleCart = () => setIsCartOpen(prev => !prev );
    
    const store = {
        cartItems, 
        cartItemCount, 
        addToCart,
        removeItemFromCart,
        isCartOpen, 
        toggleCart,
    };

  return (
    <CartContext.Provider value={store}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

