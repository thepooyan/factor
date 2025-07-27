import axios from "axios";
import { manualLogout, userMg } from "./signals";
import { Itoken } from "./interface";
import { callModal } from "~/components/modal/Modal";
import { Button } from "~/components/ui/button";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
})

api.interceptors.request.use(req => {
  let token = userMg.get()?.token.access_token;
  if (token)
    req.headers.Authorization = `Bearer ${token}`

  return req
})

api.interceptors.response.use(
  response => {
    return response
  },
  async (error) => {
    let msg = error.response.data.detail
    if (typeof msg !== "string") msg = error.message


    if (msg === "token_expired") {
      let rt = getCurrentRefreshToken();
      if (!rt) return Promise.reject({msg: "لطفا مجددا وارد شوید"})

      try {
        let {data: newToken} = await api.post<Itoken>("/refresh-token", {refresh_token: rt})
        userMg.setNewToken(newToken)
        error.config._retry = true
        return api(error.config)
      } catch(_) {
        callModal(() => (<>مدت زمان لوگین شما به پایان رسیده. لطفا مجددا وارد شوید <Button as="A" href="/Login">لوگین</Button></>))
        manualLogout()
        return Promise.reject({msg: "لطفا مجددا وارد شوید"})
      }
    }

    return Promise.reject({msg, error})
  }
)

const getCurrentRefreshToken = () => {
  return userMg.get()?.token.refresh_token
}

export {api}
