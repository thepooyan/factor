import { cn } from "~/lib/utils"

interface p {
  class?: string
  vertical?: boolean
}
const Separator = (props:p) => {
  return (
    <div class={cn("w-full h-.1 bg-zinc-300 my-2 mx-auto",
      props.class,
      props.vertical && "w-.1 h-full"
    )}></div>
  )
}

export default Separator
