import { For } from 'solid-js';
import { FiCheck, FiX } from 'solid-icons/fi'; // برای آیکون‌های تیک و ضربدر

// تابعی برای استخراج نام تمام قابلیت‌های یکتا از همه پلن‌ها
const getUniqueFeatures = (features) => {

    if (!Array.isArray(features)) {
        return []; // هنوز دیتا نیومده
    }

    const featureSet = new Set();
    features.forEach(feature => {
        featureSet.add(feature.feature_name);
    });

    return Array.from(featureSet);
};
const getUniquePlanName = (plans) => {
    if (!Array.isArray(plans)) {
        return []; // هنوز دیتا نیومده
    }
    const plansSet = new Set();
    plans.forEach(plan => {
            plansSet.add(plan.plan_name);
        });
        return Array.from(plansSet);
}; 

export function PlansComparisonTable(props) {
    // 🔑 استخراج لیست قابلیت‌ها برای ساخت سطرها
    const featuresList = getUniqueFeatures(props.features);
    const plansList = getUniquePlanName(props.plans);
    console.log(plansList)

    return (
        <div class="overflow-x-auto m-auto mb-12 shadow-lg rounded-xl border border-gray-200 bg-white max-w-[70vw]">
            <table class="min-w-full divide-y divide-gray-200" style={{direction: 'rtl'}}>
                
                {/* <thead>: ردیف اول شامل نام پلن‌ها */}
                <thead class="bg-gray-50 z-10">
                    <tr>
                        <th 
                            scope="col" 
                            class="px-1 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap "
                        >
                            قابلیت
                        </th>
                        {/* 🔑 ساخت ستون برای هر پلن */}
                        <For each={plansList}>
                            {(plan) => (
                                <th 
                                    scope="col" 
                                    class={`
                                            px-1 py-4 text-center text-sm font-bold uppercase tracking-wider border-r w-40 
                                            ${
                                                plan === 'Premium'  ? 'text-yellow-600 shadow-md  shadow-yellow-200 ' :
                                                // plan.isPopular ? 'text-blue-600' :
                                                'text-gray-700'
                                            } 
                                        `}
                                >
                                    {plan}
                                </th>
                            )}
                        </For>
                    </tr>
                </thead>
                
                {/* <tbody>: سطرها شامل قابلیت‌ها و وضعیت آن‌ها */}
                <tbody class="divide-y divide-gray-100 z-0">
                    <For each={props.features}>
                        {(feature) => (
                            <tr class="hover:bg-gray-50">
                                {/* ستون اول: نام قابلیت */}
                                <td class="px-6 py-2 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                                    {feature.feature_name}
                                </td>
                                
                                {/* 🔑 مقایسه وضعیت قابلیت در هر پلن */}
                                <For each={plansList}>
                                    {(planName) => {
                                        const isAvailable = feature[planName];
                                        
                                        return (
                                            <td class="px-6 py-2 whitespace-nowrap text-sm text-center">
                                                {isAvailable 
                                                    ? <FiCheck class="text-green-500 w-5 h-5 mx-auto" /> 
                                                    : <FiX class="text-red-400 w-5 h-5 mx-auto" />
                                                }
                                            </td>
                                        );
                                    }}
                                </For>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    );
}