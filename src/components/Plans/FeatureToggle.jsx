import { For } from 'solid-js';
import { BsCartPlus } from 'solid-icons/bs'; 

export function FeatureToggle(props) {
    
    
    const validFeatures = props.features.filter(feature => {
        
        if (
            feature.feature_id == null || 
            feature.feature_name == null || 
            feature.feature_name.trim() === ''
        ) {
            return false; 
        }

        
        if (
            !feature.is_active || 
            feature.price === 0
        ) {
            return false; 
        }

        return true; 
    });

    return (
        <div class="space-y-4">
            <For each={validFeatures}>
                {(feature) => (
                    <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg border-b border-gray-200" style={{direction: 'rtl'}}>
                        <div class="flex-grow">
                            <h4 class="text-lg font-bold text-gray-800">{feature.feature_name} </h4>
                            <p class="text-sm text-gray-500 mt-1">{feature.description || 'توضیحات موجود نیست.'}</p>
                        </div>
                        <div class="flex items-center ml-4">
                            <span class="text-xl font-bold text-indigo-600 shrink-0">{feature.price}</span>
                            <span class="text-sm text-gray-500 mr-1 shrink-0">تومان</span>
                            <button
                                class="mr-4 px-4 py-2 text-white rounded-md 
                                        bg-gradient-to-r from-blue-500 to-blue-700 
                                        hover:from-blue-600 hover:to-blue-800
                                        transition duration-200
                                        shrink-0"
                            >
                                <BsCartPlus class='m-a' />
                            </button>
                        </div>
                    </div>
                )}
            </For>
            
            {/* 💡 اگر هیچ آیتم معتبری وجود نداشت */}
            {validFeatures.length === 0 && (
                <p class="text-center text-gray-500 p-8 border border-dashed rounded-lg">هیچ قابلیتی برای نمایش یافت نشد.</p>
            )}
        </div>
    );
}