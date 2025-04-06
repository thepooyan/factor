import { cn } from "~/lib/utils";

const Input = (props:any) => {
  return (
    <input {...props} class={cn("p-2 w-full border-1 border-zinc-300 rounded-md bg-transparent min-h-10" + props.class)}/>
  );
};

export default Input;
