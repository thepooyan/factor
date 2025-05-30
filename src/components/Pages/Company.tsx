import { Button } from "~/components/ui/button"
import { BsFileText } from 'solid-icons/bs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Accessor, createSignal, Show } from "solid-js"
import { FiPhone, FiPrinter, FiUpload } from "solid-icons/fi"
import Input from "../general/Input"
import { FaSolidBuilding } from "solid-icons/fa"
import { useForm } from "~/utility/hooks"
import { ICompany } from "~/utility/interface"
import { api } from "~/utility/api"
import { callModal } from "../modal/Modal"
import { userMg } from "~/utility/signals"
import { queryCompanies } from "~/utility/queries"
import { useQueryClient } from "@tanstack/solid-query"
import { useNavigate } from "@solidjs/router"

interface props {
  isNew?: boolean
  initialData?: Accessor<ICompany>
}
const Company = ({isNew, initialData}:props) => {
  const [_, setLogo] = createSignal<File | null>(null)
  let form: Accessor<ICompany | undefined>;

  if (initialData)
    form = () => queryCompanies().data?.data.find(i => i.company_id === initialData().company_id)
    else 
    [form] = createSignal<ICompany>()

  const [logoPreview, setLogoPreview] = createSignal<string | null>(null)
  const {register, submit} = useForm(form)
  const navigate = useNavigate()

  const qc = useQueryClient()

  const handleLogoChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogo(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: ICompany) => {
    callModal.wait()
    let fetch = () => api.post("/company/NewCompany", e)
    if (initialData) fetch = () => api.put("/company/EditCompany", {...e, company_id: initialData().company_id})

    fetch()
    .then(() => {
        callModal.success("ثبت شد!")
      })
    .catch(({msg}) => {
        callModal.fail(msg)
      })
    .finally(() => {
        qc.invalidateQueries({queryKey:["compaines", userMg.get()?.user.email]})
        if (!initialData) {
          navigate("/Panel")
        }
      })
  }

  return (
    <>
    <div class="flex justify-center">
      <Card class="w-full max-w-2xl">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">
            <Show when={isNew} fallback="فرم اطلاعات شرکت">
                ثبت شرکت جدید
            </Show>
          </CardTitle>
          <CardDescription>لطفا اطلاعات شرکت خود را وارد کنید</CardDescription>
        </CardHeader>
        <form onSubmit={submit(handleSubmit)}>
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
                <Input {...register("company_name")} placeholder="نام شرکت خود را وارد کنید" class="text-right"  />
                <FaSolidBuilding class="w-5 h-5 text-gray-400 -mr-8" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="fax" class="block text-right">
                شماره فکس
              </Label>
              <div class="flex items-center">
                <Input {...register("company_fax")} placeholder="شماره فکس را وارد کنید" class="text-right"  />
                <FiPrinter class="w-5 h-5 text-gray-400 -mr-8" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="phone" class="block text-right">
                شماره تلفن
              </Label>
              <div class="flex items-center">
                <Input {...register("company_phone")} placeholder="شماره تلفن را وارد کنید" class="text-right"  />
                <FiPhone class="w-5 h-5 text-gray-400 -mr-8" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="phone" class="block text-right">
                  توضیح شرکت
              </Label>
              <div class="flex items-center">
                <Input {...register("description")} placeholder="چند جمله کوتاه در مورد شرکت شما" class="text-right"  />
                <BsFileText class="w-5 h-5 text-gray-400 -mr-8" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="address" class="block text-right">
                آدرس
              </Label>
              <Input
                {...register("company_address")}
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
