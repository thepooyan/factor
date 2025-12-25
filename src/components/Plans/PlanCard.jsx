import { FiCheckCircle, FiXCircle } from 'solid-icons/fi';
import formatPriceJS from '~/utility/formatting';
import { BsCartPlus } from 'solid-icons/bs'
import { useCart } from '~/context/Cart/cartContext';
import { useToast } from '~/context/Cart/ToastContext';

export function PlanCard(props) {
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const validPlans = props.plans.filter(plan => {
        if (
            !plan ||
            !plan.is_active ||
            plan.price === 0 ||
            plan.plan_id == null || 
            plan.plan_id == 1 || 
            plan.plan_name == null || 
            plan.plan_name.trim() === ''
        ) {
            return false; 
        }
        return true; 

    });

    const handleAddToCart = (plan) => {

        // 🔑 ساخت آبجکت CartItems_if برای ارسال
            const itemToAdd = {
                id: plan.plan_id, 
                name: plan.plan_name,
                price: plan.price,
                img: plan.image_url, 
                href: '/checkout' 
            };

            const wasAdded = addToCart(itemToAdd);

            if (wasAdded) {
                addToast(`${plan.plan_name} با موفقیت به سبد خرید اضافه شد`, "success");
            } else {
                addToast(`پلن ${plan.plan_name} قبلاً در سبد خرید شما وجود دارد`, "warning");
            }
        };
        
    return (
        
        <For each={validPlans} >
            {(plan) => (
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
                            plan.plan_name === 'Premium'  ? '  shadow-yellow-200 border-2 border-yellow-300' :
                            // plan.isPopular ? 'text-blue-600' :
                            'text-gray-700'
                        } 

                    `}
                    style={{direction: 'rtl'}}
                >

                    {/* 🏷️ تگ محبوب‌ترین */}
                    {/* {isPopular && (
                        <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                            پیشنهاد ویژه
                        </div>
                    )} */}
                    
                    <h3 class={`
                        border-b-1 border-blue-500 
                        text-md text-center font-extrabold text-gray-800 
                        ${
                            plan.plan_name === 'Premium'  ? '  border-yellow-500' : 'border-blue-500'
                        }
                    `}
                    >
                        <div>
                            پلن
                        </div>
                        <span class={`
                                ${
                                    plan.plan_name === 'Premium'  ? ' text-yellow-600 ' : 'text-gray-800'
                                }
                            `}>
                            {plan.plan_name}

                        </span>
                    </h3>
                    <h4 class={`
                        text-center text-gray-800 pt-4 
                        border-b-2 border-blue-500
                        ${
                            plan.plan_name === 'Premium'  ? '  border-yellow-500' : 'border-blue-500'}
                        `}
                    >
                        {plan.time_in_months} ماهه
                    </h4>
                    
                    {/* 💰 قیمت */}
                    <div class="text-md my-4 text-center ">
                        <span class=" font-black text-gray-900">{formatPriceJS(plan.price)}</span>
                        <br/>
                        <span class="text-sm text-gray-500">تومان</span>
                        {/* {discount > 0 && (
                            <span class="block text-sm text-red-500 line-through mt-1">
                                تخفیف {discount}%
                            </span>
                        )} */}
                    </div>
                    <div class="flex justify-center items-center">
                        <button 
                            onClick={() => handleAddToCart(plan)}

                            class={`
                                w-1/2 py-2 rounded-lg text-white font-bold text-lg relative z-9999 cursor-pointer
                                 
                                hover:from-blue-600 hover:to-blue-800
                                transition duration-200
                                ${
                                    plan.plan_name === 'Premium'  ? 'bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-600 hover:to-yellow-800' :
                                    'text-gray-700 bg-gradient-to-r from-blue-500 to-blue-700'
                                } 

                            `}
                            
                        >
                            <BsCartPlus class='m-auto pointer-events-none' />
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
            )}
        </For>

    );
}