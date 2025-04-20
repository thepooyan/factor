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
import { setValidationEvents, validateSection } from "~/utility/validation/validator";
import { passwordValidate } from "~/utility/validation/Abbr";
import { api } from "~/utility/api";
import { callModal } from "../modal/Modal";
import Spinner from "../general/Spinner";
import SignupSuggestion from "../SignupSuggestion";
import { userMg } from "~/utility/signals";
import { Iuser } from "~/utility/interface";
import { useNavigate } from "@solidjs/router";

const LoginTab = () => {
  const [showPassword, setShowPassword] = createSignal(false);
  const [submitting, setSubmitting] = createSignal(false)
  const navigate = useNavigate()

  let form!:HTMLDivElement, email!: HTMLInputElement, pass!: HTMLInputElement

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submit = () => {
    let result = validateSection(form)
    if (result === false) return

    setSubmitting(true)
    api.post<Iuser>("/login", {username: email.value, password: pass.value})
    .then(res => {
        userMg.login(res.data)
        navigate("/")
      })
    .catch(({ msg, error }) => {
        if (error.status === 422)
        callModal(<SignupSuggestion/>)
        else
        callModal.fail(msg)
      })
    .finally(() => {
      setSubmitting(false)
      })
  }

  onMount(() => {
    setValidationEvents(form, "keyup")
  })

  return (
    <TabsContent value="login">
      <Card class="border-none shadow-lg bg-white/90 backdrop-blur-sm" ref={form}>
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
                ref={email}
              />
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
                placeholder="********"
                id="password-login"
                type={showPassword() ? "text" : "password"}
                class="pl-20 "
                data-validate={passwordValidate}
                ref={pass}
              />
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
          <Button class="w-full text-white" onclick={submit} disabled={submitting()}>
            {submitting() ? <Spinner reverse/>: <>
            ورود
            </>}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default LoginTab;
