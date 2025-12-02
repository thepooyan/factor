import { useCart } from '~/context/Cart/CartContext';
import { Show, createEffect, onCleanup } from 'solid-js'; 
import { Portal } from 'solid-js/web';
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
            ref={cartRef} 
            style={{position: 'relative'}} 
        >
            <div
            class='
                relative z-30 
                p-2 m-2 
                rounded-full hover:bg-accent hover:text-accent-foreground 
                transition duration-150'   

                style={{cursor: 'pointer'}} 
                onClick={toggleCart} 
            >
                <FiShoppingCart class="h-6 w-6" /> 
                <span class="absolute top-[-3px] right-[-10px] bg-blue-600 text-white rounded-full text-xs px-1.5 py-0.5 leading-none">
                  {cartItemCount()}
                </span>
            </div>
            
            <Show when={isCartOpen()}>
                <Portal>
                    <div 
                        class={`
                            fixed inset-0 z-10 bg-black/40 
                            transition-opacity duration-400 ease-out
                            ${isCartOpen() ? 'opacity-100' : 'opacity-0'}
                        `}                        
                        onClick={toggleCart} 
                    />
                </Portal>
                <CartModal/>
            </Show>

        </div>
    );
  }