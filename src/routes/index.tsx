import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { APP_NAME } from "~/utility/settings";
import { getAuthUrl } from "~/utility/utility";

export default function Home() {

  const google = () => {
    window.location.href = getAuthUrl().toString()
  }

  return (
    <div class="flex flex-col gap-1 p-2">
      <h1 class="text-center text-2xl mb-4"> به {APP_NAME} خوش آمدید! </h1>
      <Button as={A} href="/Signup">ثبت نام</Button>
      <Button as={A} href="/Login">لاگین</Button>
      <Button as={A} href="/Factor/Default/New">فاکتور جدید</Button>
      <Button onclick={google}>Continue with Google</Button>
    </div>
  );
}
