import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Accessor, For } from "solid-js";
import { AI_customer } from "~/utility/apiInterface";
import { FiTrash } from "solid-icons/fi";
import { api } from "~/utility/api";
import { selectedCompany } from "~/utility/signals";
import { callModal } from "../modal/Modal";
import { useInvalidate } from "~/utility/queries";

interface props {
  customers: Accessor<AI_customer[]>;
}
const CustomersTable = ({ customers }: props) => {

  const invalidate = useInvalidate()
  const deleteMe = async (id: number) => {
    callModal.prompt("حذف شود؟")
    .yes(async () => {
      let data = {
        "customer_id": id,
        "company_id": selectedCompany()?.company_id || 0
      }
      await api.delete("/customer/DeleteCustomer", {data}).catch(() => callModal.fail())
      invalidate(q => q.customers, selectedCompany()?.company_id)
    })
  }

  return (
    <div class="p-5">
      <Table>
        <TableCaption>لیست مشتریان ثبت شده</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>نام</TableHead>
            <TableHead>تلفن</TableHead>
            <TableHead>فکس</TableHead>
            <TableHead>شهر</TableHead>
            <TableHead>کد پستی</TableHead>
            <TableHead>آدرس</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={customers()}>
            {c => 
              <TableRow>
                <TableCell class="text-red-600 cursor-pointer"><FiTrash onclick={() => deleteMe(c.customer_id || 0)}/></TableCell>
                <TableCell>{c.first_name}</TableCell>
                <TableCell>{c.phone_number}</TableCell>
                <TableCell>{c.fax_number}</TableCell>
                <TableCell>{c.city}</TableCell>
                <TableCell>{c.post_code || "-"}</TableCell>
                <TableCell class="max-w-30">{c.address}</TableCell>
              </TableRow>
            }
          </For>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomersTable;
