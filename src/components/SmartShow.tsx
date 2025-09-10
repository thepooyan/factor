import { Show } from "solid-js"

interface p {
  d: string | null

}
const SmartP = ({d}:p) => {
  return (
    <Show when={d}>
      <p>{d}</p>
    </Show>
  )
}

export default SmartP
