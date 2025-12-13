import axios from "axios";
import {marked} from "marked"
import { manualLogout, userMg } from "./signals";
import { Itoken } from "./interface";
import { callModal } from "~/components/modal/Modal";
import { Button } from "~/components/ui/button";


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/f/',
})
// import.meta.env.VITE_API

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
    // 💡 اصلاح شده: بررسی امن برای استخراج پیام خطا
    let msg;
    
    // ۱. بررسی می‌کنیم که آیا پاسخ سرور (error.response) و داده‌های خطا (detail) وجود دارد
    if (error.response && error.response.data && typeof error.response.data.detail === "string") {
      msg = error.response.data.detail
    } else {
      // ۲. اگر خطای شبکه یا ساختار نامشخص باشد
      msg = error.message 
    }

    // --- مدیریت انقضای توکن ---
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
        // ارسال پیام خطا به صورت رشته ساده
        return Promise.reject({msg: "لطفا مجددا وارد شوید"}) 
      }
    }

    // --- مدیریت عدم احراز هویت ---
    if (msg === "Not authenticated") {
      manualLogout()
      return Promise.reject({msg: "لطفا مجددا وارد شوید"})
    }

    // 💡 اصلاح شده: تبدیل Markdown به HTML (رشته)
    let html_message = await marked(msg)
    
    // 🔑 ارسال پیام HTML به صورت رشته به SolidJS (رفع مشکل سریالی‌سازی)
    return Promise.reject({msg: html_message, error}) 
  }
)

const getCurrentRefreshToken = () => {
  return userMg.get()?.token.refresh_token
}

export {api}