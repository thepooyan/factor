import { Show } from "solid-js"
import Company from "~/components/Pages/Company"
import { selectedCompany } from "~/utility/signals"

const Panel = () => {
  return (
    <Show when={selectedCompany()}>
      {a => <Company initialData={a}/>}
    </Show>
  )
}

export default Panel
