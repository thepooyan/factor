import {  useCart } from '~/context/Cart/cartContext';
import { Show } from 'solid-js';
import { CartModal } from './CartModal';
import { FiShoppingCart  } from 'solid-icons/fa'


export function CartComponent() { 
    const { cartItemCount, toggleCart, isCartOpen } = useCart();

    return (
      <div 
        style={{position: 'relative', cursor: 'pointer'}}
        onClick={toggleCart} // اینجا سبد باز میشه
      >

        
        <FiShoppingCart class="h-6 w-6" /> 
      
        <span class="absolute top-[-8px] right-[-18px] bg-blue-600 text-white rounded-full text-xs px-1.5 py-0.5 leading-none">
          {cartItemCount()}
        </span>
        <Show when={isCartOpen()}>
            <CartModal/>
        </Show>

      </div>
  );
}