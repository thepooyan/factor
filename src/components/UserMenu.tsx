"use client"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { FiLogOut as LogOut, FiSettings as Settings } from "solid-icons/fi"
import { Iuser } from "~/utility/interface"

export default function UserMenu({user}:{user:Iuser}) {
  // This would typically come from your auth context or state

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...")
  }

  const handlePanelAccess = () => {
    // Implement your panel access logic here
    console.log("Accessing panel...")
  }

  return (
    <Popover>
      <PopoverTrigger  >
        <Button variant="ghost" class="relative h-10 w-10 rounded-full">
          <Avatar class="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>{user.user.email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-56">
        <div class="space-y-4">
          <div class="flex flex-col space-y-1 leading-none">
            <p class="text-sm font-medium">سلام!</p>
            <p class="text-xs text-muted-foreground truncate">{user.user.email}</p>
          </div>
          <div class="flex flex-col space-y-1">
            <Button variant="ghost" class="justify-start h-9 px-2" onClick={handlePanelAccess}>
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

