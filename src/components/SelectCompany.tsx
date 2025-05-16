import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { createSignal } from "solid-js"
import { FiCheck, FiChevronDown } from "solid-icons/fi"
import AddCompany from "./AddCompany"

const options = [
  { value: "option4", label: "شرکت ۱" },
  { value: "option5", label: "شرکت ۲" },
]

export function SelectCompany() {
  const [selectedOption, setSelectedOption] = createSignal(options[0])
  const [open, setOpen] = createSignal(false)

  return (
    <div class="flex gap-1 mb-2">
      <DropdownMenu open={open()} onOpenChange={setOpen}>
        <DropdownMenuTrigger class="w-full select-none">
          <Button variant="default">
            <FiChevronDown class=" h-4 w-4 shrink-0 opacity-50" />
            {selectedOption().label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[200px]">
          {options.map((option) => (
            <DropdownMenuItem
              class={cn(
                "flex cursor-pointer items-center justify-between",
                selectedOption().value === option.value && "bg-muted",
              )}
              onClick={() => {
                setSelectedOption(option)
                setOpen(false)
              }}
            >
              {option.label}
              {selectedOption().value === option.value && <FiCheck class="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AddCompany/>
    </div>
  )
}
