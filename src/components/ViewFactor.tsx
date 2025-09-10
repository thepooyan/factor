import { Component, Show } from "solid-js"
import { AI_FactorView } from "~/utility/apiInterface"
import { Button } from "./ui/button"
import { PrinterIcon } from "lucide-solid"
import Minimal from "./Template/Minimal"

interface p {
  data: AI_FactorView
  Template?: Component<{data: AI_FactorView}>
  showButtons?: boolean
}
const ViewFactor = ({data, Template = Minimal, showButtons = false}:p) => {

  const handlePrint = () => {
    window.print()
  }

  return (
    <div class="bg-red">
      <Template data={data}/>
      <Show when={showButtons}>
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
