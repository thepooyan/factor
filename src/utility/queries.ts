import { useQuery, QueryClientConfig } from "@tanstack/solid-query";
import { api } from "./api";
import { ICompany, Iprofile } from "./interface";
import { selectedCompany, userMg } from "./signals";
import { AI_customer, AI_Factor, AI_ShareToken } from "./apiInterface";

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
  return useQuery(() => ({
    queryKey: ["userInfo", userMg.get()?.user.email],
    queryFn: () => api.get<Iprofile>("/users/infos"),
  }))
}

export const queryCompanies = () => {
  return useQuery(() => ({
    queryKey: ["compaines", userMg.get()?.user.email],
    queryFn: () => api.get<ICompany[]>("company/UserAllCompanies")
  }))
}


export const queryCustomers = () => {
  return useQuery(() => ({
    queryKey: ["customers", userMg.get()?.user.email, selectedCompany()?.company_id],
    queryFn: () => {
      let id = selectedCompany()?.company_id
      return api.post<AI_customer[]>("/customer/AllCustomersOfCompany", {company_id: id})
    }
  }))
}

export const queryFactorList = () => {
  return useQuery(() => ({
    queryKey: ["factors", userMg.get()?.user.email, selectedCompany()?.company_id],
    queryFn: () => {
      let id = selectedCompany()?.company_id
      return api.post<AI_Factor[]>("/factor/CompanyAllFactors", {company_id: id})
    }
  }))
}


export const queryFactorShareLink = (factor_id: number, company_id: number) => {
  return useQuery(() => ({
    queryKey: ["factors", userMg.get()?.user.email, factor_id, company_id],
    queryFn: () => {
      return api.post<AI_ShareToken>("/factor/CreateShareFactor", {
        "factor_id": factor_id,
        "company_id": company_id,
        "expire_datetime": null
    })
    }
  }))
}
