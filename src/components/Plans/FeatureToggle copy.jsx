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
  const validFeatures = props.features.filter((feature) => {
    if (
      feature.feature_id == null ||
      feature.feature_name == null ||
      feature.feature_name.trim() === "" ||
      !feature.is_active ||
      feature.addons[0].price === 0
    ) {
      return false;
    }
    return true;
  });
  if (validFeatures.length === 0) {
    return <div class="text-center py-10 text-gray-400">موردی یافت نشد.</div>;
  }

  return (
    <div class=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start  "> 
      {/* تقسیم ویژگی‌ها به دو ستون مجزا برای جلوگیری از پرش آیتم‌ها به ستون دیگر */}
      <For each={[0, 1]}>
        {(columnIndex) => (
          <div class="flex flex-col gap-4">
            <For each={validFeatures.filter((_, i) => i % 2 === columnIndex)}>
              {(feature) => {
                const [isOpen, setIsOpen] = createSignal(false);

                return (
                  <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all h-fit">
                    {/* 🟦 هدر قابل کلیک */}
                    <button
                      onClick={() => setIsOpen(!isOpen())}
                      class="w-full p-3 bg-white hover:bg-gray-50 flex flex-col sm:flex-row items-center justify-between transition-colors"
                    >
                      <div class="flex flex-col items-center sm:items-start text-center sm:text-right">
                        <h4 class="font-bold text-gray-900 text-lg">
                          {feature.feature_name}
                        </h4>
                        <p class="text-gray-500 text-xs mt-1 line-clamp-1">
                          {feature.description}
                        </p>
                        <div class="text-sm font-bold text-indigo-600 mt-1">
                          از {formatPriceJS(feature.addons[0].price)} تومان
                        </div>
                      </div>

                      <div class="mt-3 sm:mt-0 bg-blue-50 p-2 rounded-full text-blue-600 flex items-center justify-center w-10 h-10 shrink-0">
                        <ChevronDown isOpen={isOpen()} />
                      </div>
                    </button>

                    {/* 🟨 لیست قیمت‌ها */}
                    <div
                      class={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen()
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div class="p-4 pt-0 space-y-2 bg-gray-50/30">

                        <For each={feature.addons.filter((a) => a.is_active)}>
                          {(addon) => (
                            <div class="p-2 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all mb-2">
                              {/* نمایش درصد تخفیف */}
                              <Show
                                when={
                                  addon.discounted_price &&
                                  addon.discounted_price !== 0
                                }
                              >
                                <div class="relative h-0">
                                  <span class="text-2 bg-red-100 text-red-600 px-2 flex item-center rounded font-bold absolute top-[-10px] right-0 rotate-15 opacity-90">
                                    {Math.round(
                                      ((addon.price - addon.discounted_price) /
                                        addon.price) *
                                        100
                                    )}
                                    %
                                  </span>
                                </div>
                              </Show>

                              <div class="flex items-center justify-between gap-2">
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
                                      <div class="text-xs text-center text-red-400 line-through font-semibold">
                                        {formatPriceJS(addon.price)}
                                      </div>
                                    </Show>
                                  </div>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePurchase(
                                        feature.feature_name,
                                        addon
                                      );
                                    }}
                                    class="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-95"
                                  >
                                    <BsCartPlus />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
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
