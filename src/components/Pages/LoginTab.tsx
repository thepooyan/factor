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
import { AiOutlineLock } from "solid-icons/ai";
import { FiEye, FiEyeOff, FiMail } from "solid-icons/fi";
import { createSignal, onMount } from "solid-js";
import { initValidator } from "~/utility/validation/validator";

const LoginTab = () => {
  const [showPassword, setShowPassword] = createSignal(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  onMount(() => {
    initValidator()
  })

  return (
    <TabsContent value="login">
      <Card class="border-none shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle class="text-2xl">ورود به حساب کاربری</CardTitle>
          <CardDescription>
            برای ورود به حساب کاربری خود، ایمیل و رمز عبور خود را وارد کنید.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="email-login">ایمیل</Label>
            <div class="relative">
              <Input
                id="email-login"
                type="email"
                placeholder="example@email.com"
                class="pl-10"
                data-validate="email required"
              />
              <Ve/>
              <FiMail class="absolute left-3 top-5.4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                class="pl-20 "
                data-validate="required minLength-7 !alphanumeric "
              />
              <Ve/>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute left-0 top-0 h-10 px-3 py-1 m-[1px] text-muted-foreground bg-transparent"
                onClick={togglePasswordVisibility}
              >
                {showPassword() ? (
                  <FiEyeOff class="h-4 w-4 " />
                ) : (
                  <FiEye class="h-4 w-4" />
                )}
                <span class="sr-only">
                  {showPassword() ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
                </span>
              </Button>
              <AiOutlineLock class="absolute left-10 top-5.4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full text-white">ورود</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

const Ve = () => {
  return <div class="validation-error text-red-500 text-sm pr-2 mt-1"></div>
}

export default LoginTab;
