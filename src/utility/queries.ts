import { useQuery, QueryClientConfig, useQueryClient } from "@tanstack/solid-query";
import { api } from "./api";
import { ICompany, Iprofile } from "./interface";
import { selectedCompany } from "./signals";
import { AI_customer, AI_Factor, AI_FactorView, AI_ShareToken } from "./apiInterface";

enum queryKeys {
  userInfo,
  companies,
  customers,
  factors,
  factorLink,
  factorView,
  factorViewPublic
}

type QueryValue = queryKeys | (string | number | undefined)[]

const queryKeysWithSignal = {
  get companyCustomer() {
    return [queryKeys.customers, selectedCompany()?.company_id]
  },
  get companyFactors() {
    return [queryKeys.factors, selectedCompany()?.company_id]
  }
}

const queries = {
  ...queryKeys,
  ...queryKeysWithSignal
}

export const key = (
  arg: (keys: typeof queries) => QueryValue,
  ...tag: (string | number | undefined)[]
) => {
  const value = arg(queries)
  const queryKey = Array.isArray(value) ? value : [value, ...tag]
  return { queryKey }
}

export const useInvalidate = () => {
  const qc = useQueryClient()

  const helper = (
    arg: (keys: typeof queries) => QueryValue,
    ...tag: (string | number | undefined)[]
  ) => {
    const value = arg(queries)
    const queryKey = Array.isArray(value) ? value : [value, ...tag]
    qc.invalidateQueries({ queryKey })
  }

  return helper
}

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
    ...key(q => q.userInfo),
    queryFn: () => api.get<Iprofile>("/users/infos"),
  }))
}

export const queryCompanies = () => {
  return useQuery(() => ({
    ...key(q => q.companies),
    queryFn: () => api.get<ICompany[]>("company/UserAllCompanies"),
  }))
}

export const queryCustomers = () => {
  return useQuery(() => ({
    ...key(q => q.companyCustomer),
    queryFn: () => {
      let id = selectedCompany()?.company_id
      return api.post<AI_customer[]>("/customer/AllCustomersOfCompany", {company_id: id})
    }
  }))
}

export const queryFactorList = () => {
  return useQuery(() => ({
    ...key(q => q.companyFactors),
    queryFn: () => {
      let id = selectedCompany()?.company_id
      return api.post<AI_Factor[]>("/factor/CompanyAllFactors", {company_id: id})
    }
  }))
}


export const queryFactorShareLink = (factor_id: number, company_id: number) => {
  return useQuery(() => ({
    ...key(q=>q.factorLink, factor_id, company_id),
    queryFn: () => {
      return api.post<AI_ShareToken>("/factor/CreateShareFactor", {
        "factor_id": factor_id,
        "company_id": company_id,
        "expire_datetime": null
    })
    }
  }))
}

export const queryFactorView = (factor_id: string, company_id: number) => {
  return useQuery(() => ({
    ...key(q => q.factorView, factor_id, company_id),
    queryFn: () => {
      return api.post<AI_FactorView>("/factor/infos", {factor_id: factor_id, company_id: company_id})
    }
  }))
}

export const queryFactorViewPublic = (token: string) => {
  return useQuery(() => ({
    ...key(q => q.factorViewPublic, token),
    queryFn: () => {
      return api.get<AI_FactorView>(`/factor/AccessShareFactor/${token}`)
    }
  }))
}
