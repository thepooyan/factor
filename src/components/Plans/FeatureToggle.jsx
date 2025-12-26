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

  // استخراج قابلیت‌هایی که بر اساس پلن انتخابی باید غیرفعال شوند
  const includedFeaturesInCart = createMemo(() => {
    const items = cart.cartItems();
    if (!items || !Array.isArray(items)) return [];

    // پیدا کردن نام پلن‌هایی که در سبد خرید هستند
    const activePlanNames = items
      .filter((item) => !String(item.id).startsWith("addon-"))
      .map((plan) => plan.name); // فرض بر این است که نام پلن دقیقاً با کلیدهای for_plans یکی است
    if (activePlanNames.length === 0) return [];

    const allFeatures = props.features || [];
    const disabledFeatureIDs = [];

    // چک کردن تک تک قابلیت‌ها
    allFeatures.forEach((feature) => {
      // اگر هر کدام از پلن‌های توی سبد، در این قابلیت true بودند
      const isIncludedInAnyPlan = activePlanNames.some(
        (planName) => feature.for_plans && feature.for_plans[planName] === true
      );
      if (isIncludedInAnyPlan) {
        disabledFeatureIDs.push(feature.feature_id);
      }
    });

    return disabledFeatureIDs;
  });

  // تابع کمکی برای چک کردن وجود قابلیت در سبد
  const isFeatureIncluded = (featureName) => {
    return includedFeaturesInCart().includes(featureName);
  };

  const isAnyAddonOfFeatureInCart = (feature) => {
    return feature.addons.some((addon) =>
      cart.isItemInCart(`addon-${addon.addon_id}`)
    );
  };

  // مرتب‌سازی لیست قابلیت‌ها
  const sortedFeatures = () => {
    const features = (props.features || []).filter(
      (f) => f.feature_id != null && f.is_active && f.addons?.[0]?.price > 0
    );

    return features.sort((a, b) => {
      const aInPlan = isFeatureIncluded(a.feature_name);
      const bInPlan = isFeatureIncluded(b.feature_name);
      if (aInPlan && !bInPlan) return 1;
      if (!aInPlan && bInPlan) return -1;
      return 0;
    });
  };

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
                const isIncluded = () => isFeatureIncluded(feature.feature_id);
                const hasAnyAddon = () => isAnyAddonOfFeatureInCart(feature);

                return (
                  <div
                    class={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all h-fit ${
                      isIncluded() ? "opacity-75 grayscale-[0.5]" : ""
                    }`}
                  >
                    <button
                      onClick={() => setIsOpen(!isOpen())}
                      class={`w-full p-3 bg-white hover:bg-gray-50 flex flex-col sm:flex-row items-center justify-between
                        ${
                            isIncluded() ? " cursor-default" : ""
                          }
                        `}
                    >
                      <div class="flex flex-col items-center sm:items-start text-center sm:text-right">
                        <h4 class="font-bold text-gray-900 text-lg flex items-center">
                          {feature.feature_name}
                          <Show when={isIncluded()}>
                            <span class="absolute bottom-0 left-0 text-[10px] text-center bg-green-100 text-green-700 m-1 px-1 rounded-xl font-medium">
                              موجود در پلن انتخابی
                            </span>
                          </Show>
                        </h4>
                        <p class="text-gray-500 text-xs mt-1">
                          {feature.description}
                        </p>
                        <Show when={!isIncluded()}>
                          <div class="text-sm font-bold text-indigo-600 mt-1">
                            از {formatPriceJS(feature.addons[0].price)} تومان
                          </div>
                        </Show>
                      </div>

                      <Show when={!isIncluded()}>
                        <div class="mt-3 sm:mt-0 bg-blue-50 p-2 rounded-full text-blue-600">
                          <ChevronDown isOpen={isOpen()} />
                        </div>
                      </Show>
                    </button>
                    <Show when={!isIncluded()}>
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
                              const isDisabled = () =>
                                isIncluded() || (hasAnyAddon() && !isInCart());

                              return (
                                <div
                                  class={`p-2 bg-white rounded-xl border flex relative items-center justify-between transition-all ${
                                    isDisabled()
                                      ? "opacity-40 grayscale pointer-events-none"
                                      : "hover:border-blue-200"
                                  }`}
                                >
                                  <Show
                                    when={
                                      addon.discounted_price &&
                                      addon.discounted_price !== 0
                                    }
                                  >
                                    <span class="text-2 bg-red-100 text-red-600 px-2 flex item-center rounded font-bold absolute top-0 right-0 rotate-15 opacity-90">
                                      {Math.round(
                                        ((addon.price -
                                          addon.discounted_price) /
                                          addon.price) *
                                          100
                                      )}
                                      %
                                    </span>
                                  </Show>

                                  <span class="text-sm font-bold text-gray-700">
                                    {addon.duration_months} ماهه
                                  </span>
                                  <div class="flex items-center gap-3">
                                    <div class="text-left">
                                      <div class="text-md font-bold text-indigo-700">
                                        {formatPriceJS(
                                          addon.discounted_price || addon.price
                                        )}
                                        <span class="text-[10px] text-gray-400 m-1">
                                          تومان
                                        </span>
                                      </div>
                                      <Show when={addon.discounted_price}>
                                        <div class="text-xs text-right text-red-400 line-through font-semibold">
                                          {formatPriceJS(addon.price)}
                                        </div>
                                      </Show>
                                    </div>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCartAction(
                                          feature.feature_name,
                                          addon
                                        );
                                      }}
                                      disabled={isDisabled()}
                                      class={`flex items-center justify-center p-2 rounded-lg text-white ${
                                        isInCart()
                                          ? "bg-red-500"
                                          : "bg-blue-600"
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
                    </Show>
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
