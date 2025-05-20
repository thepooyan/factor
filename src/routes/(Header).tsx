import { RouteSectionProps } from "@solidjs/router"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import "../app.scss"

const HeaderGroup = (props: RouteSectionProps) => {
  return (
    <>
      <Header/>
      <div class="bg-zinc-100">
        {props.children}
      </div>
      <Footer/>
    </>
  )
}

export default HeaderGroup
