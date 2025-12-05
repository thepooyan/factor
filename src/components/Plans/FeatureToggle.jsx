import { BsCartPlus } from 'solid-icons/bs'


export function FeatureToggle(props) {
    const { 
        feature_id , price , description , logo , is_active , category , feature_name
     } = props.feature;

    return (
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg border-b border-gray-200" style={{direction: 'rtl'}}>
            <div class="flex-grow">
                <h4 class="text-lg font-bold text-gray-800">{feature_name} </h4>
                <p class="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <div class="flex items-center ml-4">
                <span class="text-xl font-bold text-indigo-600 shrink-0">{price}</span>
                <span class="text-sm text-gray-500 mr-1 shrink-0">تومان</span>
                <button
                    class="mr-4 px-4 py-2 bg-indigo-500 text-white rounded-md                     bg-gradient-to-r from-blue-500 to-blue-700 
                    hover:from-blue-600 hover:to-blue-800
                    transition duration-200
                    shrink-0"
                >
                    <BsCartPlus class='m-a' />
                </button>
            </div>
        </div>
    );
}