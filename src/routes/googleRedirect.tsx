import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import axios from "axios"

const googleRedirect = () => {
  const navigate = useNavigate();

  onMount(() => {
    let hashString = window.location.hash;
    if (hashString === "") navigate("/")
    let slice = hashString.slice(1);
    let params = new URLSearchParams(slice);
    const parsedData = Object.fromEntries(
      params.entries(),
    ) as unknown as googleResponse;

    axios.post(import.meta.env.VITE_API + "/auth/google", {access_token: parsedData.access_token})
  });

  return <div>googleRedirect</div>;
};

export default googleRedirect;

interface googleResponse {
  access_token: string;
  authuser: string;
  expires_in: string;
  prompt: string;
  scope: string;
  token_type: string;
}
