import { FiCreditCard, FiHelpCircle, FiHome, FiInfo, FiMessageSquare, FiSettings, FiUser } from "solid-icons/fi"
import { createSignal } from "solid-js"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export function PanelPage() {
  const [activeTab, setActiveTab] = createSignal("dashboard")

  const tabs = [
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
      <h1 class="mb-8 text-3xl font-bold text-gray-900">پنل کاربری</h1>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
        <div class="order-2 md:order-1">
          <Tabs orientation="vertical" value={activeTab()} onvolumechange={setActiveTab} class="w-full">
            <TabsList class="flex h-auto w-full flex-col justify-start bg-white p-0 shadow-md">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    value={tab.id}
                    class="flex w-full justify-start gap-2 border-b border-gray-100 px-4 py-3 text-right data-[state=active]:bg-gray-50"
                  >
                    <Icon class="h-5 w-5" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>

        <div class="order-1 md:order-2">
          {activeTab() === "dashboard" && <>dash</>}
          {activeTab() === "profile" && <>pro</>}
          {activeTab() === "settings" && <>set</>}
          {activeTab() === "messages" && <>me</>}
          {activeTab() === "orders" && <></>}
          {activeTab() === "payments" && <></>}
          {activeTab() === "support" && <></>}
        </div>
      </div>
    </div>
  )
}
