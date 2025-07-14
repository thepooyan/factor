import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { A } from "@solidjs/router"
import { FaRegularFileLines as FileText } from 'solid-icons/fa'
import { FiCreditCard as CreditCard, FiUsers as Users, FiShield as Shield, FiZap as Zap, FiStar as Star, FiCheck as Check, FiChevronLeft} from 'solid-icons/fi'
import { AiOutlineClockCircle as Clock } from 'solid-icons/ai'

const Pricing = () => {
  return (
      <section id="pricing" class="container m-auto py-20 md:py-32">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">قیمت‌های مقرون به صرفه</h2>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
            پلن مناسب کسب و کار خود را انتخاب کنید و از مزایای فاکتورساز بهره‌مند شوید.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <Card class="flex flex-col">
            <CardHeader>
              <CardTitle>پایه</CardTitle>
              <div class="mt-4 flex items-baseline text-5xl font-bold">رایگان</div>
              <CardDescription class="mt-4">مناسب برای کسب و کارهای کوچک و تازه‌کار</CardDescription>
            </CardHeader>
            <CardContent class="flex-1">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>۱۰ فاکتور در ماه</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>۵ قالب فاکتور</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>خروجی PDF</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>پشتیبانی ایمیلی</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full" variant="outline" >
                <A href="/register">شروع رایگان</A>
              </Button>
            </CardFooter>
          </Card>

          <Card class="flex flex-col border-primary relative">
            <div class="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
              محبوب‌ترین
            </div>
            <CardHeader>
              <CardTitle>حرفه‌ای</CardTitle>
              <div class="mt-4 flex items-baseline text-5xl font-bold">
                ۹۹,۰۰۰ <span class="text-lg font-normal text-muted-foreground mr-2">تومان / ماهانه</span>
              </div>
              <CardDescription class="mt-4">مناسب برای کسب و کارهای متوسط</CardDescription>
            </CardHeader>
            <CardContent class="flex-1">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>۱۰۰ فاکتور در ماه</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>تمام قالب‌های فاکتور</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>خروجی PDF و Excel</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>ارسال ایمیل و پیامک</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>لینک پرداخت آنلاین</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>پشتیبانی تلفنی</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full" >
                <A href="/register">انتخاب پلن حرفه‌ای</A>
              </Button>
            </CardFooter>
          </Card>

          <Card class="flex flex-col">
            <CardHeader>
              <CardTitle>سازمانی</CardTitle>
              <div class="mt-4 flex items-baseline text-5xl font-bold">
                ۲۴۹,۰۰۰ <span class="text-lg font-normal text-muted-foreground mr-2">تومان / ماهانه</span>
              </div>
              <CardDescription class="mt-4">مناسب برای کسب و کارهای بزرگ و سازمان‌ها</CardDescription>
            </CardHeader>
            <CardContent class="flex-1">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>فاکتور نامحدود</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>قالب‌های اختصاصی</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>تمام خروجی‌ها</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>ارسال ایمیل و پیامک</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>لینک پرداخت آنلاین</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>API اختصاصی</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-primary ml-2" />
                  <span>پشتیبانی VIP</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full" variant="outline" >
                <A href="/register">انتخاب پلن سازمانی</A>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

  )
}

export default Pricing
