import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AiOutlineUser } from "solid-icons/ai";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";
import { A } from "@solidjs/router";

export default function LoginPage({activatedTab}:{activatedTab: "login" | "signup"}) {
  return (
    <div
      class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-600 via-zinc-300 to-zinc-400 p-4"
      dir="rtl"
    >
      <div class="w-full max-w-md">
        <A href="/" class="mb-6 text-center block">
          <div class="inline-block p-3 rounded-full bg-gradient-to-bl shadow-lg from-zinc-400 via-zinc-500 to-zinc-600  mb-2">
            <AiOutlineUser class="h-8 w-8 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800">سامانه کاربری</h1>
        </A>
        <Tabs value={activatedTab} class="w-full">
          <TabsList class="grid w-full grid-cols-2 p-1">
            <TabsTrigger
              value="login"
              class="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
              as="A"
              href="/Login"
            >
                ورود
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              class="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
              as="A"
              href="/Signup"
            >
                ثبت نام
            </TabsTrigger>
          </TabsList>

          <LoginTab />
          <SignupTab />
        </Tabs>
      </div>
    </div>
  );
}
