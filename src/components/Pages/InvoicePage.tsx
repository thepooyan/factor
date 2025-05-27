import Input from "../general/Input"
import ProductManage from "../ProductManage"

export default function InvoicePage() {


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

      <div class="col-span-2">
        <ProductManage/>
      </div>

    </div>
  </main>
}

