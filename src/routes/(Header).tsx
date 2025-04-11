import { RouteSectionProps } from "@solidjs/router"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

const HeaderGroup = (props: RouteSectionProps) => {
  return (
    <>
      <Header/>
      {props.children}
      <Footer/>
    </>
  )
}

export default HeaderGroup
