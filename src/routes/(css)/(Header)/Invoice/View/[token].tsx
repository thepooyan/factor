import { useParams } from "@solidjs/router"
import { createSignal, Match, onMount, Switch } from "solid-js"
import ViewFactor from "~/components/ViewFactor"
import { api } from "~/utility/api"
import { AI_FactorView } from "~/utility/apiInterface"

const token = () => {

  const [data, setData] = createSignal<null | AI_FactorView>(null)
  const params = useParams() 
  const token = params.token

  onMount(async() => {
    let res = await api.get<AI_FactorView>(`/factor/AccessShareFactor/${token}`)
    setData(res.data)
  })

  return (
    <Switch>
      <Match when={data() === null}>لطفا صبر کنید...</Match>
      <Match when={data()}>{a => <ViewFactor invoiceData={a()}/>}</Match>
    </Switch>
  )
}

export default token
