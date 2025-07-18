import { Button } from "~/components/ui/button"
import { BsFileText } from 'solid-icons/bs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Accessor, createSignal, Show } from "solid-js"
import { FiPhone, FiPrinter } from "solid-icons/fi"
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
import UploadLogo from "../general/UploadLogo"

interface props {
  isNew?: boolean
  initialData?: Accessor<ICompany>
}
const Company = ({isNew, initialData}:props) => {
  let form: Accessor<ICompany | undefined>;

  if (initialData)
    form = () => queryCompanies().data?.data.find(i => i.company_id === initialData().company_id)
    else 
    [form] = createSignal<ICompany>()

  const {register, submit} = useForm(form)
  const navigate = useNavigate()

  const qc = useQueryClient()


  const handleSubmit = (e: ICompany) => {
    callModal.wait()
    let fetch = () => api.post("/company/NewCompany", {company_infos: e})
    if (initialData) fetch = () => api.put("/company/EditCompany", {company_infos: {...e, company_id: initialData().company_id}})

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

  const deleteMe = async (id: number) => {
    callModal.prompt("حذف شود؟")
    .yes(async () => {
      callModal.wait()
      api.delete("https://phoneex.ir/f/company/DeleteCompany", {data: {company_id: id }})
        .catch(e => callModal.fail(e))
        .then(() => {
          callModal.success();
          qc.invalidateQueries({queryKey: ["compaines", userMg.get()?.user.email]})
          })
      })

  }

  return (
    <>
    <div class="flex justify-center">
      <Card class="w-full max-w-2xl relative">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">
            <Show when={isNew} fallback="فرم اطلاعات شرکت">
                ثبت شرکت جدید
            </Show>
          </CardTitle>
          <CardDescription>لطفا اطلاعات شرکت خود را وارد کنید</CardDescription>
        </CardHeader>
          <Show when={initialData}>{i => 
            <Button variant="destructive" class="absolute left-5 top-5"
            onclick={() => deleteMe(i()().company_id)}>حذف شرکت</Button>
          }</Show>
        <form onSubmit={submit(handleSubmit)}>
          <CardContent class="space-y-6">
            <Show when={initialData}>
              {i => <>
                <div class="space-y-2">
                  <Label for="logo" class="block text-right">
                    لوگوی شرکت
                  </Label>
                  <UploadLogo company={i()}/>
                </div>
              </>}
            </Show>

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
