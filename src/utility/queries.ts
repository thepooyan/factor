import { createQuery, QueryClientConfig } from "@tanstack/solid-query";
import { api } from "./api";
import { Iprofile } from "./interface";
import { userMg } from "./signals";

export const queryConfig:QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5, // 5 min
      staleTime: Infinity,
      experimental_prefetchInRender: true
    }
  },
}

export const queryUserInfo = () => {
  return createQuery(() => ({
    queryKey: ["userInfo", userMg.get()?.user.email],
    queryFn: () => api.get<Iprofile>("/users/infos"),
  }))
}
