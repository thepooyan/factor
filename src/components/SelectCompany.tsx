import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { createEffect, createSignal, onMount } from "solid-js"
import { FiCheck, FiChevronDown } from "solid-icons/fi"
import AddCompany from "./AddCompany"
import { queryCompanies } from "~/utility/queries"
import { CreateQueryResult } from "@tanstack/solid-query"
import { AxiosResponse } from "axios"
import { ICompany } from "~/utility/interface"
import { retriveSelectedCompany } from "~/utility/utility"
import { selectedCompany, setSelectedCompany } from "~/utility/signals"

export function SelectCompany() {

  let companies:CreateQueryResult<AxiosResponse<ICompany[]>>
  const [options, setOptions] = createSignal<ICompany[]>([]);
  const [open, setOpen] = createSignal(false)

  onMount(() => {
    companies = queryCompanies()
    retriveSelectedCompany()
  })

  createEffect(() => {
    if (companies.data)
      setOptions(companies.data.data)
  })



  return (
    <div class="flex gap-1 mb-2">
      <DropdownMenu open={open()} onOpenChange={setOpen}>
        <DropdownMenuTrigger class="w-full select-none flex-grow-0 " as={Button} >
            <FiChevronDown class=" h-4 w-4 shrink-0 opacity-50" />
            {selectedCompany()?.company_name ||  "انتخاب شرکت"}
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[200px]">
          {options().map((option) => (
            <DropdownMenuItem
              class={cn(
                "flex cursor-pointer items-center justify-between",
                selectedCompany()?.company_name === option.company_name && "bg-muted",
              )}
              onClick={() => {
                setSelectedCompany(option)
                setOpen(false)
              }}
            >
              {option.company_name}
              {selectedCompany()?.company_name === option.company_name && <FiCheck class="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AddCompany/>
    </div>
  )
}
