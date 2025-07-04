import { onMount } from "solid-js"
import { api } from "~/utility/api"

const test = () => {


  onMount(async () => {

    let data = {
      "customer_id": 9,
      "company_id": "2",
      "first_name": "string",
      "last_name": "string"
    }
    let a = await api.put("/customer/EditCustomer", data)
    console.log(a)
  })

  return (
    <>
      test
    </>
  )
}

export default test
