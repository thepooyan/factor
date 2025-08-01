import clsx from "clsx";
import Input from "./general/Input";
import { Button } from "./ui/button";
import { Dynamic } from "solid-js/web";
import { taxRate } from "~/utility/signals";
import { formatNumber } from "~/utility/utility";
import { createStore } from "solid-js/store";

interface item {
  name: string, 
  quantity: number, 
  unitPrice: number, 
  discount: number
}

const emptyProduct:item = {name: "", quantity: 0, unitPrice: 0, discount: 0}
export let [productItems, setProductItems] = createStore<item[]>([{...emptyProduct}]);

const ProductManage = () => {
  const head = [
    "ردیف",
    "نام کالا",
    "تعداد",
    "قیمت واحد (ریال)",
    "تخفیف (%)",
    "قیمت کل (ریال)",
    "عملیات",
  ]
  // let formRef!: HTMLFormElement;

  const totalPrice = () => {
    return productItems.map(d => calcTotalPrice(d)).reduce((c,p) => c+p, 0)
  }

  const calcTax = () => {
    let t = totalPrice()
    return Math.round(t * taxRate() / 100)
  }

  const deleteMe = (i: number) => {
    if (productItems.length === 1) return setProductItems([{...emptyProduct}])
    setProductItems(prev => prev.filter((_,f) => f !== i))
  }

  const addRow = () => {
    setProductItems(prev => [...prev, {...emptyProduct}])
  }

  return (
    <>

    <div class="border-1 rounded ">
      <Tr className=" bg-zinc-200 font-bold" >
        {head.map(h => <Td>{h}</Td>)}
      </Tr>
      {productItems.map((d,i) => <Tr>
        <Td>{i+1}</Td>
        <Td>
          <Input value={d.name} onchange={e => setProductItems(i, "name", e.currentTarget.value)}
            validate="required" errorClass="!bg-red-100" noErrorEmit/>
        </Td>
        <Td>
          <Input type="number" value={d.quantity} onchange={e => setProductItems(i, "quantity", parseInt(e.currentTarget.value))}
            validate="neq-[0]" errorClass="!bg-red-100" noErrorEmit/>
        </Td>
        <Td>
          <Input type="number" value={(d.unitPrice)} onchange={e => setProductItems(i, "unitPrice", parseInt(e.currentTarget.value))}
            validate="neq-[0]" errorClass="!bg-red-100" noErrorEmit/>
        </Td>
        <Td>
          <Input type="number" value={(d.discount)} onchange={e => setProductItems(i, "discount", parseInt(e.currentTarget.value))}/>
        </Td>
        <Td>
          {formatNumber(calcTotalPrice(d))}</Td>
        <Td>
          <Button variant="destructive" onclick={() => deleteMe(i)}>حذف</Button>
        </Td>
      </Tr>)}
      <Button onclick={addRow} class="m-5 my-2">افزودن</Button>
    </div>
      <div class="mt-7 grid grid-cols-2 gap-2">
        <p>
          جمع کل: 
        </p>
        {formatNumber(totalPrice())} ریال
        <p>
          مالیات (%{taxRate()}): 
        </p>
        {formatNumber(calcTax())} ریال
        <p class="font-bold">
          مبلغ قابل پرداخت: 
        </p>
        <span class="font-bold">
          {formatNumber(totalPrice() - calcTax())} ریال
        </span>
      </div>
    </>
  )
}


const Td = (props:any) => {
  return <span
    class={clsx("p-2 flex items-center justify-center border-1", props.className)}
    {...props}
  >{props.children}</span>
}

const Tr = (props:any) => {
  return <Dynamic
    component={props.as ? props.as : "div"}
    class={clsx("grid grid-cols-[1fr_5fr_2fr_5fr_2fr_3fr_2fr] items-stretch ", props.className)}
    {...props}
  >{props.children}
  </Dynamic>
}

const calcTotalPrice = (e: item) => {
  let p = e.unitPrice * e.quantity
  return p - p * (e.discount / 100)
}

export default ProductManage
