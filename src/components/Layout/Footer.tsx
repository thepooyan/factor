import { A } from "@solidjs/router"
import { FaRegularFileLines as FileText } from 'solid-icons/fa'
import Enamad from "./Enamad"

const Footer = () => {
  return (
      <footer class="border-t py-12 md:py-16 print:hidden">
        <div class="container m-auto p-5">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="col-span-2 md:col-span-1">
              <div class="flex items-center gap-2 mb-4">
                <FileText class="h-6 w-6" />
                <span class="text-xl font-bold">فاکتورساز</span>
              </div>
              <p class="text-muted-foreground mb-4">
                ساده‌ترین راه برای صدور فاکتورهای حرفه‌ای و مدیریت مالی کسب و کار شما
              </p>
              <div class="flex gap-4">
                <A href="#" class="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </A>
                <A href="#" class="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </A>
                <A href="#" class="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-Width="2"
                    stroke-Linecap="round"
                    stroke-Linejoin="round"
                    class="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </A>
              </div>
            </div>

            <div>
              <h3 class="font-medium mb-4">محصولات</h3>
              <ul class="space-y-2">
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    فاکتورساز
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    حسابداری آنلاین
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    مدیریت انبار
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    گزارش‌گیری پیشرفته
                  </A>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="font-medium mb-4">شرکت</h3>
              <ul class="space-y-2">
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    درباره ما
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    تماس با ما
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    وبلاگ
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-foreground">
                    فرصت‌های شغلی
                  </A>
                </li>
              </ul>
            </div>

            <Enamad/>
          </div>

          <div class="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>© ۱۴۰۲ فاکتورساز. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
