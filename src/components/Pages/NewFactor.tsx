import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import Input from "../general/Input"

const NewFactor = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <>
    <div class="flex justify-center p-4">
      <Card class="w-full max-w-2xl">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">ثبت فاکتور جدید</CardTitle>
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
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" class="w-full">
                ثبت
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  )
}

export default NewFactor
