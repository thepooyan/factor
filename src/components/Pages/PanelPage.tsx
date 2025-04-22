import { FiInfo, FiMessageSquare, FiSettings, FiUser } from "solid-icons/fi"
import { createSignal } from "solid-js"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { IconTypes } from "solid-icons"
import Company from "./Company"
import Profile from "./Profile"
import Customers from "./Customers"

export function PanelPage() {
  const [activeTab, setActiveTab] = createSignal<tabsType>("profile")

  type tabsType =  "profile" | "company" | "customers" | "factor";
  const tabs: {id: tabsType, label: string, icon: IconTypes}[] = [
    { id: "profile", label: "پروفایل", icon: FiUser },
    { id: "company", label: "اطلاعات شرکت", icon: FiSettings },
    { id: "customers", label: "مشتریان", icon: FiMessageSquare },
    { id: "factor", label: "فاکتور", icon: FiInfo },
  ]

  return (
    <div class="mx-auto max-w-7xl p-5" >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
        <div class="order-2 md:order-1">
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
        </div>

        <div class="order-1 md:order-2 ">
          {activeTab() === "profile" && <Profile/>}
          {activeTab() === "company" && <Company/>}
          {activeTab() === "customers" && <Customers/>}
          {activeTab() === "factor" && <>me</>}
        </div>
      </div>
    </div>
  )
}
