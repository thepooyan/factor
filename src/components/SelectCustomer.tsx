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
import { invoiceStore } from "./Pages/InvoicePage";
import { produce, SetStoreFunction } from "solid-js/store";

interface props {
  setStore: SetStoreFunction<invoiceStore>
}
const SelectCustomer = ({setStore}:props) => {
  const [customers, setCustomers] = createSignal<AI_customer[]>([]);


  onMount(() => {
    retriveSelectedCompany()
    let c = queryCustomers();
    createEffect(() => {
      setCustomers(c.data?.data || []);
    });
  });

  const runChange = (e: number | null) => {
    if (e === null) return
    let target = customers().find(c => c.customer_id === e)
    if (!target) return

    setStore(produce(e => {
      e.recieverName = String(target.first_name)
      e.recieverFax = String(target.fax_number)
      e.recieverPhone = String(target.phone_number)
      e.recieverAddress = String(target.address)
      e.recieverNatinalID = String(target.identification_number)
      e.recieverPostalCode = String(target.post_code)
    }))
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
