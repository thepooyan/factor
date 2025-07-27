import { createEffect, createSignal } from "solid-js";
import { ICompany, Itoken, Iuser } from "./interface";
import Cookie from "js-cookie"
import { useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";

const [userSignal, setUserSignal] = createSignal<Iuser | null>(null);

export const userMg = {
  login: (user: Iuser) => {
    setUserSignal(user)
    Cookie.set("auth", JSON.stringify(user))
  },
  logout: () => {
    setUserSignal(null)
    Cookie.remove("auth")
  },
  get: () => userSignal(),
  setNewToken: (t: Itoken) => {
    let curretUser = userSignal()
    if (!curretUser) return
    let updatedUser = {...curretUser, token: t}; 
    userMg.login(updatedUser);
  }
}

export const useUser = () => {
  const nv = useNavigate()
  const qc = useQueryClient()

  const login = (user:Iuser) => {
    userMg.login(user)
    nv("/Panel")
  }

  const logout = () => {
    userMg.logout()
    nv("/")
    localStorage.removeItem("selectedCompany")
    qc.removeQueries()
    setSelectedCompany()
  }

  return {login , logout}
}

export const [selectedCompany, setSelectedCompany] = createSignal<ICompany | undefined>();

createEffect(() => {
  if (selectedCompany() !== undefined)
    localStorage.setItem("selectedCompany", JSON.stringify(selectedCompany()))
})

export const [taxRate, setTaxRate] = createSignal(10)
