import { RouteSectionProps } from "@solidjs/router"
import Header from "~/components/Layout/Header"

const HeaderGroup = (props: RouteSectionProps) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  )
}

export default HeaderGroup
