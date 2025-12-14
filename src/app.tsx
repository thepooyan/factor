import "@unocss/reset/tailwind.css";
import Cookie from "js-cookie"
import "./app.scss"
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, onMount, Suspense } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import Modal from "./components/modal/Modal";
import { userMg } from "./utility/signals";
import { queryConfig } from "./utility/queries";
import SpinnerPage from "./components/general/SpinnerPage";
import { CartProvider } from "./context/Cart/cartContext"; 


export default function App() {
  
  onMount(() => {
    let authC = Cookie.get("auth")
    if (authC) {
      try {
        let user = JSON.parse(authC)
        userMg.login(user)
      } catch(_) {
        Cookie.remove("auth")
      }
    }
  })
  const queryClient = new QueryClient(queryConfig);

  return (
    <>
    <QueryClientProvider client={queryClient}>
        <Router
          root={(props) => (
            <>
              <ErrorBoundary fallback={(err, reset) => 
                  <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
                      <h2>❌ خطا در رندرینگ کامپوننت</h2>
                      <p><strong>پیام خطا:</strong> {err.message}</p>
                      
                      {/* می‌توانید دکمه‌ای برای تلاش مجدد قرار دهید */}
                      <button onClick={reset} style={{ margin: '10px' }}>
                          تلاش مجدد
                      </button>
                  </div>
              }>
                  {/* کامپوننت‌های فرزند که ممکن است خطا دهند */}
                  <CartProvider>
                    <Suspense fallback={<SpinnerPage/>}>{props.children}</Suspense>
                  </CartProvider>
              </ErrorBoundary>
            </>
          )}
        >
          <FileRoutes />
          <Modal/>
        </Router>
    </QueryClientProvider>
    </>
  );
}
