import { generateShareLink } from "~/utility/utility"
import Copyable from "./general/Copyable"
import { AI_Factor } from "~/utility/apiInterface"
import { queryFactorShareLink } from "~/utility/queries"
import { Suspense } from "solid-js"
import Spinner from "./general/Spinner"

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
            {link()}
          </div>
        </Copyable>
      </Suspense>
    </div>
  )
}

export default ShareModal
