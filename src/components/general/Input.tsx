import { cn } from "~/lib/utils";
import {JSX} from "solid-js"

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  "data-validate"?: string
}
const Input = (props:InputProps) => {
  return (
    <>
      <input {...props} class={cn("p-2 w-full border-1 border-zinc-300 rounded-md bg-transparent min-h-10 " + props.class)}/>
      {props["data-validate"] && <div class="validation-error text-red-500 text-sm pr-2 mt-1"></div>}
    </>
  );
};

export default Input;
