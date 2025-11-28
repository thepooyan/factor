import {  useCart } from '~/context/Cart/cartContext';
import { Show } from 'solid-js';
import { CartModal } from './CartModal';


export function CartComponent() { 
    const { cartItemCount, toggleCart, isCartOpen } = useCart();

    return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px 30px',
      background: 'red',
      color: 'white'
    }}>
      <div 
        style={{position: 'relative', cursor: 'pointer'}}
        onClick={toggleCart} // اینجا سبد باز میشه
      >

        
        🛒
        <span class="absolute top-[-8px] right-[-18px] bg-blue-600 text-white rounded-full text-xs px-1.5 py-0.5 leading-none">
          {cartItemCount()}
        </span>
        <Show when={isCartOpen()}>
            <CartModal/>
        </Show>

      </div>
    </header>
  );
}