// src/components/CartModal.jsx

import { useCart } from '~/context/Cart/CartContext';
import {  createSignal, onMount, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { IoCloseSharp , IoCloseCircleOutline} from 'solid-icons/io'

export function CartModal() {
  const { isCartOpen, toggleCart, cartItems, removeItemFromCart } = useCart();
  console.log(isCartOpen() , '-------------')

    const [isDesktop, setIsDesktop] = createSignal(true);
    onMount(() => {
        const mediaQuery = window.matchMedia("(min-width: 300px)");
        setIsDesktop(mediaQuery.matches);
        mediaQuery.addEventListener('change', (e) => setIsDesktop(e.matches));
    });


  return (
      <Show when={isCartOpen()}>
        <div
          onClick={(e) => e.stopPropagation()}
          class='text-black absolute top-full left-0 mt-2 p-2 bg-white border border-gray-300 shadow-lg rounded-2xl w-80  z-10 cursor-auto 
          transition-all duration-300 ease-out transform scale-100 opacity-100
          '
        >
          <button 
            onClick={(e) => {
                toggleCart();
                e.stopPropagation()
              }} 
            class="
              absolute 
              top-3 right-2 
              text-red-500 
              cursor-pointer 
              rounded-full
              hover:text-red-600 
              hover:shadow-md 
              hover:bg-red-100/50
              hover:shadow-red-300/50 
              transition duration-150
              "
          >
            <IoCloseSharp 
              class="
                h-5 w-5
                hover:h-6 
                hover:w-6
                transition-all 
                duration-150
              "/>
          </button>

          <h2 class="text-lg font-bold pb-2 text-center">سبد خرید ({cartItems().length})</h2>
          <div
            class='border-t rounded-2xl p-2 bg-transparent absolute w-110/115'
          ></div>
          <div 
            class=" p-2  overflow-y-auto max-h-80 space-y-3 "
            style="direction: rtl; text-align: right;"
          >
            <Show 
                when={cartItems().length > 0}
                fallback={<p class="text-center text-gray-500">سبد خرید خالی است.</p>}
            >
              <For each={cartItems()}>
                {(item) => (
                  <A
                    href={item.href}
                    class="block hover:bg-gray-50 no-underline text-inherit"
                  >
                    <div 
                      class="flex items-center space-x-3 space-x-reverse border-b pb-2 pt-2"
                    >
                        
                      {/* ۱. عکس محصول */}
                      <div class="shrink-0 w-10 h-10 bg-gray-100 rounded overflow-hidden">
                          <img 
                              src={item.img}
                              alt={item.name} 
                              class="w-full h-full object-cover" 
                          />
                      </div>
                      
                      {/* ۲. محتوای متنی  */}
                      <div 
                        class="grow flex flex-col text-right text-sm" 
                      > 
                          <span class="font-medium text-black">{item.name}</span> 
                          <span class="text-gray-600 ">{item.price} تومان</span>
                      </div>
                      
                      {/* ۳. دکمه حذف  */}
                      <button 
                        onClick={(e) => {
                          e.stopImmediatePropagation()
                            e.preventDefault();
                            // 💡 تابع حذف آیتم:
                            removeItemFromCart(item.id); 
                            console.log(`حذف آیتم با ID: ${item.id}`); 
                        }} 
                        class="
                          shrink-0 
                          rounded-full 
                          p-1
                          bg-transparent 
                          text-red-500 
                          hover:text-red-600 
                          hover:shadow-md 
                          hover:bg-red-100/50
                          hover:shadow-red-300/50 
                          transition duration-150
                        "
                      >
                        <IoCloseCircleOutline class='h-5 w-5'/> {/* آیکون کوچکتر */}
                      </button>
                      
                    </div>              
                  </A>
                )}
              </For>
            </Show> 
          </div>
        </div>
        {/* <div 
          class="fixed inset-0 z-0 cursor-auto" 
          onClick={(e) => {
            e.stopPropagation(); 
            toggleCart();
          }}        
        ></div> */}
      </Show>
  );
}


