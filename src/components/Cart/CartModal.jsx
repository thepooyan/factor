import { useCart } from '~/context/Cart/cartContext';
import { createSignal, onMount, Show, createEffect } from 'solid-js';
import { A } from '@solidjs/router';
import { IoCloseSharp, IoCloseCircleOutline } from 'solid-icons/io';
import formatPriceJS from '~/utility/formatting';

export function CartModal() {
  const { isCartOpen, toggleCart, cartItems, cartItemCount, removeItemFromCart } = useCart();
  const [isVisible, setIsVisible] = createSignal(false);

  // مدیریت انیمیشن ورود و خروج
  createEffect(() => {
    if (isCartOpen()) {
      // یک تاخیر خیلی کم برای اجرای انیمیشن ورود
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  });

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsVisible(false);
    // صبر می‌کنیم تا انیمیشن تمام شود (۱۵۰ میلی‌ثانیه) بعد استیت اصلی را تغییر می‌دهیم
    setTimeout(() => {
      toggleCart();
    }, 500);
  };

  return (
    <Show when={isCartOpen()}>
      <div
        onClick={(e) => e.stopPropagation()}
        class="text-black bg-white shadow-2xl z-20 cursor-auto border border-gray-300 p-2 m-auto transition-all duration-600 ease-in-out fixed inset-x-0 rounded-2xl max-w-90 lg:absolute lg:w-80 lg:left-0 lg:right-auto lg:max-h-none"
        style={{
          top: isVisible() ? '4.5rem' : '-40rem',
          opacity: isVisible() ? '1' : '0',
          "transition-property": "top, opacity"
        }}
      >
        {/* دکمه بستن اصلی */}
        <button
          onClick={handleClose}
          class="absolute top-3 right-2 text-red-500 cursor-pointer rounded-full hover:text-red-600 hover:bg-red-50 p-1 transition-all duration-150"
        >
          <IoCloseSharp
            class="h-5 w-5 transition-transform duration-150 hover:scale-125" 
          />
        </button>

        <h2 class="text-lg font-bold pb-2 text-center">سبد خرید ({cartItemCount()})</h2>
        
        <div class="border-t border-gray-100 my-2"></div>

        <div
          class="p-2 overflow-y-auto max-h-[70vh] space-y-3"
          style={{ direction: 'rtl', "text-align": 'right' }}
        >
          <Show
            when={cartItemCount() > 0}
            fallback={<p class="text-center text-gray-500 py-4">سبد خرید خالی است.</p>}
          >
            <For each={cartItems()}>
              {(item) => (
                <div class="flex items-center space-x-3 space-x-reverse border-b border-gray-50 pb-2 pt-2">
                  {/* عکس محصول */}
                  <div class="shrink-0 w-10 h-10 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      class="w-full h-full object-cover"
                    />
                  </div>

                  {/* متن محصول */}
                  <div class="grow flex flex-col text-right text-sm">
                    <span class="font-medium text-black">{item.name}</span>
                    <span class="text-gray-600">{formatPriceJS(item.price)} تومان</span>
                  </div>

                  {/* دکمه حذف آیتم */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItemFromCart(item.id);
                    }}
                    class="shrink-0 rounded-full p-1 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <IoCloseCircleOutline class="h-5 w-5" />
                  </button>
                </div>
              )}
            </For>
          </Show>
        </div>

        {/* دکمه تسویه حساب */}
        <Show when={cartItemCount() > 0}>
          <div class="p-2 mt-2">
            <A
              href="/checkout"
              onClick={handleClose}
              class="block w-full bg-blue-600 text-white text-center py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors "
            >
              تسویه حساب
            </A>
          </div>
        </Show>
      </div>
    </Show>
  );
}