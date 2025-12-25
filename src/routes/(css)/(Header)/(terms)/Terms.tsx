import { createSignal, For, Show, createMemo, createResource, onMount, onCleanup } from 'solid-js';
import { api } from '~/utility/api';
// فرض بر این است که اکسایوس یا اینستنس api شما در پروژه تعریف شده است
  const fetchTerms = async () => {
    try {
      // آدرس اصلاح شده طبق درخواست شما: terms/all-latest
      const response = await api.get("terms/all-latest");
      return response.data as Term[];
    } catch (error: any) {
      const errorMsg = error?.msg || error?.message || "خطای نامشخص در API";
      console.error("خطا در دریافت قوانین:", errorMsg, error);
      return []; 
    }
  };

  // استفاده از Resource برای مدیریت دیتای Async در SolidJS
  const [terms] = createResource<Term[]>(fetchTerms);


interface Term {
  term_id: number;
  title: string;
  content: string;
  term_type: string;
  version: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export default function TermsPage() {
  const [activeId, setActiveId] = createSignal<number | null>(null);
  
  const fetchTerms = async () => {
    try {
      const response = await api.get("terms/all-latest");
      // اگر دیتا خالی بود یا مشکلی داشت، اینجا مدیریت می‌کنیم
      return (response.data || []) as Term[];
    } catch (error: any) {
      const errorMsg = error?.msg || error?.message || "خطای نامشخص در API";
      console.error("خطا در دریافت قوانین:", errorMsg, error);
      return []; 
    }
  };

  const [terms] = createResource<Term[]>(fetchTerms);
  const activeTerms = createMemo(() => (terms() || []).filter(t => t.is_active));

  // منطق تشخیص بخش فعال هنگام اسکرول
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.id.replace('term-', ''));
            setActiveId(id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' } 
    );

    const setupObserver = () => {
      const sections = document.querySelectorAll('section[id^="term-"]');
      if (sections.length > 0) {
        sections.forEach((section) => observer.observe(section));
        return true;
      }
      return false;
    };

    // چک کردن دوره‌ای برای اطمینان از رندر شدن المان‌ها قبل از مشاهده
    const checkTimer = setInterval(() => {
      if (!terms.loading && activeTerms().length > 0) {
        if (setupObserver()) clearInterval(checkTimer);
      }
    }, 100);

    onCleanup(() => {
      observer.disconnect();
      clearInterval(checkTimer);
    });
  });

  return (
    <div class="min-h-screen bg-slate-50 font-sans" style={{ direction: 'rtl' }}>
      <main class="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        
        <aside class="hidden md:block w-64 shrink-0">
          <nav class="sticky top-24 space-y-2">
            <p class="text-[10px] font-bold text-slate-400 mb-4 px-3 tracking-widest uppercase text-right">فهرست مطالب</p>
            <Show when={terms.loading}>
                <div class="animate-pulse space-y-2 px-3">
                    <div class="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div class="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
            </Show>
            <For each={activeTerms()}>
              {(term) => (
                <a 
                  href={`#term-${term.term_id}`}
                  class={`block px-4 py-2 text-sm transition-all border-r-2 rounded-l-xl ${
                    activeId() === term.term_id 
                    ? 'text-blue-700 bg-blue-50 border-blue-600 font-bold' 
                    : 'text-slate-600 border-transparent hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  {term.title}
                </a>
              )}
            </For>
          </nav>
        </aside>

        <div class="flex-1 space-y-6">
          <Show when={terms.loading}>
             <div class="flex flex-col items-center justify-center py-20 text-slate-400">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                <p class="text-sm font-bold">در حال دریافت قوانین...</p>
             </div>
          </Show>

          <Show when={!terms.loading && activeTerms().length === 0}>
             <div class="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <p class="text-slate-500 font-bold">قانونی برای نمایش یافت نشد.</p>
             </div>
          </Show>

          <For each={activeTerms()}>
            {(term) => (
              <section 
                id={`term-${term.term_id}`} 
                class="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow scroll-mt-24"
              >
                <div class="flex items-center gap-3 mb-6">
                  <span class={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    activeId() === term.term_id ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                  }`}>
                    {term.term_id}
                  </span>
                  <h2 class="text-xl font-extrabold text-slate-800">{term.title}</h2>
                </div>
                
                <div class="text-slate-600 leading-9 text-justify text-base whitespace-pre-line">
                  {term.content}
                </div>

                <div class="mt-8 pt-4 border-t border-slate-50 flex justify-end">
                   <span class="text-[10px] text-slate-400 font-medium">
                بروزرسانی: {new Date(term.created_at).toLocaleDateString('fa-IR')}
                   </span>
                </div>
              </section>
            )}
          </For>

          <Show when={!terms.loading && activeTerms().length > 0}>
            <div class="text-center py-10 opacity-50">
               <div class="w-12 h-1 bg-slate-300 mx-auto rounded-full mb-4"></div>
               <p class="text-xs text-slate-500 font-bold">پایان سند قوانین و مقررات</p>
            </div>
          </Show>
        </div>
      </main>
    </div>
  );
}