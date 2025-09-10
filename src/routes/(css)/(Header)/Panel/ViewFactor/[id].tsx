import { useParams } from "@solidjs/router"
import { UseQueryResult } from "@tanstack/solid-query"
import { AxiosResponse } from "axios"
import { ArrowLeft } from "lucide-solid"
import { createEffect, createSignal, lazy, Match, onMount, Suspense, Switch } from "solid-js"
import Spinner from "~/components/general/Spinner"
import { Button } from "~/components/ui/button"
import { AI_FactorView } from "~/utility/apiInterface"
import { queryFactorView } from "~/utility/queries"
import { selectedCompany } from "~/utility/signals"
const Heavy = lazy(() => import("~/components/ViewFactor"))

const id = () => {
  const params = useParams()
  const id = params.id

  const [data, setData] = createSignal<AI_FactorView | null>(null)
  let query: UseQueryResult<AxiosResponse<AI_FactorView>>

  onMount(async() => {
    const company = selectedCompany()
    if (!company) throw new Error("شرکت انتخاب شده یافت نشد")

    query = queryFactorView(id, company.company_id)
    Heavy.preload()
  })

  createEffect(() => {
    if (query.data?.data)
      setData(query.data.data)
  })

  return (
    <div>
      <Button variant="secondary" class="mr-auto w-max ml-16 flex" as="A" href="/Panel/FactorList">
        بازگشت
        <ArrowLeft/>
      </Button>
      <Switch>
        <Match when={data() === null}><Spinner/></Match>
        <Match when={data()}>{a => <Suspense fallback={<Spinner/>}><Heavy data={a()}/></Suspense>}</Match>
      </Switch>
    </div>
  )
}

export default id
