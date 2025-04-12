import { Button } from "~/components/ui/button"
import { A } from "@solidjs/router"
import { FaRegularFileLines as FileText } from 'solid-icons/fa'

const Header = () => {
  return (
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container m-auto flex h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <FileText class="h-6 w-6" />
          <span class="text-xl font-bold">فاکتور ساز</span>
        </div>
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
        <div class="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <A href="/login">ورود</A>
          </Button>
          <Button size="sm">
            <A href="/register">ثبت نام</A>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
