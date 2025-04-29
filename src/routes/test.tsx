import { onMount } from "solid-js"
import { callModal } from "~/components/modal/Modal"

const test = () => {
  onMount(() => {
    callModal("Welcome!")
    callModal.prompt()
      .yes(() => {
        callModal.success("Done!")
    })
    .no(() => {
        callModal.fail("Fail!")
      })
    callModal.wait()
  })
  return (
    <div>test</div>
  )
}

export default test
