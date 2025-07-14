import { generateShareLink } from "~/utility/utility"
import Copyable from "./general/Copyable"
import { AI_Factor } from "~/utility/apiInterface"
import { queryFactorShareLink } from "~/utility/queries"
import { Suspense } from "solid-js"
import Spinner from "./general/Spinner"
import { FiClipboard } from "solid-icons/fi"
import { Button } from "./ui/button"
import { A } from "@solidjs/router"

interface props {
  item: AI_Factor
}
const ShareModal = ({item}:props) => {

  let res = queryFactorShareLink(item.factor_id, item.company_id)
  let link = () => generateShareLink(res.data?.data.unique_token || "")

  return (
    <div class="space-y-1">
      <p>میتوانید از لینک زیر برای اشتراک گذاری این فاکتور استفاده کنید. </p>
      <Suspense fallback={<Spinner/>}>
        <Copyable toCopy={link()}>
          <div class="bg-zinc-100 rounded px-2 text-blue ltr">
            <div class="flex items-center gap-2 justify-center">
              <FiClipboard class=""/>
              <span class=" text-nowrap w-70 overflow-hidden ">
                {link()}
              </span>
            </div>
          </div>
        </Copyable>
        <Button size="sm" class="block m-auto" variant="secondary">
          <a href={link()} target="_blank">
            نمایش
          </a>
        </Button>
      </Suspense>
    </div>
  )
}

export default ShareModal
