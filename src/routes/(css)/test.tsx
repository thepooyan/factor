import { useQueryClient } from "@tanstack/solid-query"
import { createEffect, For, onMount } from "solid-js"
import { queryCompanies } from "~/utility/queries"

const test = () => {

  let query:any
  onMount(() => {
    query = queryCompanies()
  })
  const qc = useQueryClient()

  const folan = () => {
    qc.invalidateQueries({queryKey: ["comp"]})
  }

  const getNames = () => {
    return query?.data?.data.map(c => c.company_name) || []
  }

  return (
    <div>
      <For each={getNames()}>
        {n => <div class="border-1 rounded p-2 m-2 border-black">{n}</div>}
      </For>
      <button onclick={folan}>hi</button>
    </div>
  )
}

export default test
