import { ParentProps } from "solid-js"
import { PanelPage } from "~/components/Pages/PanelPage"

const Panel = ({children}:ParentProps) => {
  return (
    <PanelPage>
      {children}
    </PanelPage>
  )
}

export default Panel
