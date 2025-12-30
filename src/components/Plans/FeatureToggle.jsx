import { For, createSignal, Show, createMemo } from "solid-js";
import { BsCartPlus, BsCartX } from "solid-icons/bs";
import formatPriceJS from "~/utility/formatting";
import { useCart } from "~/context/Cart/cartContext";
import { useToast } from "~/context/Cart/ToastContext";

const ChevronDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={`transition-transform duration-300 ${
      props.isOpen ? "rotate-180" : ""
    }`}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export function FeatureToggle(props) {
  const cart = useCart();
  const { addToast } = useToast();

  // پیدا کردن نام پلن‌های موجود در سبد برای تشخیص قابلیت‌های رایگانِ همراه پلن
  const activePlanNames = createMemo(() => {
    return cart
      .cartItems()
      .filter((item) => !String(item.id).startsWith("addon-"))
      .map((plan) => plan.name);
  });

  // تابع کمکی برای چک کردن اینکه آیا یک قابلیت در پلن‌های انتخابی کاربر هست یا نه
  const isFeatureIncludedInPlan = (feature) => {
    const plans = activePlanNames();
    if (plans.length === 0) return false;
    return plans.some(
      (planName) => feature.for_plans && feature.for_plans[planName] === true
    );
  };

  // مرتب‌سازی و فیلتر کردن اصلی
  const sortedFeatures = createMemo(() => {
    const features = (props.features || []).filter(
      (f) => f.feature_id != null && f.is_active && f.addons?.[0]?.price > 0
    );

    // مرتب‌سازی: آنهایی که در پلن نیستند (فعال برای خرید) بالا، بقیه پایین
    return features.sort((a, b) => {
      const aIncluded = isFeatureIncludedInPlan(a);
      const bIncluded = isFeatureIncludedInPlan(b);
      if (aIncluded && !bIncluded) return 1; // a می‌رود پایین
      if (!aIncluded && bIncluded) return -1; // a می‌آید بالا
      return 0;
    });
  });

  const handleCartAction = (featureName, addon) => {
    const id = `addon-${addon.addon_id}`;
    if (cart.isItemInCart(id)) {
      cart.removeItemFromCart(id);
      addToast(`${featureName} از سبد حذف شد.`, "warning");
    } else {
      const item = {
        id: id,
        name: `${featureName} (${addon.duration_months} ماهه)`,
        price: addon.discounted_price || addon.price,
        img: "",
        href: "/checkout",
      };
      if (cart.addToCart(item)) {
        addToast(`${featureName} به سبد اضافه شد.`, "success");
      }
    }
  };

  return (
    <div
      class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
      style={{ direction: "rtl" }}
    >
      <For each={[0, 1]}>
        {(columnIndex) => (
          <div class="flex flex-col gap-4">
            <For
              each={sortedFeatures().filter((_, i) => i % 2 === columnIndex)}
            >
              {(feature) => {
                const [isOpen, setIsOpen] = createSignal(false);
                const isIncluded = () => isFeatureIncludedInPlan(feature);
                const isAnyAddonInCart = () =>
                  feature.addons.some((a) =>
                    cart.isItemInCart(`addon-${a.addon_id}`)
                  );

                return (
                  <div
                    class={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all h-fit ${
                      isIncluded() ? "opacity-70 grayscale-[0.5]" : ""
                    }`}
                  >
                    <button
                      onClick={() => setIsOpen(!isOpen())}
                      class={`w-full p-3 bg-white hover:bg-gray-50 flex flex-col sm:flex-row items-center justify-between ${
                        isIncluded() ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <div class="flex flex-col items-center sm:items-start text-center sm:text-right">
                        <h4 class="font-bold text-gray-900 text-lg flex items-center">
                          {feature.feature_name}
                          <Show when={isIncluded()}>
                            <span class="mr-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                              موجود در پلن شما
                            </span>
                          </Show>
                        </h4>
                        <p class="text-gray-500 text-xs mt-1 line-clamp-1">
                          {feature.description}
                        </p>
                        <Show when={!isIncluded()}>
                          <div class="text-sm font-bold text-indigo-600 mt-1">
                            از {formatPriceJS(feature.addons[0].price)} تومان
                          </div>
                        </Show>
                      </div>

                      <div class="mt-3 sm:mt-0 bg-blue-50 p-2 rounded-full text-blue-600">
                        <ChevronDown isOpen={isOpen()} />
                      </div>
                    </button>

                    <div
                      class={`transition-all duration-300 overflow-hidden ${
                        isOpen()
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div class="p-4 pt-0 space-y-2 bg-gray-50/30">
                        <For each={feature.addons.filter((a) => a.is_active)}>
                          {(addon) => {
                            const id = `addon-${addon.addon_id}`;
                            const isInCart = () => cart.isItemInCart(id);
                            // غیرفعال سازی اگر: در پلن باشد OR یک ادآن دیگر از همین فیچر در سبد باشد (و این یکی نباشد)
                            const isDisabled = () =>
                              isIncluded() ||
                              (isAnyAddonInCart() && !isInCart());

                            return (
                              <div
                                class={`p-2 bg-white rounded-xl border flex relative items-center justify-between transition-all ${
                                  isDisabled()
                                    ? "opacity-40 grayscale cursor-not-allowed"
                                    : "hover:border-blue-200 cursor-default"
                                }`}
                              >
                                <Show
                                  when={
                                    addon.discounted_price &&
                                    addon.discounted_price !== 0
                                  }
                                >
                                    <span class="text-[10px] bg-red-100 text-red-600 px-2 rounded font-bold absolute rotate-12 z-10 shadow-sm border border-red-200 opacity-80 top-1">
                                      {Math.round(
                                        ((addon.price - addon.discounted_price) / addon.price) * 100
                                      )}
                                      %
                                    </span>
                                </Show>

                                <span class="text-sm font-bold text-gray-700">
                                  {addon.duration_months} ماهه
                                </span>
                                <div class="flex items-center ">
                                  <div class="text-left">
                                    <div class="text-md font-bold text-indigo-700">
                                      <div>

                                      {formatPriceJS(
                                        addon.discounted_price || addon.price
                                      )}
                                    <Show when={addon.discounted_price}>
                                      <div class="text-xs text-center text-red-400 line-through font-semibold">
                                        {formatPriceJS(addon.price)}
                                      </div>
                                    </Show>
                                      </div>
                                    </div>
                                  </div>
                                      <span class="text-[10px] text-black mx-3 mr-1 rotate-90">
                                        تومان
                                      </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCartAction(
                                        feature.feature_name,
                                        addon
                                      );
                                    }}
                                    disabled={isDisabled()}
                                    class={`flex items-center justify-center p-2 rounded-lg text-white transition-colors ${
                                      isInCart() ? "bg-red-500" : "bg-blue-600"
                                    } ${
                                      isDisabled()
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer hover:bg-opacity-90"
                                    }`}
                                  >
                                    {isInCart() ? (
                                      <BsCartX size={18} />
                                    ) : (
                                      <BsCartPlus size={18} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            );
                          }}
                        </For>
                      </div>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}
