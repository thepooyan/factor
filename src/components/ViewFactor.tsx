import "~/styles/print.scss"
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
    <div class=" max-w-4xl m-auto flex flex-col gap-5 w-full">
      <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md print:shad transition-all ">
        <Template data={data}/>
      </div>
      <Show when={showButtons}>
        <div class="flex gap-4 justify-center print:hidden">
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
