import { FiPlus } from "solid-icons/fi"
import { Button } from "./ui/button"
import { callModal } from "./modal/Modal"

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
    hi
  </>
}

export default AddCompany
