import { createSignal, createContext, useContext, ParentComponent, For, onMount, createMemo } from "solid-js";

type ToastType = 'warning' | 'success' | 'error';

interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const Toast: ParentComponent<{ 
    id: number; 
    message: string; 
    type: ToastType; 
    removeToast: (id: number) => void; 
}> = (props) => {
    const duration = 3000; // 5 ثانیه

    onMount(() => {
        const timer = setTimeout(() => props.removeToast(props.id), duration);
        return () => clearTimeout(timer);
    });

    const themes: Record<ToastType, { bg: string, text: string, border: string, stroke: string, progress: string }> = {
        'warning': { bg: "bg-yellow-50", text: "text-amber-900", border: "border-amber-100", stroke: "stroke-amber-100", progress: "stroke-amber-500" },
        'success': { bg: "bg-green-50", text: "text-emerald-900", border: "border-emerald-100", stroke: "stroke-emerald-100", progress: "stroke-emerald-500" },
        'error': { bg: "bg-white", text: "text-rose-900", border: "border-rose-100", stroke: "stroke-rose-100", progress: "stroke-rose-500" },
    };
    
    const theme = themes[props.type] || themes.warning;

    return (
        <div 
            class={`flex items-center min-h-[56px] px-4 py-2 mb-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${theme.bg} ${theme.border} animate-in fade-in slide-in-from-top-2`}
            style={{ direction: 'rtl' }}
        >
            {/* 📝 متن پیام با تراز عمودی دقیق */}
            <div class="flex-grow text-[13px] font-medium leading-relaxed pt-0.5">
                {props.message}
            </div>

            {/* 🕒 دکمه بستن و دایره پیشرفت ترکیبی */}
            <div class="relative flex-shrink-0 flex items-center justify-center mr-4 w-8 h-8">
                {/* دایره SVG که دور دکمه می‌چرخه */}
                <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke-width="2.5"
                        fill="transparent"
                        class={theme.stroke}
                    />
                    <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke-width="2.5"
                        fill="transparent"
                        stroke-dasharray="87.96" 
                        stroke-linecap="round"
                        class={`${theme.progress}`}
                        style={{
                            "animation": `toast-timeout ${duration}ms linear forwards`,
                            "stroke-dashoffset": "0"
                        }}
                    />
                </svg>

                {/* دکمه ضربدر در مرکز */}
                <button 
                    onClick={() => props.removeToast(props.id)}
                    class="relative z-10 flex items-center justify-center w-6 h-6 rounded-full hover:bg-black/5 transition-colors group"
                >
                    <svg class="w-3 h-3 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <style>{`
                @keyframes toast-timeout {
                    from { stroke-dashoffset: 0; }
                    to { stroke-dashoffset: 87.96; } 
                }
            `}</style>
        </div>
    );
};

export const ToastProvider: ParentComponent = (props) => {
    const [toasts, setToasts] = createSignal<ToastItem[]>([]);
    let nextId = 0;

    const addToast = (message: string, type: ToastType = 'warning'): void => {
        const id = nextId++;
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: number): void => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {props.children}
            <div class="fixed top-6 left-6 z-[9999] flex flex-col w-[320px]"> 
                <For each={toasts()}>
                    {(toast) => (
                        <Toast 
                            id={toast.id} 
                            message={toast.message} 
                            type={toast.type} 
                            removeToast={removeToast}
                        />
                    )}
                </For>
            </div>
        </ToastContext.Provider>
    );
};

export function useToast(): ToastContextType {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
}