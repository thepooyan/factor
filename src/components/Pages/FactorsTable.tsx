import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Accessor, For } from "solid-js";
import { AI_Factor } from "~/utility/apiInterface";
import { FiEye , FiShare2, FiTrash } from "solid-icons/fi";
import { api } from "~/utility/api";
import { selectedCompany } from "~/utility/signals";
import { callModal } from "../modal/Modal";
import { useQueryClient } from "@tanstack/solid-query";
import { ISODateToFa } from "~/utility/utility";
import ShareModal from "../ShareModal";
import { A } from "@solidjs/router";

interface props {
  factors: Accessor<AI_Factor[]>;
}
const FactorsTable = ({ factors }: props) => {

  const qc = useQueryClient()
  const deleteMe = async (id: number) => {
    callModal.prompt("حذف شود؟")
    .yes(async () => {
      let data = {
        "factor_id": id,
        "company_id": selectedCompany()?.company_id || 0
      }
      await api.delete("/factor/DeleteFactor", {data}).catch(() => callModal.fail())
      qc.invalidateQueries({queryKey:["factors"]})
    })
  }

  const share = async (item: AI_Factor) => {
    callModal(() => <ShareModal item={item}/>)
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
                <TableCell><FiShare2 onclick={() => share(c)} class="text-blue-600 cursor-pointer"/></TableCell>
                <TableCell><A href={`/Panel/ViewFactor/${c.factor_id}`}><FiEye class="text-blue-600 cursor-pointer"/></A></TableCell>
              </TableRow>
            }
          </For>
        </TableBody>
      </Table>
    </div>
  );
};

export default FactorsTable;
