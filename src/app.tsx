import "@unocss/reset/tailwind.css";
import Cookie from "js-cookie"
import "./app.scss"
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { onMount, Suspense } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import Modal from "./components/modal/Modal";
import { userMg } from "./utility/signals";

export let qc = new QueryClient();

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

  return (
    <>
    <Modal/>
    <QueryClientProvider client={qc}>
        <Router
          root={(props) => (
            <>
              <Suspense>{props.children}</Suspense>
            </>
          )}
        >
          <FileRoutes />
        </Router>
    </QueryClientProvider>
    </>
  );
}
