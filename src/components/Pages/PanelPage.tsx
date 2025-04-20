import { FiCreditCard, FiHelpCircle, FiHome, FiInfo, FiMessageSquare, FiSettings, FiUser } from "solid-icons/fi"
import { createSignal } from "solid-js"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { IconTypes } from "solid-icons"
import Profile from "./Profile"

export function PanelPage() {
  const [activeTab, setActiveTab] = createSignal<tabsType>("dashboard")

  type tabsType = "dashboard" | "profile" | "settings" | "customers" | "factor" | "payments" | "support"
  const tabs: {id: tabsType, label: string, icon: IconTypes}[] = [
    { id: "dashboard", label: "داشبورد", icon: FiHome },
    { id: "profile", label: "پروفایل", icon: FiUser },
    { id: "settings", label: "تنظیمات", icon: FiSettings },
    { id: "customers", label: "مشتریان", icon: FiMessageSquare },
    { id: "factor", label: "فاکتور", icon: FiInfo },
    { id: "payments", label: "پرداخت‌ها", icon: FiCreditCard },
    { id: "support", label: "پشتیبانی", icon: FiHelpCircle },
  ]

  return (
    <div class="mx-auto max-w-7xl p-5" dir="rtl">
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

        <div class="order-1 md:order-2 bg-white rounded p-4 shadow-md">
          {activeTab() === "dashboard" && <>dash</>}
          {activeTab() === "profile" && <Profile/>}
          {activeTab() === "settings" && <>set</>}
          {activeTab() === "customers" && <></>}
          {activeTab() === "factor" && <>me</>}
          {activeTab() === "payments" && <></>}
          {activeTab() === "support" && <></>}
        </div>
      </div>
    </div>
  )
}
