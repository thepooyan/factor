import { FiPlus } from "solid-icons/fi"
import { Button } from "./ui/button"
import { callModal } from "./modal/Modal"
import Company from "./Pages/Company"

const AddCompany = () => {
  const click = () => {
    callModal(<NewCompanyForm/>)
  }
  return (
    <Button variant="outline" onclick={click} class="bg-white">
      <FiPlus/>
    </Button>
  )
}

const NewCompanyForm = () => {
  return <>
    <Company/>
  </>
}

export default AddCompany
