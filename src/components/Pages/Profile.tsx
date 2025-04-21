import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { createSignal } from "solid-js"
import { FiPhone, FiPrinter } from "solid-icons/fi"
import Input from "../general/Input"
import { FaSolidBuilding } from "solid-icons/fa"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const Profile = () => {
  const [value, setValue] = createSignal("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <>
    <div class="flex justify-center p-4">
      <Card class="w-full max-w-2xl">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">فرم اطلاعات شخصی</CardTitle>
          <CardDescription>در صورت تمایل اطلاعات شخصی خود را کامل کنید</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent class="space-y-6">

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

            <div class="space-y-2">
              <Label for="address" class="block text-right">
                  جنسیت
              </Label>
              <Select
                  value={value()}
                  onChange={setValue}
                  options={["مرد", "زن", "دیگر"]}
                  placeholder="انتخاب جنسیت"
                  itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
              >
                  <SelectTrigger aria-label="Sex">
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" class="w-full">
              ثبت اطلاعات
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  )
}

export default Profile
