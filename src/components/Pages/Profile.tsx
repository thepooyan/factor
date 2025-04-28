import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { FiPhone } from "solid-icons/fi"
import Input from "../general/Input"
import { createSignal, onMount } from "solid-js"
import { api } from "~/utility/api"
import { Iprofile } from "~/utility/interface"
import { former } from "~/utility/utility"

const Profile = () => {

  const [profile, setProfile] = createSignal<Iprofile | undefined>(undefined);

  const handleSubmit = (data: Iprofile) => {
    console.log(data)
  }

  onMount(async () => {
    let user = await api.get<Iprofile>(`/users/infos`)
    console.log(user.data)
    setProfile(user.data)
  })

  return (
    <>
    <div class="flex justify-center">
      <Card class="w-full max-w-2xl">
        <CardHeader class="text-right">
          <CardTitle class="text-2xl font-bold">فرم اطلاعات شخصی</CardTitle>
          <CardDescription>در صورت تمایل اطلاعات شخصی خود را کامل کنید</CardDescription>
        </CardHeader>
        <form onSubmit={former<Iprofile>(handleSubmit)}>
          <CardContent class="space-y-6">

            <div class="space-y-2">
              <Label for="name" class="block text-right">
                  نام
              </Label>
              <div class="flex items-center">
                <Input id="name" name="first_name" placeholder="نام خود را وارد کنید" class="text-right" value={profile()?.first_name || ""} />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="fax" class="block text-right">
                  نام خانوادگی
              </Label>
              <div class="flex items-center">
                <Input id="fax" placeholder="نام خانوادگی خود را وارد کنید" class="text-right" value={profile()?.last_name || ""} />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="phone" class="block text-right">
                شماره تلفن
              </Label>
              <div class="flex items-center">
                <Input id="phone" placeholder="شماره تلفن را وارد کنید" class="text-right" value={profile()?.phone_number || ""} />
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
