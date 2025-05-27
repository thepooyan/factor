import { createSignal } from "solid-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Status = () => {
  const [selected, setSelected] = createSignal("")
  const options = [
    {value: "paied", label: "تسویه شده"},
    {value: "waiting", label: "در انتظار واریز"}
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {selected()} hi
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          options.map(o => 
            <DropdownMenuItem
              onclick={() => setSelected(o.value)}
            >{o.label}</DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Status;
