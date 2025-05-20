import { FiPlus } from "solid-icons/fi"
import { Button } from "./ui/button"
import { A } from "@solidjs/router"

const AddCompany = () => {
  return (
    <Button variant="outline" as={A} href="/newCompany" class="bg-white">
      <FiPlus/>
    </Button>
  )
}

export default AddCompany
