interface p {
  class?: string
}
const Separator = (props:p) => {
  return (
    <div class={props.class + " w-full h-.1 bg-zinc-300"}></div>
  )
}

export default Separator
