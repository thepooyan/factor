import { FiCheckCircle, FiXCircle } from 'solid-icons/fi';
import formatPriceJS from '~/utility/formatting';
import { BsCartPlus } from 'solid-icons/bs'

export function PlanCard(props) {
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
    const handleAddToCart = () => {
            // 🔑 فراخوانی فانکشن سراسری addToCart
            addToCart({
                id: plan.plan_id,
                name: plan.plan_name,
                price: plan.price,
                type: 'Plan' // برای تشخیص نوع آیتم
            });
            alert(`پلن ${plan.plan_name} به سبد خرید اضافه شد!`); // یک فیدبک ساده
        };

    return (
        <For each={validPlans}>
            {(plan) => (
                <div 
                    class={`
                        bg-white
                        max-w-60 px-6 py-3 m-auto
                        rounded-xl shadow-xl 
                        transition-transform duration-300 transform 
                        text-right font-medium 
                        md:min-w-50
                        lg:min-w-40
                    `}
                    style={{direction: 'rtl'}}
                >

                    {/* 🏷️ تگ محبوب‌ترین */}
                    {/* {isPopular && (
                        <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                            پیشنهاد ویژه
                        </div>
                    )} */}
                    
                    <h3 class="text-2xl text-center font-extrabold text-gray-800 
                        border-b-1 border-blue-500 
                    ">
                        پلن <br/>
                        {plan.plan_name}
                    </h3>
                    <h4 class="text-2xl text-center text-gray-800 pt-4 
                    border-b-2 border-blue-500
                    ">
                        {plan.time_in_months} ماهه
                    </h4>
                    
                    {/* 💰 قیمت */}
                    <div class="my-4 text-center ">
                        <span class="text-xl font-black text-gray-900">{formatPriceJS(plan.price)}</span>
                        <br/>
                        <span class="text-lg text-gray-500 mr-2">تومان</span>
                        {/* {discount > 0 && (
                            <span class="block text-sm text-red-500 line-through mt-1">
                                تخفیف {discount}%
                            </span>
                        )} */}
                    </div>

                    <button 
                        class={`
                            w-full py-3 rounded-lg text-white font-bold text-lg 
                            bg-gradient-to-r from-blue-500 to-blue-700 
                            hover:from-blue-600 hover:to-blue-800
                            transition duration-200
                        `}
                        // onClick={handleAddToCart}
                    >
                        <BsCartPlus class='m-a' />
                    </button>

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