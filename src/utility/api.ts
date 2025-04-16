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
    return Promise.reject(msg ? msg : error.message)
  }
)

export {api}
