// src/context/CartContext.jsx

import { createSignal, createContext, useContext, ParentComponent, createEffect , createMemo} from "solid-js";
import * as Interface from "~/interface/Interface"



const CartContext = createContext<any>({}); 


export const CartProvider: ParentComponent = (props) => {

    const [cartItems, setCartItems] = createSignal<Interface.CartItems_if[]>([]); 

    const [isCartOpen, setIsCartOpen] = createSignal(false);  

    const cartItemCount = createMemo(() => {
        // این لاگ برای عیب‌یابی است و نشان می‌دهد که memo در حال اجرا است
        return cartItems().length;
    });

            const addToCart = (newItem : Interface.CartItems_if) => {
                let isDuplicate = false;
                setCartItems(currentItems => {
                    const exists = currentItems.find(item => item.id === newItem.id);
                    if (exists) {
                        isDuplicate = true;
                        return currentItems;
                    }
                    return [...currentItems, newItem];
                });
                return !isDuplicate; // اگه اضافه شد true، اگه تکراری بود false
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

