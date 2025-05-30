import { setTaxRate, taxRate } from "~/utility/signals"
import Input from "../general/Input"
import ProductManage from "../ProductManage"
import moment from 'jalali-moment'
import { Button } from "../ui/button"


export default function InvoicePage() {

  const date = moment().locale("fa").format("YYYY/M/D")

  return <main class="m-10 border-1 border-zinc-800 rounded p-5">
    <h1 class="text-xl text-center font-bold mb-5">فاکتور فروش</h1>

    <div class="grid grid-cols-2 gap-5">

      <div class="space-y-2">
        <label>تاریخ:</label>
        <Input value={date} />
      </div>

      <div class="space-y-2">
        <label>شماره فاکتور:</label>
        <Input value={"1001"}/>
      </div>

      <div class="space-y-2">
        <label>شماره حواله:</label>
        <Input placeholder="شماره حواله"/>
      </div>

      <div class="space-y-2">
        <label>مالیات (درصد)</label>
        <Input value={taxRate()} onchange={e => setTaxRate(parseInt(e.target.value))} type="number"/>
      </div>

      <h2 class="col-span-2 text-lg font-bold text-center">مشخصات خریدار</h2>

      <div class="space-y-2">
        <label>نام شخص حقیقی/حقوقی:</label>
        <Input placeholder="نام مورد نظر"/>
      </div>

      <div class="space-y-2">
        <label>شماره ملی/شماره ثبت:</label>
        <Input placeholder="0441234567"/>
      </div>

      <div class="space-y-2">
        <label>نشانی:</label>
        <Input placeholder="تهران خیابان ..."/>
      </div>

      <div class="space-y-2">
        <label>کد پستی:</label>
        <Input placeholder="1234567890"/>
      </div>

      <div class="space-y-2">
        <label>تلفن:</label>
        <Input placeholder="021-11223344"/>
      </div>

      <div class="space-y-2">
        <label>نمابر:</label>
        <Input placeholder="021-11223344"/>
      </div>

      <h2 class="col-span-2 text-lg font-bold text-center">مشخصات کالا/خدمات</h2>

      <div class="col-span-2">
        <ProductManage/>
      </div>

      <div class="col-span-2 flex justify-center">
        <Button>ثبت </Button>
      </div>

    </div>
  </main>
}

