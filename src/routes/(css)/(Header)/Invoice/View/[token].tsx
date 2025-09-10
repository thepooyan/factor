import { useParams } from "@solidjs/router"
import { UseQueryResult } from "@tanstack/solid-query"
import { AxiosResponse, } from "axios"
import { createEffect, createSignal, Match, onMount, ParentProps, Switch } from "solid-js"
import Spinner from "~/components/general/Spinner"
import ViewFactor from "~/components/ViewFactor"
import { AI_FactorView } from "~/utility/apiInterface"
import { queryFactorViewPublic } from "~/utility/queries"

const token = () => {

  const [data, setData] = createSignal<null | UseQueryResult<AxiosResponse<AI_FactorView>>>(null)
  const params = useParams() 
  const token = params.token
  let query: UseQueryResult<AxiosResponse<AI_FactorView>>

  onMount(() => {
    query = queryFactorViewPublic(token)
  })

  createEffect(() => {
      setData(query)
    console.log(query.status)
  })

  return (
    <Switch>
      <Match when={data() === null || data()?.isPending}><Ghab>لطفا صبر کنید... <Spinner/></Ghab></Match>
      <Match when={data()?.data?.data}>{a => <ViewFactor showButtons data={a()}/>}</Match>
      <Match when={data()?.error}><Ghab>فاکتور مورد نظر یافت نشد</Ghab></Match>
    </Switch>
  )
}

const Ghab = ({children}:ParentProps) => {
  return <div class="flex h-70 justify-center items-center">{children}</div>
}

export default token
