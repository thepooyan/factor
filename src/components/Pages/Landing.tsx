import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { A } from "@solidjs/router"
import { FaRegularFileLines as FileText } from 'solid-icons/fa'
import { FiCreditCard as CreditCard, FiUsers as Users, FiShield as Shield, FiZap as Zap, FiStar as Star, FiCheck as Check, FiChevronLeft} from 'solid-icons/fi'
import { AiOutlineClockCircle as Clock } from 'solid-icons/ai'

export default function LandingPage() {
  return (
    <div class="p-5">
      <section class="container m-auto grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div class="flex flex-col gap-4 lg:gap-8">
          <h1 class="text-4xl md:text-6xl/17 font-bold">
            ساده‌ترین راه برای <span class="text-primary">صدور فاکتور</span> حرفه‌ای
          </h1>
          <p class="text-xl text-muted-foreground">
            با فاکتورساز، در کمتر از یک دقیقه فاکتورهای حرفه‌ای و استاندارد ایجاد کنید و کسب و کار خود را متحول سازید.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <Button size="lg" >
              <A href="/Signup">
                شروع رایگان
                <FiChevronLeft class="mr-2 h-4 w-4 inline" />
              </A>
            </Button>
            <Button size="lg" variant="secondary" >
              <A href="/Invoice/Default/Demo">نسخه نمایشی</A>
            </Button>
          </div>
        </div>
        <div class="relative w-full shadow-lg">
          <img
            src="/sample_invoice.png"
            alt="نمونه فاکتور"
            class="object-fit rounded-lg h-85"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section class="container m-auto py-12 border-y">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="flex flex-col gap-2 items-center">
            <span class="text-3xl md:text-4xl font-bold">+۱۰,۰۰۰</span>
            <span class="text-muted-foreground">کاربر فعال</span>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <span class="text-3xl md:text-4xl font-bold">+۵۰۰,۰۰۰</span>
            <span class="text-muted-foreground">فاکتور صادر شده</span>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <span class="text-3xl md:text-4xl font-bold">۹۹٪</span>
            <span class="text-muted-foreground">رضایت مشتریان</span>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <span class="text-3xl md:text-4xl font-bold">۲۴/۷</span>
            <span class="text-muted-foreground">پشتیبانی</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" class="container m-auto py-20 md:py-32">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">ویژگی‌های برتر فاکتورساز</h2>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
            با استفاده از امکانات پیشرفته فاکتورساز، مدیریت مالی کسب و کار خود را به سطح بالاتری ببرید.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap class="h-10 w-10 text-primary mb-2" />
              <CardTitle>سرعت بالا</CardTitle>
              <CardDescription>صدور فاکتور در کمتر از یک دقیقه</CardDescription>
            </CardHeader>
            <CardContent>
              <p>با استفاده از قالب‌های آماده و فرآیند ساده، فاکتورهای خود را در سریع‌ترین زمان ممکن صادر کنید.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText class="h-10 w-10 text-primary mb-2" />
              <CardTitle>قالب‌های حرفه‌ای</CardTitle>
              <CardDescription>بیش از ۵۰ قالب متنوع و استاندارد</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                از میان ده‌ها قالب زیبا و استاندارد، قالب مناسب کسب و کار خود را انتخاب کنید و تصویر حرفه‌ای‌تری ارائه
                دهید.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CreditCard class="h-10 w-10 text-primary mb-2" />
              <CardTitle>دریافت آنلاین</CardTitle>
              <CardDescription>امکان پرداخت آنلاین فاکتورها</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                با ارسال لینک پرداخت به مشتریان، فرآیند دریافت مبالغ فاکتورها را تسریع کنید و گردش مالی خود را بهبود
                بخشید.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock class="h-10 w-10 text-primary mb-2" />
              <CardTitle>صرفه‌جویی در زمان</CardTitle>
              <CardDescription>خودکارسازی فرآیندهای تکراری</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                با ذخیره اطلاعات مشتریان و محصولات، از وارد کردن مجدد اطلاعات خودداری کنید و زمان خود را صرفه‌جویی کنید.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield class="h-10 w-10 text-primary mb-2" />
              <CardTitle>امنیت بالا</CardTitle>
              <CardDescription>حفاظت از اطلاعات مالی و مشتریان</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                با استفاده از فناوری‌های پیشرفته رمزنگاری، اطلاعات مالی و مشتریان شما با بالاترین استانداردهای امنیتی
                محافظت می‌شوند.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users class="h-10 w-10 text-primary mb-2" />
              <CardTitle>مدیریت مشتریان</CardTitle>
              <CardDescription>سیستم مدیریت ارتباط با مشتری</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                با ثبت و مدیریت اطلاعات مشتریان، سوابق خرید و فاکتورهای آن‌ها را به راحتی پیگیری کنید و روابط تجاری خود
                را تقویت نمایید.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" class="bg-muted py-20 md:py-32">
        <div class="container m-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">نحوه کار با فاکتورساز</h2>
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
              در سه مرحله ساده، فاکتورهای حرفه‌ای خود را صادر کنید و کسب و کار خود را متحول سازید.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-10">
            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6">
                ۱
              </div>
              <h3 class="text-xl font-bold mb-3">ثبت نام و ورود</h3>
              <p class="text-muted-foreground">
                در چند ثانیه ثبت نام کنید و به پنل کاربری خود دسترسی پیدا کنید. هیچ نیازی به نصب نرم‌افزار نیست.
              </p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6">
                ۲
              </div>
              <h3 class="text-xl font-bold mb-3">تکمیل اطلاعات فاکتور</h3>
              <p class="text-muted-foreground">
                اطلاعات شرکت، مشتری و محصولات را وارد کنید. محاسبات به صورت خودکار انجام می‌شود.
              </p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6">
                ۳
              </div>
              <h3 class="text-xl font-bold mb-3">صدور و ارسال فاکتور</h3>
              <p class="text-muted-foreground">
                فاکتور را به صورت PDF دانلود کنید یا مستقیماً برای مشتری ایمیل کنید. لینک پرداخت آنلاین نیز ارسال کنید.
              </p>
            </div>
          </div>

          <div class="mt-16 text-center">
            <Button size="lg" >
              <A href="/register">همین حالا شروع کنید</A>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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

      {/* Testimonials Section */}
      <section class="bg-muted py-20 md:py-32">
        <div class="container m-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">نظرات مشتریان ما</h2>
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
              بیش از ۱۰,۰۰۰ کسب و کار به فاکتورساز اعتماد کرده‌اند.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent class="pt-6">
                <div class="flex items-center gap-2 mb-4">
                  <div class="flex">
                    {[...Array(5)].map((_) => (
                      <Star class="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p class="mb-6">
                  "استفاده از فاکتورساز باعث شد زمان زیادی در صدور فاکتورها صرفه‌جویی کنم. قالب‌های حرفه‌ای و امکان ارسال
                  مستقیم به مشتریان واقعاً عالی است."
                </p>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-secondary" />
                  <div>
                    <p class="font-medium">علی محمدی</p>
                    <p class="text-sm text-muted-foreground">مدیر فروشگاه لوازم خانگی</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent class="pt-6">
                <div class="flex items-center gap-2 mb-4">
                  <div class="flex">
                    {[...Array(5)].map((_) => (
                      <Star class="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p class="mb-6">
                  "به عنوان یک فریلنسر، فاکتورساز به من کمک کرد تا تصویر حرفه‌ای‌تری به مشتریانم ارائه دهم. سیستم پرداخت
                  آنلاین هم باعث شده سریع‌تر به درآمدم برسم."
                </p>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-secondary" />
                  <div>
                    <p class="font-medium">سارا احمدی</p>
                    <p class="text-sm text-muted-foreground">طراح گرافیک</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent class="pt-6">
                <div class="flex items-center gap-2 mb-4">
                  <div class="flex">
                    {[...Array(5)].map((_) => (
                      <Star class="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p class="mb-6">
                  "ما در شرکت خود از پلن سازمانی فاکتورساز استفاده می‌کنیم و از یکپارچگی آن با سیستم‌های مالی‌مان بسیار
                  راضی هستیم. پشتیبانی عالی و به‌روزرسانی‌های منظم از نقاط قوت این سرویس است."
                </p>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-secondary" />
                  <div>
                    <p class="font-medium">محمد حسینی</p>
                    <p class="text-sm text-muted-foreground">مدیر مالی شرکت تجهیزات پزشکی</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" class="container m-auto py-20 md:py-32">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">سوالات متداول</h2>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">پاسخ سوالات رایج شما درباره سرویس فاکتورساز</p>
        </div>

        <div class="max-w-3xl mx-auto">
          <Accordion itemtype="single" collapsible class="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>آیا استفاده از فاکتورساز نیاز به نصب نرم‌افزار دارد؟</AccordionTrigger>
              <AccordionContent>
                خیر، فاکتورساز یک سرویس آنلاین است و نیازی به نصب نرم‌افزار ندارد. کافی است در سایت ثبت نام کنید و از
                طریق مرورگر به تمام امکانات دسترسی داشته باشید.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>آیا فاکتورهای صادر شده مطابق با قوانین مالیاتی ایران هستند؟</AccordionTrigger>
              <AccordionContent>
                بله، تمام قالب‌های فاکتور ما مطابق با آخرین استانداردهای سازمان امور مالیاتی ایران طراحی شده‌اند و شامل
                تمام اطلاعات مورد نیاز برای فاکتورهای رسمی هستند.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>آیا امکان سفارشی‌سازی قالب‌های فاکتور وجود دارد؟</AccordionTrigger>
              <AccordionContent>
                بله، در پلن‌های حرفه‌ای و سازمانی امکان سفارشی‌سازی قالب‌ها وجود دارد. می‌توانید لوگو، رنگ‌ها و چیدمان فاکتور
                را مطابق با برند خود تغییر دهید.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>آیا می‌توانم فاکتورها را به صورت دسته‌ای صادر کنم؟</AccordionTrigger>
              <AccordionContent>
                بله، در پلن‌های حرفه‌ای و سازمانی امکان صدور فاکتور دسته‌ای از طریق آپلود فایل Excel یا استفاده از API وجود
                دارد.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>آیا می‌توانم از فاکتورساز در موبایل استفاده کنم؟</AccordionTrigger>
              <AccordionContent>
                بله، فاکتورساز کاملاً ریسپانسیو است و می‌توانید از طریق مرورگر موبایل به آن دسترسی داشته باشید. همچنین
                اپلیکیشن موبایل ما برای اندروید و iOS در دسترس است.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>آیا می‌توانم پلن خود را ارتقا دهم؟</AccordionTrigger>
              <AccordionContent>
                بله، در هر زمان می‌توانید پلن خود را ارتقا دهید و بلافاصله به امکانات بیشتر دسترسی پیدا کنید. تفاوت قیمت
                به صورت نسبی محاسبه می‌شود.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section class="bg-primary text-primary-foreground py-20 -mx-5 px-5   ">
        <div class="container m-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">همین امروز کسب و کار خود را متحول کنید</h2>
          <p class="text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/80">
            با فاکتورساز، مدیریت مالی کسب و کار خود را ساده‌تر، سریع‌تر و حرفه‌ای‌تر انجام دهید.
          </p>
          <Button size="lg" variant="secondary" >
            <A href="/register">رایگان شروع کنید</A>
          </Button>
        </div>
      </section>

    </div>
  )
}

