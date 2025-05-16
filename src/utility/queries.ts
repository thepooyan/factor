import { createQuery, QueryClientConfig } from "@tanstack/solid-query";
import { api } from "./api";
import { ICompany, Iprofile } from "./interface";
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

export const queryCompanies = () => {
  return createQuery(() => ({
    queryKey: ["compaines", userMg.get()?.user.email],
    queryFn: () => api.get<ICompany[]>("company/UserAllCompanies")
  }))
}
