import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { FiPhone } from "solid-icons/fi"
import Input from "../general/Input"
import { createSignal, onMount } from "solid-js"
import { api } from "~/utility/api"
import { Iprofile } from "~/utility/interface"
import { useForm } from "~/utility/hooks"
import { callModal } from "../modal/Modal"
import { queryUserInfo } from "~/utility/queries"

const Profile = () => {

  const [profile, setProfile] = createSignal<Iprofile | undefined>(undefined);
  const {register, submit} = useForm(profile)

  const handleSubmit = (data: Iprofile) => {
    callModal.wait()
    api.put("/users/EditUser", data)
    .then(() => {
        callModal.success("ثبت شد!")
      })
    .catch(({msg}) => {
        callModal.fail(msg)
      })
  }

  onMount(async () => {
    let user = queryUserInfo()
    if (user.data?.data)
      setProfile(user.data.data)
  })

  return (
    <>
    <div class="flex justify-center">
      <Card class="w-full max-w-2xl">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">فرم اطلاعات شخصی</CardTitle>
          <CardDescription>در صورت تمایل اطلاعات شخصی خود را کامل کنید</CardDescription>
        </CardHeader>
        <form onSubmit={submit(handleSubmit)}>
          <CardContent class="space-y-6">

            <div class="space-y-2">
              <Label for="name" class="block text-right">
                  نام
              </Label>
              <div class="flex items-center">
                <Input {...register("first_name")} placeholder="نام خود را وارد کنید" class="text-right" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="fax" class="block text-right">
                  نام خانوادگی
              </Label>
              <div class="flex items-center">
                <Input {...register("last_name")} placeholder="نام خانوادگی خود را وارد کنید" class="text-right" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="phone" class="block text-right">
                شماره تلفن
              </Label>
              <div class="flex items-center">
                <Input {...register("phone_number")} placeholder="شماره تلفن را وارد کنید" class="text-right" />
                <FiPhone class="w-5 h-5 text-gray-400 -mr-8" />
              </div>
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
