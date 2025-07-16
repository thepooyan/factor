import { useParams } from "@solidjs/router"
import { UseQueryResult } from "@tanstack/solid-query"
import { AxiosResponse } from "axios"
import { createEffect, createSignal, Match, onMount, Switch } from "solid-js"
import Spinner from "~/components/general/Spinner"
import ViewFactor from "~/components/ViewFactor"
import { AI_FactorView } from "~/utility/apiInterface"
import { queryFactorView } from "~/utility/queries"
import { selectedCompany } from "~/utility/signals"

const id = () => {
  const params = useParams()
  const id = params.id

  const [data, setData] = createSignal<AI_FactorView | null>(null)
  let query: UseQueryResult<AxiosResponse<AI_FactorView>>

  onMount(async() => {
    const company = selectedCompany()
    if (!company) throw new Error("شرکت انتخاب شده یافت نشد")

    query = queryFactorView(id, company.company_id)
  })

  createEffect(() => {
    if (query.data?.data)
      setData(query.data.data)
  })

  return (
    <>
      <Switch>
        <Match when={data() === null}><Spinner/></Match>
        <Match when={data()}>{a => <ViewFactor invoiceData={a()}/>}</Match>
      </Switch>
    </>
  )
}

export default id
