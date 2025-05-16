import { createSignal } from "solid-js";
import { Itoken, Iuser } from "./interface";
import Cookie from "js-cookie"

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
