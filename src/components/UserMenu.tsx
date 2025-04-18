import { FiUser } from "solid-icons/fi"
import { Iuser } from "~/utility/interface"

const UserMenu = ({user}:{user: Iuser}) => {
  return (
    <div class="flex gap-2 items-center">
      {user.user.email}
      <div class=" border-zinc-400 border-2 p-2 rounded inline-block ">
        <FiUser/>
      </div>
    </div>
  )
}

export default UserMenu
