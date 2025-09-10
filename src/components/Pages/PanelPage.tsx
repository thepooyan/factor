import { FiSettings } from "solid-icons/fi"
// import { TbMoneybag } from 'solid-icons/tb'
import { IoPeopleCircleSharp } from 'solid-icons/io'
import { IoDocumentTextOutline } from 'solid-icons/io'
import { TbSquarePlus } from 'solid-icons/tb'
import { ParentProps, Show } from "solid-js"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { IconTypes } from "solid-icons"
import { SelectCompany } from "../SelectCompany"
import { selectedCompany } from "~/utility/signals"

export function PanelPage({children}:ParentProps) {

  const tabs: {id: string, label: string, icon: IconTypes}[] = [
    { id: "", label: "اطلاعات شرکت", icon: FiSettings },
    { id: "Customers", label: "مشتریان", icon:  IoPeopleCircleSharp},
    // { id: "goods", label: "کالاها / خدمات", icon:  TbMoneybag},
    { id: "FactorList", label: "لیست فاکتور", icon: IoDocumentTextOutline },
    { id: "NewFactor", label: "فاکتور جدید", icon: TbSquarePlus },
  ]

  return (
    <div class="mx-auto max-w-7xl p-5" >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-[350px_1fr]">
        <div>
          <SelectCompany/>
          <Show when={selectedCompany()}>

          <Tabs orientation="vertical" class="w-full">
            <TabsList class="flex h-auto w-full flex-col justify-start bg-white p-0 shadow-md">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    value={tab.id}
                    class="flex w-full justify-start gap-2 border-b border-gray-100 px-4 py-3 text-right data-[state=active]:bg-gray-50"
                    as="A"
                    href={"/Panel/" + tab.id}
                  >
                    <Icon class="h-5 w-5" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
          </Show>
        </div>

        {children}
      </div>
    </div>
  )
}
