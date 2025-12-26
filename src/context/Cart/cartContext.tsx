import { createSignal, createContext, useContext, ParentComponent, createMemo } from "solid-js";
import * as Interface from "~/interface/Interface";

// تعریف Interface برای کانتکست جهت امنیت تایپ‌ها
interface CartContextType {
    cartItems: () => Interface.CartItems_if[];
    cartItemCount: () => number;
    isCartOpen: () => boolean;
    isCartEmpty: () => boolean;
    addToCart: (newItem: Interface.CartItems_if) => boolean;
    removeItemFromCart: (itemId: string) => void;
    isItemInCart: (itemId: string) => boolean;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType>();

export const CartProvider: ParentComponent = (props) => {
    const [cartItems, setCartItems] = createSignal<Interface.CartItems_if[]>([]);
    const [isCartOpen, setIsCartOpen] = createSignal(false);

    // استفاده از Memo برای محاسبات مشتق شده
    const cartItemCount = createMemo(() => cartItems().length);

    // تابع کمکی برای چک کردن وجود آیتم در سبد
    const isItemInCart = (itemId: string) => {
        return cartItems().some(item => String(item.id) === String(itemId));
    };

    const addToCart = (newItem: Interface.CartItems_if): boolean => {
        let isDuplicate = false;
        setCartItems(currentItems => {
            const exists = currentItems.find(item => String(item.id) === String(newItem.id));
            if (exists) {
                isDuplicate = true;
                return currentItems;
            }
            return [...currentItems, { ...newItem, quantity: 1 }];
        });
        return !isDuplicate;
    };

    const removeItemFromCart = (itemId: string) => {
        setCartItems(prev => prev.filter(item => String(item.id) !== String(itemId)));
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);

    // پکیج نهایی: توابع رو مستقیم پاس میدیم تا به صورت () فراخوانی بشن
    const store: CartContextType = {
        cartItems: cartItems, // ارجاع مستقیم به سیگنال
        cartItemCount: cartItemCount, // ارجاع مستقیم به ممو
        isCartOpen: isCartOpen, // ارجاع مستقیم به سیگنال
        isCartEmpty: () => cartItems().length === 0,
        addToCart,
        removeItemFromCart,
        isItemInCart,
        toggleCart,
    };

    return (
        <CartContext.Provider value={store}>
            {props.children}
        </CartContext.Provider>
    );
};

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}