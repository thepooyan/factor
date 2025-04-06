import { Button } from "~/components/ui/button"
import Input from "../general/Input"
import { Label } from "~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { AiOutlineLock } from 'solid-icons/ai'
import { AiOutlineUser } from 'solid-icons/ai'
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'solid-icons/fi'
import { createSignal } from "solid-js"

export default function LoginPage() {
  const [showPassword, setShowPassword] = createSignal(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div
      class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-600 via-zinc-300 to-zinc-400 p-4"
      dir="rtl"
    >
      <div class="w-full max-w-md">
        <div class="mb-6 text-center">
          <div class="inline-block p-3 rounded-full bg-black mb-2">
            <AiOutlineUser class="h-8 w-8 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800">سامانه کاربری</h1>
        </div>
        <Tabs defaultValue="login" class="w-full">
          <TabsList class="grid w-full grid-cols-2 p-1">
            <TabsTrigger
              value="login"
              class="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
            >
              ورود
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              class="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
            >
              ثبت نام
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card class="border-none shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle class="text-2xl">ورود به حساب کاربری</CardTitle>
                <CardDescription>برای ورود به حساب کاربری خود، ایمیل و رمز عبور خود را وارد کنید.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <Label for="email-login">ایمیل</Label>
                  <div class="relative">
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="example@email.com"
                      class="pr-10 border-purple-100 focus:border-purple-300"
                    />
                    <FiMail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <Label for="password-login">رمز عبور</Label>
                    <Button variant="link" class="h-auto p-0 text-xs">
                      فراموشی رمز عبور؟
                    </Button>
                  </div>
                  <div class="relative">
                    <Input
                      id="password-login"
                      type={showPassword() ? "text" : "password"}
                      class="pr-10 border-purple-100 focus:border-purple-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      class="absolute left-0 top-0 h-full px-3 py-1 text-muted-foreground"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword() ? <FiEyeOff class="h-4 w-4" /> : <FiEye class="h-4 w-4" />}
                      <span class="sr-only">{showPassword() ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}</span>
                    </Button>
                    <AiOutlineLock class="absolute left-10 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button class="w-full text-white">
                  ورود
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card class="border-none shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle class="text-2xl ">ایجاد حساب کاربری</CardTitle>
                <CardDescription>برای ایجاد حساب کاربری جدید، اطلاعات زیر را وارد کنید.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <Label for="name">نام و نام خانوادگی</Label>
                  <div class="relative">
                    <Input
                      id="name"
                      placeholder="نام و نام خانوادگی"
                      class="pr-10"
                    />
                    <FiUser class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div class="space-y-2">
                  <Label for="email-signup">ایمیل</Label>
                  <div class="relative">
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="example@email.com"
                      class="pr-10"
                    />
                    <FiMail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div class="space-y-2">
                  <Label for="password-signup">رمز عبور</Label>
                  <div class="relative">
                    <Input
                      id="password-signup"
                      type={showPassword() ? "text" : "password"}
                      class="pr-10 "
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      class="absolute left-0 top-0 h-full px-3 py-1 text-muted-foreground"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword() ? <FiEyeOff class="h-4 w-4" /> : <FiEye class="h-4 w-4" />}
                      <span class="sr-only">{showPassword() ? "پنهان کردن••••••• رمز عبور" : "نمایش رمز عبور"}</span>
                    </Button>
                    <FiLock class="absolute left-10 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <p class="text-xs text-muted-foreground">رمز عبور باید حداقل ۸ کاراکتر باشد.</p>
                </div>
                <div class="space-y-2">
                  <Label for="confirm-password">تکرار رمز عبور</Label>
                  <div class="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword() ? "text" : "password"}
                      class="pr-10"
                    />
                    <FiLock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button class="w-full text-white">
                  ثبت نام
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


