import { ColumnDef } from "@tanstack/solid-table"
import { DataTable } from "./ui/data-table";
import { createSignal } from "solid-js";
import { Button } from "./ui/button";

const ProductTable = () => {

  interface item {
    id: number,
    name: string, 
    quantity: number, 
    unitPrice: number, 
    discount: number, 
    totalPrice: number
  }

  let [data, setData] = createSignal<item[]>([
    {
      id: 1,
      name: "folan",
      quantity: 3, 
      unitPrice: 1, 
      discount: 1, 
      totalPrice: 10, 
    }
  ]);

  const columns: ColumnDef<item>[] = [
    {
      accessorKey: "id",
      header: "ردیف"
    },
    {
      accessorKey: "name",
      header: "نام کالا"
    },
    {
      accessorKey: "quantity",
      header: "تعداد"
    },
    {
      accessorKey: "unitPrice",
      header: "قیمت واحد (ریال)"
    },
    {
      accessorKey: "discount",
      header: "تخفیف (%)"
    },
    {
      accessorKey: "totalPrice",
      header: "قیمت کل (ریال)"
    },
  ]



  return (<>
    <DataTable columns={columns} data={data()}/>
    <Button class="mt-2">افزودن</Button>
  </>)
}

export default ProductTable;
