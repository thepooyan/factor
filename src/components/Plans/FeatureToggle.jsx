import { For, createSignal, Show } from "solid-js";
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
    class={`transition-transform duration-300 ${props.isOpen ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export function FeatureToggle(props) {
  const { addToCart, removeItemFromCart, isItemInCart, cartItems } = useCart();
  const { addToast } = useToast();

  // چک کردن فعال بودن قابلیت در پلن اصلی
  const isFeatureInActivePlan = (featureName) => {
    const items = cartItems; 
    if (!Array.isArray(items)) return false;
    const activePlan = items.find(item => !String(item.id).startsWith('addon-')); 
    if (!activePlan || !activePlan.features) return false;
    return activePlan.features.some(f => f.name === featureName && f.available);
  };

  // چک کردن اینکه آیا هیچ کدوم از ادآن‌های این فیچر در سبد هست یا نه
  const isAnyAddonOfFeatureInCart = (feature) => {
    return feature.addons.some(addon => isItemInCart(`addon-${addon.addon_id}`));
  };

  const validFeatures = () => {
    return (props.features || []).filter((f) => 
      f.feature_id != null && f.is_active && f.addons?.[0]?.price > 0
    );
  };

  const handleCartAction = (featureName, addon) => {
    const id = `addon-${addon.addon_id}`;
    if (isItemInCart(id)) {
      removeItemFromCart(id);
      addToast(`${featureName} از سبد حذف شد.`, "warning");
    } else {
      const item = {
        id: id,
        name: `${featureName} (${addon.duration_months} ماهه)`,
        price: addon.discounted_price || addon.price,
        img: "",
        href: "/checkout",
      };
      if (addToCart(item)) {
        addToast(`${featureName} به سبد اضافه شد.`, "success");
      }
    }
  };

  return (
    <div class=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start  "> 
      {/* تقسیم ویژگی‌ها به دو ستون مجزا برای جلوگیری از پرش آیتم‌ها به ستون دیگر */}
      <For each={[0, 1]}>
        {(columnIndex) => (
          <div class="flex flex-col gap-4">
            <For each={validFeatures().filter((_, i) => i % 2 === columnIndex)}>
              {(feature) => {
                const [isOpen, setIsOpen] = createSignal(false);
                const isIncludedInPlan = () => isFeatureInActivePlan(feature.feature_name);
                const hasAnyAddon = () => isAnyAddonOfFeatureInCart(feature);

                return (
                  <div class={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all h-fit ${isIncludedInPlan() ? 'ring-2 ring-green-400' : ''}`}>
                    <button 
                      onClick={() => setIsOpen(!isOpen())} 
                      class="w-full p-3 bg-white hover:bg-gray-50 flex flex-col sm:flex-row items-center justify-between"
                    >
                      <div class="flex flex-col items-center sm:items-start text-center sm:text-right">
                        <h4 class="font-bold text-gray-900 text-lg flex items-center">
                          {feature.feature_name}
                          <Show when={isIncludedInPlan()}>
                            <span class="mr-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">فعال در پلن</span>
                          </Show>

                        </h4>
                        <p class="text-gray-500 text-xs mt-1">
                          {feature.description}
                        </p>
                        <div class="text-sm font-bold text-indigo-600 mt-1">
                          از {formatPriceJS(feature.addons[0].price)} تومان
                        </div>
                      </div>

                      <div class="mt-3 sm:mt-0 bg-blue-50 p-2 rounded-full text-blue-600">
                        <ChevronDown isOpen={isOpen()} />
                      </div>
                    </button>

                    {/* 🟨 لیست قیمت‌ها */}
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
                            const isInCart = () => isItemInCart(id);
                            // منطق غیرفعال‌سازی: اگر در پلن هست، کلاً غیرفعال. اگر یکی دیگه از همین فیچر تو سبد هست و این یکی نیست، غیرفعال.
                            const isDisabled = () => isIncludedInPlan() || (hasAnyAddon() && !isInCart());

                            return (
                              <div class={`p-2 bg-white rounded-xl border flex items-center justify-between transition-all ${isDisabled() ? 'opacity-40 grayscale pointer-events-none' : 'hover:border-blue-200'}`}>
                                <span class="text-sm font-bold text-gray-700">
                                  {addon.duration_months} ماهه
                                  </span>
                                <div class="flex items-center gap-3">
                                  <div class="text-left">
                                    <div class="text-md font-bold text-indigo-700">
                                      {formatPriceJS(addon.discounted_price || addon.price)}
                                      <span class="text-[10px] text-gray-400 m-1">تومان</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleCartAction(feature.feature_name, addon); }}
                                    disabled={isDisabled()}
                                    class={`flex items-center justify-center p-2 rounded-lg text-white ${isInCart() ? "bg-red-500" : "bg-blue-600"}`}
                                  >
                                    {isInCart() ? <BsCartX size={18} /> : <BsCartPlus size={18} />}
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