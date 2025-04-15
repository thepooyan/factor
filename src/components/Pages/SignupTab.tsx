import { Button } from "~/components/ui/button";
import Input from "../general/Input";
import { Label } from "~/components/ui/label";
import { TabsContent } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "solid-icons/fi";
import { createSignal, onMount } from "solid-js";
import Spinner from "../general/Spinner";
import { callModal } from "../modal/Modal";
import { initValidator } from "~/utility/validation/validator";

const SignupTab = () => {
  const [showPassword, setShowPassword] = createSignal(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }
  const [submitting, setSubmitting] = createSignal(false);
  const submit = async () => {
    setSubmitting(true)
    await new Promise(res => setTimeout(res, 2000))
    setSubmitting(false)
    callModal.success("ثبت شد!")
  }
  onMount(() => {
    initValidator()
  })
  return (
    <TabsContent value="signup">
      <Card class="border-none shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle class="text-2xl">ایجاد حساب کاربری</CardTitle>
          <CardDescription>
            برای ایجاد حساب کاربری جدید، اطلاعات زیر را وارد کنید.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="name">نام و نام خانوادگی</Label>
            <div class="relative">
              <Input id="name" placeholder="نام و نام خانوادگی" class="pl-10" />
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
                class="pl-10"
                data-validate="email"
              />
              <span class="validation-error text-red"></span>
              <FiMail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="password-signup">رمز عبور</Label>
            <div class="relative">
              <Input
                id="password-signup"
                type={showPassword() ? "text" : "password"}
                class="pl-10 "
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute left-0 top-0 h-full px-3 py-1 text-muted-foreground"
                onClick={togglePasswordVisibility}
              >
                {showPassword() ? (
                  <FiEyeOff class="h-4 w-4" />
                ) : (
                  <FiEye class="h-4 w-4" />
                )}
                <span class="sr-only">
                  {showPassword()
                    ? "پنهان کردن••••••• رمز عبور"
                    : "نمایش رمز عبور"}
                </span>
              </Button>
              <FiLock class="absolute left-10 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <p class="text-xs text-muted-foreground">
              رمز عبور باید حداقل ۸ کاراکتر باشد.
            </p>
          </div>
          <div class="space-y-2">
            <Label for="confirm-password">تکرار رمز عبور</Label>
            <div class="relative">
              <Input
                id="confirm-password"
                type={showPassword() ? "text" : "password"}
                class="pl-10"
              />
              <FiLock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full text-white" onclick={submit} disabled={submitting()}>
            {submitting() ? <Spinner reverse/>: <>
              ثبت نام
            </>}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SignupTab;
