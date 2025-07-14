import { generateShareLink } from "~/utility/utility"
import Copyable from "./general/Copyable"

interface props {
  token: string
}
const ShareModal = ({token}:props) => {
  let link = generateShareLink(token)
  return (
    <div class="space-y-1">
      <p>میتوانید از لینک زیر برای اشتراک گذاری این فاکتور استفاده کنید. </p>
      <Copyable toCopy={link}>
        <div class="bg-zinc-100 rounded px-2 text-blue ltr">
          {link}
        </div>
      </Copyable>
    </div>
  )
}

export default ShareModal
