import { useParams } from "@solidjs/router"
import { createSignal, Match, onMount, Switch } from "solid-js"
import Spinner from "~/components/general/Spinner"
import ViewFactor from "~/components/ViewFactor"
import { api } from "~/utility/api"
import { AI_FactorView } from "~/utility/apiInterface"
import { selectedCompany } from "~/utility/signals"

const id = () => {
  const params = useParams()
  const id = params.id

  const [data, setData] = createSignal<AI_FactorView | null>(null)

  onMount(async() => {
    const company = selectedCompany()
    if (!company) throw new Error("شرکت انتخاب شده یافت نشد")

    let response = await api.post<AI_FactorView>("/factor/infos", {factor_id: id, company_id: company.company_id})
    setData(response.data)
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
