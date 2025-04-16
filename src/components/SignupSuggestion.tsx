import { closeModal } from "./modal/Modal"
import { Button } from "./ui/button"

const SignupSuggestion = () => {
  return (
    <div class="flex gap-2 flex-col">
       اکانتی با مشخصات وارد شده یافت نشد 
      <Button as="A" href="/Signup" onclick={closeModal}>ثبت نام</Button>
    </div>
  )
}

export default SignupSuggestion
