import { Button } from "~/components/ui/button"
import { A } from "@solidjs/router"
import { FaRegularFileLines as FileText } from 'solid-icons/fa'
import { userMg } from "~/utility/signals";
import { Show } from "solid-js";
import UserMenu from "../UserMenu";
import { CartComponent } from "~/components/Cart/CartComponent";

const Header = () => {
  return (
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-5 py-1
      print:hidden
      ">
      <div class="container m-auto flex h-16 items-center justify-between">
        <A href="/" class="flex items-center gap-2">
          <FileText class="h-6 w-6" />
          <span class="text-xl font-bold">فاکتور ساز</span>
        </A>
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <A
            href="#features"
            class="transition-colors hover:text-foreground/80"
          >
            ویژگی‌ها
          </A>
          <A
            href="#how-it-works"
            class="transition-colors hover:text-foreground/80"
          >
            نحوه کار
          </A>
          <A href="#pricing" class="transition-colors hover:text-foreground/80">
            قیمت‌ها
          </A>
          <A href="#faq" class="transition-colors hover:text-foreground/80">
            سوالات متداول
          </A>
        </nav>
          <CartComponent/>
        <Show when={userMg.get()}>
          {u => <UserMenu user={u()}/>}
        </Show>
        <Show when={!userMg.get()}>
          <div class="flex items-center gap-4">
            <Button variant="outline" size="sm" as="A" href="/Login">
              ورود
            </Button>
            <Button size="sm" as="A" href="/Signup">
              ثبت نام
            </Button>
          </div>
        </Show>
      </div>
    </header>
  );
};

export default Header;
