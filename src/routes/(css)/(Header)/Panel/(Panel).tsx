import { UseQueryResult } from "@tanstack/solid-query"
import { AxiosResponse } from "axios"
import { onMount, Show } from "solid-js"
import Company from "~/components/Pages/Company"
import { ICompany } from "~/utility/interface"
import { queryCompanies } from "~/utility/queries"
import { selectedCompany } from "~/utility/signals"

const Panel = () => {

  let query:UseQueryResult<AxiosResponse<ICompany[]>>
  onMount(() => {
    query = queryCompanies()
  })

  const folan = () => {
    const selected = selectedCompany()?.company_id;
    if (!selected || !query) return null
    return query.data?.data.find(a => a.company_id ===  selected) || null
  }

  return (
    <Show when={folan()}>
      {a => <Company initialData={a}/>}
    </Show>
  )
}

export default Panel
