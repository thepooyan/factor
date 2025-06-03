import { useParams } from "@solidjs/router"
import InvoicePage from "~/components/Pages/InvoicePage"

const company = () => {
  const params = useParams()
  return (
    <InvoicePage companyId={params.company}/>
  )
}

export default company
