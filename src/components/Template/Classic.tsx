import { JSXElement, Show } from "solid-js"
import { AI_FactorView } from "~/utility/apiInterface"
import { logoName2url } from "~/utility/utility"
import "~/styles/print.scss"

interface p {
  data: AI_FactorView
}
const Classic = ({data}:p) => {
  let cp = data.company_infos.company_infos
  let f = data.factor_infos
  let cu = data.customer_infos
  return (
    <div>
      <div class="grid grid-cols-3 justify-center items-center justify-items-center ">
        <Show when={cp.company_logo_name}>
          {l => <img src={logoName2url(l(), cp.company_id)}/>}
        </Show>
        <h1 class="text-2xl font-bold">{cp.company_name}</h1>
        <div class="space-y-2">
          <p>
            تاریخ فاکتور: {f.factor_date}
          </p>
          <p>
            شماره فاکتور: {f.factor_number}
          </p>
        </div>
      </div>

      <Devider>مشخصات خریدار</Devider>

      <div class="grid grid-cols-2 gap-5 p-5">
        <p>
          نام مشتری: {f.factor_customer_name}
        </p>
        <p>
          شماره تماس: {cu.phone_number}
        </p>
        <p class="grid-col-span-2">
          آدرس: {cu.address}
        </p>
      </div>

      <Devider>محصولات</Devider>

      <div class="border-3 border-black rounded-lg mt-5 overflow-hidden">
        <Row name="نام" count="تعداد" price="قیمت" wholePrice="قیمت کل"/>
        {f.factor_items.map((i,index) => <Row name={i.name} count={i.quantity} index={index+1} price={i.unitPrice} wholePrice={i.quantity * i.unitPrice}/>)}
      </div>
      <div class="p-5 border-3 rounded-lg border-black mt-3 w-80 font-bold mr-auto">
        مبلغ قابل پرداخت: 21,000,000
      </div>

      <div class="grid grid-cols-2 justify-items-center gap-3 mt-9">
        <p>آدرس: {cp.company_address}</p>
        <p>تلفن: <span class="ltr inline-block">{cp.company_phone}</span></p>
        <p>فکس: <span class="ltr inline-block">{cp.company_fax}</span></p>
      </div>
      
    </div>
  )
}

const Devider = ({children}:{children: JSXElement}) => {
  return <div class="border-t-5 border-black text-center rounded-xl m-auto my-10 mt-15">
    <span class="bg-white relative bottom-3.5 px-2">{children}</span>
  </div>
}
interface f {
  name: string,
  count: number | string,
  price: number | string,
  index?: number,
  wholePrice: number | string
}
const Row = ({name, count, price, index, wholePrice}:f) => <div class="grid grid-cols-[1fr_8fr_2fr_2fr_3fr]">
  <Cell>{index}</Cell>
  <Cell>{name}</Cell>
  <Cell>{count}</Cell>
  <Cell>{price}</Cell>
  <Cell>{wholePrice}</Cell>
</div>

const Cell = ({children}:{children: JSXElement}) => <div class="border-2 border-black text-center py-2">{children}</div>

export default Classic
