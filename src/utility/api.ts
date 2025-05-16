import axios from "axios";
import { userMg } from "./signals";

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
  error => {
    let msg = error.response.data.detail
    if (typeof msg !== "string") msg = error.message

    let rt = getCurrentRefreshToken()

    if (msg === "token_expired" && rt) {
      api.post("/refresh-token", {refresh_token: rt})
      .then(res => {
          console.log(res)
        })
    }

    return Promise.reject({msg, error})
  }
)

const getCurrentRefreshToken = () => {
  return userMg.get()?.token.refresh_token
}

export {api}
