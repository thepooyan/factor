import { createEffect, createSignal, onMount } from "solid-js";
import { AI_customer } from "~/utility/apiInterface";
import { queryCustomers } from "~/utility/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { retriveSelectedCompany } from "~/utility/utility";

const SelectCustomer = () => {
  const [customers, setCustomers] = createSignal<AI_customer[]>([]);


  onMount(() => {
    retriveSelectedCompany()
    let c = queryCustomers();
    createEffect(() => {
      setCustomers(c.data?.data || []);
    });
  });

  const runChange = (e: number | null) => {
    console.log(e)
  }

  return (
    <div class="space-y-2">
      <span>
        انتخاب مشتری:
      </span>

      <Select
        onChange={runChange}
        options={customers().map(c => c.customer_id)}
        placeholder="انتخاب مشتری"
        itemComponent={(props) => (
          <SelectItem item={props.item}>{customers().find(c => c.customer_id === props.item.rawValue)?.first_name}</SelectItem>
        )}
      >
        <SelectTrigger aria-label="Fruit">
          <SelectValue<number>>{(state) => customers().find(c => c.customer_id === state.selectedOption())?.first_name }</SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
  </div>
  );
};

export default SelectCustomer;
