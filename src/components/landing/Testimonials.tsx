import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { A } from "@solidjs/router"
import { FaRegularFileLines as FileText } from 'solid-icons/fa'
import { FiCreditCard as CreditCard, FiUsers as Users, FiShield as Shield, FiZap as Zap, FiStar as Star, FiCheck as Check, FiChevronLeft} from 'solid-icons/fi'
import { AiOutlineClockCircle as Clock } from 'solid-icons/ai'


const Testimonials = () => {
  return (
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
  )
}

export default Testimonials
