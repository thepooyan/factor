import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { APP_NAME } from "~/utility/settings";

export default function Home() {

  return (
    <div class="flex flex-col gap-1 p-2">
      <h1 class="text-center text-2xl mb-4"> به {APP_NAME} خوش آمدید! </h1>
      <Button as={A} href="/Signup">ثبت نام</Button>
      <Button as={A} href="/Login">لاگین</Button>
    </div>
  );
}
