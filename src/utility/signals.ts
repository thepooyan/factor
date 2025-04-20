import { createSignal } from "solid-js";
import { Iuser } from "./interface";
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
  get: () => {
    return userSignal()
  }
}
