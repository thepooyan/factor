import { useCart } from '~/context/Cart/CartContext';
import { Show, createEffect, onCleanup } from 'solid-js'; 
import { CartModal } from './CartModal';
import { FiShoppingCart } from 'solid-icons/fi'; 
import { A } from '@solidjs/router'; 

export function CartComponent() { 
    const { cartItemCount, toggleCart, isCartOpen } = useCart();
    
    let cartRef;
    
    createEffect(() => {
        if (isCartOpen()) {
            const clickOutsideHandler = (e) => {
                if (cartRef && !cartRef.contains(e.target)) {
                    toggleCart(); 
                }
            };
            
            document.addEventListener('click', clickOutsideHandler);
            
            onCleanup(() => {
                document.removeEventListener('click', clickOutsideHandler);
            });
        }
    });
    return (
        <div 
            ref={cartRef} // 👈 Ref به کل ناحیه (برای click outside)
            style={{position: 'relative'}} 
            // ❌ onClick={toggleCart} از اینجا حذف شد! 
        >
            
            {/* ✅ یک Div جدید برای دکمه/آیکون تعریف می‌کنیم */}
            <div
                style={{cursor: 'pointer'}} 
                onClick={toggleCart} // 👈 toggleCart فقط اینجا اجرا می‌شود!
            >
                <FiShoppingCart class="h-6 w-6" /> 
                <span class="absolute top-[-8px] right-[-18px] bg-blue-600 text-white rounded-full text-xs px-1.5 py-0.5 leading-none">
                  {cartItemCount()}
                </span>
            </div>
            
            <Show when={isCartOpen()}>
                <CartModal/>
            </Show>

        </div>
    );
  }