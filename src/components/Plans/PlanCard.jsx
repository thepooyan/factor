import { FiCheckCircle, FiXCircle } from "solid-icons/fi";
import formatPriceJS from "~/utility/formatting";
import { BsCartPlus, BsCartX } from "solid-icons/bs";
import { useCart } from "~/context/Cart/cartContext";
import { useToast } from "~/context/Cart/ToastContext";

export function PlanCard(props) {
  const { addToCart, removeItemFromCart, isItemInCart, isCartEmpty } =
    useCart();
  const { addToast } = useToast();

    const validPlans = () => (props.plans || []).filter(plan => {
        return (
            plan &&
            plan.is_active &&
            plan.price > 0 &&
            plan.plan_id != null &&
            String(plan.plan_id) !== '1' &&
            plan.plan_name &&
            plan.plan_name.trim() !== ''
        );
    });

  const handleCartAction = (plan) => {
    const planId = String(plan.plan_id);
    const inCart = isItemInCart(planId);

    if (inCart) {
      removeItemFromCart(planId);
      addToast(`پلن ${plan.plan_name} از سبد حذف شد.`, "deleted");
    } else {
      const itemToAdd = {
        id: planId,
        name: plan.plan_name,
        price: plan.price,
        img: plan.image_url || "",
        href: "/checkout",
      };

      const wasAdded = addToCart(itemToAdd);
      if (wasAdded) {
        addToast(`${plan.plan_name} با موفقیت به سبد خرید اضافه شد`, "success");
      } else {
        addToast(
          `پلن ${plan.plan_name} قبلاً در سبد خرید شما وجود دارد`,
          "warning"
        );
      }
    }
  };

  return (
    <For each={validPlans()}>
      {(plan) => {
        const planId = String(plan.plan_id);
        const isInCart = () => isItemInCart(planId);
        // قانون: اگه سبد پره و این پلن توش نیست، غیرفعال بشه
        const isDisabled = () => !isCartEmpty() && !isInCart();

        return (
          <div
            class={`
                        text-center
                        bg-white
                        sm:px-6 sm:py-3 p-3 m-auto
                        rounded-xl shadow-xl 
                        transition-transform duration-300 transform 
                        text-right font-medium 
                        w-11/10 max-w-45
                        sm:max-w-100
                        sm:w-45 
                        md:w-50 
                        lg:w-35 
                        ${
                          isInCart()
                            ? "border-blue-500 scale-105 z-10"
                            : "border-transparent"
                        }
                        ${
                          isDisabled()
                            ? "opacity-40 grayscale pointer-events-none"
                            : ""
                        }

                        ${
                          plan.plan_name === "Premium"
                            ? "  shadow-yellow-200 border-2 border-yellow-300"
                            : // plan.isPopular ? 'text-blue-600' :
                              "text-gray-700"
                        } 

                    `}
            style={{ direction: "rtl" }}
          >
            {/* 🏷️ تگ محبوب‌ترین */}
            {/* {isPopular && (
                        <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                            پیشنهاد ویژه
                        </div>
                    )} */}

            <h3
              class={`
                        border-b-1 border-blue-500 
                        text-md text-center font-extrabold text-gray-800 
                        ${
                          plan.plan_name === "Premium"
                            ? "  border-yellow-500"
                            : "border-blue-500"
                        }
                    `}
            >
              <div>پلن</div>
              <span
                class={`
                                ${
                                  plan.plan_name === "Premium"
                                    ? " text-yellow-600 "
                                    : "text-gray-800"
                                }
                            `}
              >
                {plan.plan_name}
              </span>
            </h3>
            <h4
              class={`
                        text-center text-gray-800 pt-4 
                        border-b-2 border-blue-500
                        ${
                          plan.plan_name === "Premium"
                            ? "  border-yellow-500"
                            : "border-blue-500"
                        }
                        `}
            >
              {plan.time_in_months} ماهه
            </h4>

            {/* 💰 قیمت */}
            <div class="text-md my-4 text-center ">
              <span class=" font-black text-gray-900">
                {formatPriceJS(plan.price)}
              </span>
              <br />
              <span class="text-sm text-gray-500">تومان</span>
              {/* {discount > 0 && (
                            <span class="block text-sm text-red-500 line-through mt-1">
                                تخفیف {discount}%
                            </span>
                        )} */}
            </div>
            <div class="flex justify-center items-center">
              <button
                onClick={() => handleCartAction(plan)}
                disabled={isDisabled()}
                class={`
                                w-1/2 py-2 rounded-lg text-white font-bold text-lg relative z-9999 cursor-pointer
                                 
                                transition duration-200
                                        ${
                                          isInCart()
                                            ? "bg-red-600 hover:bg-red-700"
                                            : plan.plan_name === "Premium"
                                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-800"
                                            : "bg-gradient-to-r from-blue-500 to-blue-700 from-blue-600 hover:to-blue-800"
                                        }
                                        ${
                                          isDisabled()
                                            ? "bg-gray-300 text-gray-500"
                                            : ""
                                        }
                            `}
              >

                {isInCart() ? <BsCartX class='m-auto pointer-events-none' size={20} /> : <BsCartPlus class='m-auto pointer-events-none' size={20} />}
              </button>
            </div>

            {/* 📝 قابلیت‌ها */}
            {/* <ul class="mt-6 space-y-3">
                        <For each={features}>
                            {(feature) => (
                                <li class="flex items-center">
                                    {feature.available 
                                        ? <FiCheckCircle class="text-green-500 ml-2 shrink-0 h-5 w-5" /> 
                                        : <FiXCircle class="text-gray-400 ml-2 shrink-0 h-5 w-5" />
                                    }
                                    <span class={feature.available ? 'text-gray-700' : 'text-gray-500 line-through'}>
                                        {feature.name}
                                    </span>
                                </li>
                            )}
                        </For>
                    </ul> */}
          </div>
        );
      }}
    </For>
  );
}
