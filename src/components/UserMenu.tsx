import { FiUser } from "solid-icons/fi"
import { Iuser } from "~/utility/interface"
import { Button } from "./ui/button"
import { userMg } from "~/utility/signals"

const UserMenu = ({user}:{user: Iuser}) => {
  return (
    <div class="flex gap-2 items-center">
      {user.user.email}
      <div class=" border-zinc-400 border-2 p-2 rounded inline-block ">
        <FiUser/>
      </div>
      <Button onclick={() => userMg.logout()}>Logout</Button>
    </div>
  )
}

export default UserMenu
