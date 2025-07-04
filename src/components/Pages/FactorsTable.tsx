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
import { AI_Factor } from "~/utility/apiInterface";
import { FiEye, FiShare, FiShare2, FiTrash } from "solid-icons/fi";
import { api } from "~/utility/api";
import { selectedCompany } from "~/utility/signals";
import { callModal } from "../modal/Modal";
import { useQueryClient } from "@tanstack/solid-query";
import { ISODateToFa } from "~/utility/utility";

interface props {
  factors: Accessor<AI_Factor[]>;
}
const FactorsTable = ({ factors }: props) => {

  const qc = useQueryClient()
  const deleteMe = async (id: number) => {
    callModal.prompt("حذف شود؟")
    .yes(async () => {
      // let data = {
      //   "customer_id": id,
      //   "company_id": selectedCompany()?.company_id || 0
      // }
      // await api.delete("/customer/DeleteCustomer", {data}).catch(() => callModal.fail())
      // qc.invalidateQueries({queryKey:["customers"]})
    })
  }

  return (
    <div class="p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>نام مشتری</TableHead>
            <TableHead>تاریخ ثبت</TableHead>
            <TableHead>تعداد کلا</TableHead>
            <TableHead>اشتراک</TableHead>
            <TableHead>نمایش</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={factors()}>
            {c => 
              <TableRow>
                <TableCell class="text-red-600 cursor-pointer"><FiTrash onclick={() => deleteMe(c.factor_id)}/></TableCell>
                <TableCell>{c.factor_customer_name}</TableCell>
                <TableCell>{ISODateToFa(c.factor_date || "")}</TableCell>
                <TableCell>{c.factor_items.length}</TableCell>
                <TableCell><FiShare2 class="text-blue-600 cursor-pointer"/></TableCell>
                <TableCell><FiEye class="text-blue-600 cursor-pointer"/></TableCell>
              </TableRow>
            }
          </For>
        </TableBody>
      </Table>
    </div>
  );
};

export default FactorsTable;
