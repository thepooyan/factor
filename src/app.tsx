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
    <Modal/>
    <QueryClientProvider client={queryClient}>
        <Router
          root={(props) => (
            <>
              <ErrorBoundary fallback="Error!">
                <Suspense fallback="loading...">{props.children}</Suspense>
              </ErrorBoundary>
            </>
          )}
        >
          <FileRoutes />
        </Router>
    </QueryClientProvider>
    </>
  );
}
