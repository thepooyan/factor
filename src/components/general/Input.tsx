import { ParentProps } from "solid-js";
import {
  TextField,
  TextFieldInput,
} from "~/components/ui/text-field";

const Input = (props:any) => {
  return (
    <TextField>
      <TextFieldInput {...props} />
    </TextField>
  );
};

export default Input;
