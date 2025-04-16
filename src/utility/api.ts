import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API
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
