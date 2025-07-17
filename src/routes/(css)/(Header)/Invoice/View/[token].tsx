import { useParams } from "@solidjs/router"
import { UseQueryResult } from "@tanstack/solid-query"
import { AxiosResponse, } from "axios"
import { createEffect, createSignal, Match, onMount, Switch } from "solid-js"
import ViewFactor from "~/components/ViewFactor"
import { AI_FactorView } from "~/utility/apiInterface"
import { queryFactorViewPublic } from "~/utility/queries"

const token = () => {

  const [data, setData] = createSignal<null | AI_FactorView>(null)
  const params = useParams() 
  const token = params.token
  let query: UseQueryResult<AxiosResponse<AI_FactorView>>

  onMount(() => {
    query = queryFactorViewPublic(token)
  })

  createEffect(() => {
    if (query.data?.data)
      setData(query.data.data)
  })

  return (
    <Switch>
      <Match when={data() === null}>لطفا صبر کنید...</Match>
      <Match when={data()}>{a => <ViewFactor invoiceData={a()}/>}</Match>
    </Switch>
  )
}

export default token
