import { Button } from "~/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { FiUser, FiLogOut as LogOut, FiSettings as Settings } from "solid-icons/fi"
import { Iuser } from "~/utility/interface"
import { userMg } from "~/utility/signals"
import { createSignal } from "solid-js"

export default function UserMenu({user}:{user:Iuser}) {

  const [open, setOpen] = createSignal(false)

  const handleLogout = () => {
    userMg.logout()
    setOpen(false)
  }

  return (
    <Popover open={open()} onOpenChange={setOpen}>
      <PopoverTrigger >
        <Button variant="ghost" class="relative h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 ">
          <FiUser/>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-56">
        <div class="space-y-4">
          <div class="flex flex-col space-y-1 leading-none">
            <p class="text-sm font-medium">سلام!</p>
            <p class="text-xs text-muted-foreground truncate">{user.user.email}</p>
          </div>
          <div class="flex flex-col space-y-1">
            <Button variant="ghost" class="justify-start h-9 px-2" as="A" href="/Panel" onClick={() => setOpen(false)}>
              <Settings class="mr-2 h-4 w-4" />
              <span>پنل کاربری</span>
            </Button>
            <Button
              variant="ghost"
              class="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 h-9 px-2"
              onClick={handleLogout}
            >
              <LogOut class="mr-2 h-4 w-4" />
              <span>خروج</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

