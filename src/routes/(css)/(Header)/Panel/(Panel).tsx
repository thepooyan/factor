import {  Show } from "solid-js"
import Company from "~/components/Pages/Company"
import { queryCompanies } from "~/utility/queries"
import { selectedCompany } from "~/utility/signals"

const Panel = () => {

  const folan = () => {
    const selected = selectedCompany()?.company_id;
    if (!selected) return null
    return queryCompanies().data?.data.find(a => a.company_id ===  selected) || null
  }

  return (
    <>
      <Show when={folan()}>
        {a => <Company initialData={a}/>}
      </Show>
    </>
  )
}

export default Panel
