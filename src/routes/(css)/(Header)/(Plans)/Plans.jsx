import { For } from 'solid-js';
import { PlanCard } from '~/components/Plans/PlanCard';
import { FeatureToggle } from '~/components/Plans/FeatureToggle';
import { features_comparison , plan_prices } from '~/data/plans'; // 🔑 ایمپورت داده‌ها
import { PlansComparisonTable } from '~/components/Plans/PlansComparisonTable';
import { api } from "~/utility/api"
import { createResource } from 'solid-js';



const fetchFeatures = async () => {
    const response = await api.get('/buy-features/get-AllFeatures'); 
    return response.data;
};

const fetchPlans = async () => {
    const response = await api.get('/buy-plans/get-AllPlans'); 
    return response.data;
};

export default function ProductsPage() {
    // const [features] = createResource(fetchFeatures); 
    // const [plans] = createResource(fetchPlans);

    return (        
        <div class="container mx-auto p-8" style={{fontFamily: 'IRANSans, Tahoma'}}>
            
            {/* # ۱. نمایش پلن‌های زمانی (زیر هم در کامپیوتر) */}
            <section class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-10 text-gray-800" style={{direction: 'rtl'}}>
                    انتخاب پلن زمانی مناسب برای شما
                </h2>
                <PlansComparisonTable features={features_comparison} plans={plan_prices} />
                {/* 🔑 ساختار اصلی پلن‌ها: نمایش در یک ردیف در دسکتاپ */}
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 justify-center">
                    <PlanCard plans={plan_prices} />
                </div>
            </section>
            
            <hr class="my-12 border-gray-200" />

            {/* # ۲. نمایش قابلیت‌های جداگانه قابل خرید */}
            <section>
                <h2 class="text-3xl font-bold text-center mb-10 text-gray-800" style={{direction: 'rtl'}}>
                    قابلیت‌های قابل خرید جداگانه
                </h2>
                
                <p class="text-center text-gray-600 mb-8 max-w-2xl mx-auto" style={{direction: 'rtl'}}>
                    این قابلیت‌ها به صورت زمان‌دار و مستقل از پلن‌های اصلی، قابل اضافه شدن به حساب کاربری شما هستند.
                </p>

                <div class="max-w-4xl mx-auto space-y-4">
                    <FeatureToggle features={features_comparison} />
                </div>
            </section>
        </div>
    );
}