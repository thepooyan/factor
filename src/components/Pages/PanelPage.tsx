import { FiSettings } from "solid-icons/fi"
import { TbMoneybag } from 'solid-icons/tb'
import { IoPeopleCircleSharp } from 'solid-icons/io'
import { IoDocumentTextOutline } from 'solid-icons/io'
import { TbSquarePlus } from 'solid-icons/tb'
import { createSignal, Show } from "solid-js"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { IconTypes } from "solid-icons"
import Company from "./Company"
import Customers from "./Customers"
import FactorList from "./FactorList"
import InvocieSelect from "./InvocieSelect"
import Goods from "./Goods"
import { SelectCompany } from "../SelectCompany"
import { selectedCompany } from "~/utility/signals"

export function PanelPage() {
  const [activeTab, setActiveTab] = createSignal<tabsType>("company")

  type tabsType =  "goods" | "company" | "customers" | "factorList" | "newFactor";
  const tabs: {id: tabsType, label: string, icon: IconTypes}[] = [
    { id: "company", label: "اطلاعات شرکت", icon: FiSettings },
    { id: "customers", label: "مشتریان", icon:  IoPeopleCircleSharp},
    { id: "goods", label: "کالاها", icon:  TbMoneybag},
    { id: "factorList", label: "لیست فاکتور", icon: IoDocumentTextOutline },
    { id: "newFactor", label: "فاکتور جدید", icon: TbSquarePlus },
  ]

  return (
    <div class="mx-auto max-w-7xl p-5" >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
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
                    onClick={() => setActiveTab(tab.id)}
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

        <Show when={selectedCompany()}>
          {o => <>
            <div>
              {activeTab() === "company" && <Company initialData={o}/>}
              {activeTab() === "customers" && <Customers/>}
              {activeTab() === "goods" && <Goods/>}
              {activeTab() === "factorList" && <FactorList/>}
              {activeTab() === "newFactor" && <InvocieSelect/>}
            </div>
          </>}
        </Show>
      </div>
    </div>
  )
}
