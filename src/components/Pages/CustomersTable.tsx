import { Icustomer } from "~/utility/interface";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { For } from "solid-js";

interface props {
  customers: Icustomer[];
}
const CustomersTable = ({ customers }: props) => {
  return (
    <div class="p-5 text-right">
      <Table>
        <TableCaption>لیست مشتریان ثبت شده</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead>تلفن</TableHead>
            <TableHead>فکس</TableHead>
            <TableHead>شهر</TableHead>
            <TableHead>کد پستی</TableHead>
            <TableHead>آدرس</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={customers}>
            {c => 
              <TableRow>
                <TableCell>{c.first_name} {c.last_name}</TableCell>
                <TableCell>{c.phone_number}</TableCell>
                <TableCell>{c.fax_number}</TableCell>
                <TableCell>{c.city}</TableCell>
                <TableCell>{c.post_code}</TableCell>
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
