import { useParams } from "@solidjs/router"
import { UseQueryResult } from "@tanstack/solid-query"
import { AxiosResponse } from "axios"
import { createEffect, createSignal, lazy, Match, onMount, Suspense, Switch } from "solid-js"
import Spinner from "~/components/general/Spinner"
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
    <>
      <Switch>
        <Match when={data() === null}><Spinner/></Match>
        <Match when={data()}>{a => <Suspense fallback={<Spinner/>}><Heavy data={a()}/></Suspense>}</Match>
      </Switch>
    </>
  )
}

export default id
