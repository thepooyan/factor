import { ParentProps } from "solid-js"
import "../app.scss"

const Layout = ({children}:ParentProps) => {
  return (
    <>
      {children}
    </>
  )
}

export default Layout
