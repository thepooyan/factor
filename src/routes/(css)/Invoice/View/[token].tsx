import { useParams } from "@solidjs/router"
import { onMount } from "solid-js"
import { api } from "~/utility/api"

const token = () => {

  const params = useParams() 
  const token = params.token

  onMount(async() => {
    let data = await api.post(`/factor/AccessShareFactor/${token}`)
    console.log(data)
  })

  return (
    <div>token</div>
  )
}

export default token
