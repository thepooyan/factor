import { useParams } from "@solidjs/router";
import InvoicePage from "~/components/Pages/InvoicePage"

const New = () => {
  const params = useParams();
  // params.template
  return (
    <InvoicePage/>
  )
}

export default New
