import { Component, Show } from "solid-js"
import { AI_FactorView } from "~/utility/apiInterface"
import { Button } from "./ui/button"
import { PrinterIcon } from "lucide-solid"

interface p {
  data: AI_FactorView
  Template: Component<{data: AI_FactorView}>

}
const ViewFactor = ({data, Template}:p) => {

  const handlePrint = () => {
    window.print()
  }

  return (
    <div>
      <Template data={data}/>
      <Show when={true}>
        <div class="flex gap-4 justify-center print:hidden mt-10">
          <Button onClick={handlePrint} variant="secondary">
            <PrinterIcon/>
            چاپ فاکتور
          </Button>
          {/*
          <Button onClick={handleAccept} class="flex items-center gap-2">
            <Check class="w-4 h-4" />
            تایید پیش فاکتور
          </Button>
          */}
        </div>
      </Show>
    </div>
  )
}

export default ViewFactor
