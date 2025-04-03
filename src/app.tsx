import "@unocss/reset/tailwind.css";
import "./app.scss"
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import Modal from "./components/modal/Modal";

export let qc = new QueryClient();

export default function App() {

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
