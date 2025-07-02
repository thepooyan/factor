import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { FiPhone } from "solid-icons/fi"
import Input from "../general/Input"
import CustomersTable from "./CustomersTable"
import { createSignal, onMount } from "solid-js"
import { api } from "~/utility/api"
import { selectedCompany } from "~/utility/signals"
import { AI_customer } from "~/utility/apiInterface"

const Customers = () => {
  
  const [c, setC] = createSignal<AI_customer[]>([])
  onMount(async() => {
    let id = selectedCompany()?.company_id
    if (!id) return
    let a = await api.post<AI_customer[]>("/customer/AllCustomersOfCompany", {company_id: id})
    setC(a.data)
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <>
    <div class="flex justify-center">
      <Card class="w-full">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">فرم اطلاعات مشتریان</CardTitle>
          <CardDescription>اطلاعات مشتریان ثابت شما</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CustomersTable customers={c}/>

          <CardContent class="space-y-6">
              <h1 class="text-xl font-bold my-4 mb-7">ثبت مشتری جدید</h1>
            <div class="space-y-2">
              <Label for="name" class="block text-right">
                  نام
              </Label>
              <div class="flex items-center">
                <Input id="name" placeholder="نام خود را وارد کنید" class="text-right"  />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="fax" class="block text-right">
                  نام خانوادگی
              </Label>
              <div class="flex items-center">
                <Input id="fax" placeholder="نام خانوادگی خود را وارد کنید" class="text-right"  />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="phone" class="block text-right">
                شماره تلفن
              </Label>
              <div class="flex items-center">
                <Input id="phone" placeholder="شماره تلفن را وارد کنید" class="text-right"  />
                <FiPhone class="w-5 h-5 text-gray-400 -mr-8" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" class="w-full">
                افزودن
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  )
}

export default Customers
