import { onMount } from "solid-js"
import ShareModal from "~/components/ShareModal"
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
      <ShareModal token="hfhfhfhfh"/>
    </>
  )
}

export default test
