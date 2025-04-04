import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import A from "~/components/general/A";
import Spinner from "~/components/general/Spinner";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { debounce } from "~/utility/utility";

const Signup = () => {
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [avatar, setAvatar] = createSignal<string>("");
  const navigate = useNavigate()

  createEffect(() => {
    // if (user.signal() !== null) navigate("/Chat")
  })


  let nameRef!: HTMLInputElement;

  const signup = async (e:SubmitEvent) => {
    e.preventDefault()
    const username = nameRef.value
    setIsLoading(true);
    // if (usernameExists(username)) {
    //   setError("Username already exists");
    //   setIsLoading(false);
    //   return;
    // }
    // await createNewUser(username)
    setIsLoading(false);
    navigate("/Chat")
  };

  const checkUsername = async () => {
    // if (await usernameExists(nameRef.value))
    //   setError("Username already exists");
    // else {
    //     setError(null)
    //   };
      setIsLoading(false)
  };
  const d_checkUsername = debounce(checkUsername, 300)
  const d_setAvatar = debounce(setAvatar, 300)

  const onInput = () => {
    setIsLoading(true)
    d_checkUsername()
    d_setAvatar(nameRef.value)
  }

  return (
    <form class="w-sm flex flex-col gap-4 justify-center h-dvh m-auto " onsubmit={signup}>
      <h1 class=" text-center text-3xl font-bold mb-3">Sign-up</h1>
      <div class="flex justify-center items-center flex-col gap-2 ">
        <span class="text-sm">Avatar based on "{avatar()}"</span>
      </div>
      <TextField>
        <TextFieldLabel>Username:</TextFieldLabel>
        <TextFieldInput
          placeholder="Find a uniqe username"
          ref={nameRef}
          class={`${error() && "border-red"}`}
          onInput={onInput}
        />
        <span class="text-red-600 text-xs">{error()}</span>
      </TextField>
      <Alert>
        <AlertDescription>
          Choose a username and a pair of Public/Private keys will be generated
          for you automatically. <A href="/About">Learn more</A>
        </AlertDescription>
      </Alert>
      <Button type="submit" disabled={isLoading() || error() !== null}>
        {isLoading() ? <Spinner /> : "Generate your keypair!"}
      </Button>
      <p class="text-center">
        Already have a key pair? login <A href="/Login">here!</A>
      </p>
    </form>
  );
};

export default Signup;
