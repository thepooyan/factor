import clsx from "clsx";
import { createSignal, onMount } from "solid-js";
import Input from "./general/Input";
import { Button } from "./ui/button";
import { Dynamic } from "solid-js/web";
import { useForm } from "~/utility/hooks";
import { setValidationEvents, validateSection } from "~/utility/validation/validator";
import { taxRate } from "~/utility/signals";
import { formatNumber } from "~/utility/utility";

interface item {
  name: string, 
  quantity: number, 
  unitPrice: number, 
}

export let [productItems, setProductItems] = createSignal<item[]>([]);

const ProductManage = () => {
  const head = [
    "ردیف",
    "نام کالا",
    "تعداد",
    "قیمت واحد (ریال)",
    "قیمت کل (ریال)",
    "عملیات",
  ]
  const {register, submit} = useForm<item>()
  let formRef!: HTMLFormElement;

  const submitHandler = (e: item) => {
    let result = validateSection(formRef)
    if (!result) return
    setProductItems(prev => [...prev, {...e, id:prev.length+1, totalPrice: calcTotalPrice(e)}])
  }

  onMount(() => {
    setValidationEvents(formRef)
  })
  
  const Vinput = (props: any) => {
    return <Input {...register(props.name)} data-validate="required" noErrorEmit errorClass="!border-red" {...props} class="text-center"/>
  }

  const totalPrice = () => {
    return productItems().map(d => calcTotalPrice(d)).reduce((c,p) => c+p, 0)
  }

  const calcTax = () => {
    let t = totalPrice()
    return Math.round(t * taxRate() / 100)
  }

  const deleteMe = (i: number) => {
    setProductItems(prev => prev.filter((_,f) => f !== i))
  }

  const addRow = () => {
    setProductItems(prev => [...prev, {name:"", quantity: 0, unitPrice: 0}])
  }

  return (
    <>

    <div class="border-1 rounded ">
      <Tr className=" bg-zinc-200 font-bold" >
        {head.map(h => <Td>{h}</Td>)}
      </Tr>
      {productItems().map((d,i) => <Tr>
        <Td>{i+1}</Td>
        <Td><Vinput value={d.name}/></Td>
        <Td><Vinput value={d.quantity}/></Td>
        <Td><Vinput value={formatNumber(d.unitPrice)}/></Td>
        <Td>{formatNumber(calcTotalPrice(d))}</Td>
        <Td><Button variant="destructive" onclick={() => deleteMe(i)}>حذف</Button></Td>
      </Tr>)}
      <Tr as="form" onsubmit={submit(submitHandler)} ref={formRef}>
        <Td>
          {productItems().length+1}
        </Td>
        <Td >
          <Vinput name="name" placeholder="نام کالا"/>
        </Td>
        <Td>
          <Vinput name="quantity" type="number" placeholder="تعداد"/>
        </Td>
        <Td>
          <Vinput name="unitPrice" type="number" placeholder="قیمت"/>
        </Td>
        <Td>
          <Vinput name="discount" type="number" value={0} />
        </Td>
      </Tr>
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
    class={clsx("grid grid-cols-[1fr_5fr_2fr_5fr_2fr_2fr] items-stretch ", props.className)}
    {...props}
  >{props.children}
  </Dynamic>
}

const calcTotalPrice = (e: item) => {
  return e.unitPrice * e.quantity
}

export default ProductManage
