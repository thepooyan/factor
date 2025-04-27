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
    return Promise.reject({msg, error})
  }
)

export {api}
