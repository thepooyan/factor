import { setTaxRate, taxRate } from "~/utility/signals"
import Input from "../general/Input"
import ProductManage, { productItems } from "../ProductManage"
import moment from 'jalali-moment'
import { Button } from "../ui/button"
import { onMount } from "solid-js"
import { api } from "~/utility/api"
import { InewFactor, InewFactorNumber } from "~/utility/interface"
import { createStore } from "solid-js/store"
import { callModal } from "../modal/Modal"
import { convertToDTO } from "~/utility/apiInterface"


interface props {
  companyId: string
}
export default function InvoicePage({companyId}:props) {

  const date = moment().locale("fa").format("YYYY/M/D")

  const [store, setStore] = createStore({
    date: date,
    factorNumber: "",
    transferNumber: "",

    recieverName: "",
    recieverNatinalID: "",
    recieverPostalCode: "",
    recieverAddress: "",
    recieverPhone: "",
    recieverFax: "",

  })

  const register = (name: keyof typeof store) => ({
    onChange: (e:any) => {
      setStore(name, e.currentTarget.value)
    },
    value: store[name]
  })

  onMount(async() => {
    let res = await api.post<InewFactorNumber>("/factor/NewFactorNumber", {company_id: companyId}) 
    setStore("factorNumber", res.data.factor_new_number)
  })

  const done = async () => {
    let a:InewFactor = {...store,taxRate:taxRate().toString(), companyId: companyId, products: [...productItems()] }
    if (a.products.length === 0) return callModal.fail("تعداد کالا نمیتواند صفر باشد")
    
    let res = await api.post("/factor/NewFactor", convertToDTO(a))
    console.log(convertToDTO(a))
    console.log(res)
    //send out
  }

  return <main class="m-10 border-1 border-zinc-800 rounded p-5">
    <h1 class="text-xl text-center font-bold mb-5">فاکتور فروش</h1>

    <div class="grid grid-cols-2 gap-5">

      <div class="space-y-2">
        <label>تاریخ:</label>
        <Input {...register("date")}/>
      </div>

      <div class="space-y-2">
        <label>شماره فاکتور:</label>
        <Input {...register("factorNumber")} />
      </div>

      <div class="space-y-2">
        <label>شماره حواله:</label>
        <Input placeholder="شماره حواله" {...register("transferNumber")}/>
      </div>

      <div class="space-y-2">
        <label>مالیات (درصد)</label>
        <Input value={taxRate()} onchange={e => setTaxRate(parseInt(e.target.value))} type="number"/>
      </div>

      <h2 class="col-span-2 text-lg font-bold text-center">مشخصات خریدار</h2>

      <div class="space-y-2">
        <label>نام شخص حقیقی/حقوقی:</label>
        <Input placeholder="نام مورد نظر" {...register("recieverName")}/>
      </div>

      <div class="space-y-2">
        <label>شماره ملی/شماره ثبت:</label>
        <Input placeholder="0441234567" {...register("recieverNatinalID")}/>
      </div>

      <div class="space-y-2">
        <label>نشانی:</label>
        <Input placeholder="تهران خیابان ..." {...register("recieverAddress")}/>
      </div>

      <div class="space-y-2">
        <label>کد پستی:</label>
        <Input placeholder="1234567890" {...register("recieverPostalCode")}/>
      </div>

      <div class="space-y-2">
        <label>تلفن:</label>
        <Input placeholder="021-11223344" {...register("recieverPhone")}/>
      </div>

      <div class="space-y-2">
        <label>نمابر:</label>
        <Input placeholder="021-11223344" {...register("recieverFax")}/>
      </div>

      <h2 class="col-span-2 text-lg font-bold text-center">مشخصات کالا/خدمات</h2>

      <div class="col-span-2">
        <ProductManage/>
      </div>

      <div class="col-span-2 flex justify-center">
        <Button onclick={done}>ثبت </Button>
      </div>

    </div>
  </main>
}

