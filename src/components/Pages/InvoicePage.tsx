import { Button } from "~/components/ui/button"
import { createSignal } from "solid-js"
import Input from "../general/Input"

export default function InvoicePage() {

  const item = {
    id: 1,
    name: "test", 
    quantity: 2, 
    unitPrice: 10, 
    discount: 1, 
  }

  const [items, setItems] = createSignal([item])

  // const addRow = () => {
  //   setItems(prev => [...prev, {...item, id: prev.at(-1)?.id || 1}])
  // }

  const deleteRow = (id: number) => {
    setItems(prev => [...prev.filter(p => p.id !== id)])
  }

  return <main class="m-10 border-1 border-zinc-800 rounded p-5">
    <h1 class="text-xl text-center font-bold mb-5">فاکتور فروش</h1>

    <div class="grid grid-cols-2 gap-5">

      <div class="space-y-2">
        <label>شماره فاکتور:</label>
        <Input/>
      </div>

      <div class="space-y-2">
        <label>شماره حواله:</label>
        <Input/>
      </div>

      <div class="space-y-2">
        <label>تاریخ:</label>
        <Input/>
      </div>

      <h2 class="col-span-2 text-lg font-bold text-center">مشخصات خریدار</h2>

      <div class="space-y-2">
        <label>نام شخص حقیقی/حقوقی:</label>
        <Input/>
      </div>

      <div class="space-y-2">
        <label>شماره ملی/شماره ثبت:</label>
        <Input/>
      </div>

      <div class="space-y-2">
        <label>نشانی:</label>
        <Input/>
      </div>

      <div class="space-y-2">
        <label>کد پستی:</label>
        <Input/>
      </div>

      <div class="space-y-2">
        <label>تلفن:</label>
        <Input/>
      </div>

      <div class="space-y-2">
        <label>نمابر:</label>
        <Input/>
      </div>

      <h2 class="col-span-2 text-lg font-bold text-center">مشخصات کالا/خدمات</h2>

          {/*
      <table class="col-span-2 border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-right">ردیف</th>
            <th class="border p-2 text-right">نام کالا</th>
            <th class="border p-2 text-right">تعداد</th>
            <th class="border p-2 text-right">قیمت واحد (ریال)</th>
            <th class="border p-2 text-right">تخفیف (%)</th>
            <th class="border p-2 text-right">قیمت کل (ریال)</th>
            <th class="border p-2 text-right">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {items().map((tr, ind) => <tr>
            <td>{ind+1}</td>
            <td>{tr.name}</td>
            <td>{tr.quantity}</td>
            <td>{tr.unitPrice}</td>
            <td>{tr.discount}</td>
            <td>{tr.quantity * tr.unitPrice}</td>
            <td
              onclick={() => deleteRow(tr.id)}
            >حذف</td>
          </tr>)}
        </tbody>
        <Button >افزودن</Button>
      </table>
          */}


    </div>
  </main>
}

