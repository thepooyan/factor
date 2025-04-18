import { createSignal } from "solid-js";
import { Iuser } from "./interface";
// import { deleteCookie, getCookie, setCookie } from "vinxi/http";

const getInitialUser = () => {
  // let userCookie = getCookie("auth")
  // if (userCookie) {
  //   return JSON.parse(userCookie) as Iuser
  // }
  return null
}

const [userSignal, setUserSignal] = createSignal<Iuser | null>(getInitialUser());

export const userMg = {
  login: (user: Iuser) => {
    setUserSignal(user)
    // setCookie("auth", JSON.stringify(user))
  },
  logout: () => {
    setUserSignal(null)
    // deleteCookie("auth")
  },
  get: () => {
    return userSignal()
  }
}
