import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { createSignal } from "solid-js"
import { FiPhone, FiPrinter, FiUpload } from "solid-icons/fi"
import Input from "../general/Input"
import { FaSolidBuilding } from "solid-icons/fa"

const Company = () => {
  const [logo, setLogo] = createSignal<File | null>(null)
  const [logoPreview, setLogoPreview] = createSignal<string | null>(null)

  const handleLogoChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogo(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <>
    <div class="flex justify-center p-4">
      <Card class="w-full max-w-2xl">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">فرم اطلاعات شرکت</CardTitle>
          <CardDescription>لطفا اطلاعات شرکت خود را وارد کنید</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent class="space-y-6">
            <div class="space-y-2">
              <Label for="logo" class="block text-right">
                لوگوی شرکت
              </Label>
              <div class="flex flex-col items-center gap-4">
                {logoPreview() ? (
                  <div class="relative w-32 h-32">
                    <img
                      src={logoPreview() || "/placeholder.png"}
                      alt="پیش نمایش لوگو"
                      class="w-full h-full object-contain"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      class="absolute -top-2 -right-2"
                      onClick={() => {
                        setLogo(null)
                        setLogoPreview(null)
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <div class="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-md border-gray-300">
                    <FiUpload class="w-8 h-8 text-gray-400" />
                    <span class="mt-2 text-sm text-gray-500">آپلود لوگو</span>
                  </div>
                )}
                <div class="w-full">
                  <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} class="hidden" />
                  <Label
                    for="logo"
                    class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <FiUpload class="w-4 h-4 ml-2" />
                    انتخاب فایل
                  </Label>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="name" class="block text-right">
                نام شرکت
              </Label>
              <div class="flex items-center">
                <Input id="name" placeholder="نام شرکت خود را وارد کنید" class="text-right"  />
                <FaSolidBuilding class="w-5 h-5 text-gray-400 -mr-8" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="fax" class="block text-right">
                شماره فکس
              </Label>
              <div class="flex items-center">
                <Input id="fax" placeholder="شماره فکس را وارد کنید" class="text-right"  />
                <FiPrinter class="w-5 h-5 text-gray-400 -mr-8" />
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
                آدرس
              </Label>
              <Input
                id="address"
                placeholder="آدرس کامل شرکت را وارد کنید"
                class="text-right resize-none min-h-[100px]"
              />
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

export default Company
