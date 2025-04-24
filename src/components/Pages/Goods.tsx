import { Button } from "~/components/ui/button"
import c from "./customers.json"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { FiPhone } from "solid-icons/fi"
import Input from "../general/Input"
import CustomersTable from "./CustomersTable"
import { Icustomer } from "~/utility/interface"

const Goods = () => {

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <>
    <div class="flex justify-center">
      <Card class="w-full">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">فرم اطلاعات کالاها</CardTitle>
          <CardDescription>اطلاعات کالاهای پرمصرف شما</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CustomersTable customers={c as Icustomer[]}/>

          <CardContent class="space-y-6">
              <h1 class="text-xl font-bold my-4 mb-7">ثبت کالا جدید</h1>
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

export default Goods
