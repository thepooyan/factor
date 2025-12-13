// src/context/CartContext.jsx

import { createSignal, createContext, useContext, ParentComponent, createEffect , createMemo} from "solid-js";
import * as Interface from "~/interface/Interface"



const initialCartItems = [
    {
        id: '1', 
        name: "کتاب پایتون پیشرفته", 
        img: "img/1.png", 
        price: 550000,
        // ✅ href ساختگی برای کتاب
        href: "/book/advanced-python"
    },
    {
        id: '2', 
        name: "ماگ سرامیکی کد 003", 
        img: "img/2.png", 
        price: 120000,
        // ✅ href ساختگی برای ماگ
        href: "/decor/ceramic-mug-003"
    },
    {
        id: '3', 
        name: "ماوس بی‌سیم مدل M50", 
        img: "img/3.png", 
        price: 890000,
        // ✅ href ساختگی برای لوازم جانبی کامپیوتر
        href: "/accessories/wireless-mouse-m50"
    },
    {
        id: '4', 
        name: "چراغ مطالعه LED تاشو", 
        img: "img/4.png", 
        price: 1750000,
        // ✅ href ساختگی برای چراغ مطالعه
        href: "/lighting/folding-led-lamp"
    },
    // توجه: ID آیتم‌های زیر تکراری است (همه '4' هستند). 
    // بهتر است برای دیتای واقعی، ID منحصربه‌فرد باشند (مثلاً '5'، '6'، '7').
    {
        id: '5', // ID اصلاح شد
        name: "چراغ مطالعه LED تاشو (مشکی)", 
        img: "img/5.png", 
        price: 1750000,
        href: "/lighting/folding-led-lamp-black"
    },
    {
        id: '6', // ID اصلاح شد
        name: "چراغ مطالعه LED تاشو (سفید)", 
        img: "img/6.png", 
        price: 1750000,
        href: "/lighting/folding-led-lamp-white"
    },
    {
        id: '7', // ID اصلاح شد
        name: "چراغ مطالعه LED تاشو (کوچک)", 
        img: "img/7.png", 
        price: 1750000,
        href: "/lighting/folding-led-lamp-small"
    },
];

const CartContext = createContext<any>({}); 


export const CartProvider: ParentComponent = (props) => {

    const [cartItems, setCartItems] = createSignal<Interface.CartItems_if[]>([]); 
    const [isCartOpen, setIsCartOpen] = createSignal(false);  
    const cartItemCount = createMemo(() => cartItems().length);
    // ۳. تابعی برای اضافه کردن محصول به سبد
    const addItemToCart = (item: Interface.CartItems_if) => {
        // از Setter سیگنال استفاده می‌کنیم تا آرایه جدید رو برگردونیم
        setCartItems(prev => [...prev, item]);
    };
    const addToCart = (newItem: Interface.CartItems_if) => {
        setCartItems(currentItems => {
            // ۱. بررسی می‌کنیم آیتم قبلاً در سبد هست یا نه
            const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);

            if (existingItemIndex > -1) {
                // ۲. اگر هست:
                console.log(`پلن ${newItem.name} قبلاً در سبد موجود است.`)
                // اینجا می‌توانید یک Modal نمایش دهید یا فقط آرایه فعلی را برگردانید:
                return currentItems; // آرایه فعلی را بدون تغییر برگردان
            } else {
                // ۳. اگر نیست، آیتم جدید رو اضافه می‌کنیم
                console.log(`پلن ${newItem.name} به سبد اضافه شد.`)
                // اینجا باید Quantity رو ۱ قرار بدید، چون در اینترفیس شما نیست، آن را اضافه می‌کنیم.
                // *اگرچه بهتر است quantity به اینترفیس اضافه شود.*
                return [...currentItems, { ...newItem, quantity: 1 }]; 
            }
        });
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
        addItemToCart,
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

