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
import { setValidationEvents, validateSection } from "~/utility/validation/validator";
import { api } from "~/utility/api";
import { passwordValidate } from "~/utility/validation/Abbr";
import { Iuser } from "~/utility/interface";
import { userMg } from "~/utility/signals";
import { useNavigate } from "@solidjs/router";

const SignupTab = () => {
  const [showPassword, setShowPassword] = createSignal(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }
  let email!:HTMLInputElement, pass!:HTMLInputElement, passR!:HTMLInputElement, name!: HTMLInputElement, form!:HTMLDivElement;
  const [submitting, setSubmitting] = createSignal(false);

  const submit = async (e:SubmitEvent) => {
    e.preventDefault()
    let result = validateSection(form)
    if (result === false) return
    if (passR.value !== pass.value) return callModal.fail("تکرار رمز عبور مطابقت ندارد")
    setSubmitting(true)
    api.post<Iuser>("/users/newuser", {email: email.value, password: pass.value, name: name.value})
    .then(res => {
        userMg.login(res.data)
        callModal.success("خوش آمدید!")
        navigate("/")
      })
    .catch(({msg}) => {
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
    <TabsContent value="signup" as="form" onsubmit={submit}>
      <Card class="border-none shadow-lg bg-white/90 backdrop-blur-sm" ref={form}>
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
              <Input id="name" placeholder="نام و نام خانوادگی" class="pl-10" ref={name} validate="required" />
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
                validate="email required"
                ref={email}
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
                placeholder="********"
                type={showPassword() ? "text" : "password"}
                class="pl-10 "
                validate={passwordValidate}
                ref={pass}
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
          </div>
          <div class="space-y-2">
            <Label for="confirm-password">تکرار رمز عبور</Label>
            <div class="relative">
              <Input
                id="confirm-password"
                placeholder="********"
                type={showPassword() ? "text" : "password"}
                class="pl-10"
                ref={passR}
                validate={passwordValidate}
              />
              <FiLock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full text-white" type="submit" disabled={submitting()}>
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
