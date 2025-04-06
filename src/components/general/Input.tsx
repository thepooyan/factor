import {
  TextField,
  TextFieldInput,
} from "~/components/ui/text-field";

const Input = (props:any) => {
  return (
    <TextField>
      <TextFieldInput {...props}  class={props.class + " border-zinc-300"}/>
    </TextField>
  );
};

export default Input;
