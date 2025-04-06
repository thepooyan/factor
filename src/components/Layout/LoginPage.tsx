import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AiOutlineUser } from "solid-icons/ai";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";

export default function LoginPage() {
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

          <LoginTab />
          <SignupTab />
        </Tabs>
      </div>
    </div>
  );
}
