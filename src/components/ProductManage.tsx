import clsx from "clsx";
import { createSignal, onMount } from "solid-js";
import Input from "./general/Input";
import { Button } from "./ui/button";
import { Dynamic } from "solid-js/web";
import { useForm } from "~/utility/hooks";
import { setValidationEvents, validateSection } from "~/utility/validation/validator";

interface item {
  id: number,
  name: string, 
  quantity: number, 
  unitPrice: number, 
  discount: number, 
  totalPrice: number
}

const ProductManage = () => {

  const head = [
    "ردیف",
    "نام کالا",
    "تعداد",
    "قیمت واحد (ریال)",
    "تخفیف (%)",
    "قیمت کل (ریال)",
  ]
  let [data, setData] = createSignal<item[]>([]);
  const {register, submit} = useForm<item>()
  let formRef!: HTMLFormElement;

  const submitHandler = (e: item) => {
    let result = validateSection(formRef)
    if (!result) return
    setData(prev => [...prev, {...e, id:prev.length+1, totalPrice: calcTotalPrice(e)}])
  }

  onMount(() => {
    setValidationEvents(formRef)
  })
  

  return (
    <div class="border-1 rounded">
      <Tr className="bg-zinc-200">
        {head.map(h => <Td>{h}</Td>)}
      </Tr>
      {data().map(d => <Tr>
        <Td>{d.id}</Td>
        <Td>{d.name}</Td>
        <Td>{d.quantity}</Td>
        <Td>{d.unitPrice}</Td>
        <Td>{d.discount}</Td>
        <Td>{calcTotalPrice(d)}</Td>
      </Tr>)}
      <Tr as="form" onsubmit={submit(submitHandler)} ref={formRef}>
        <Td>
          {data().length+1}
        </Td>
        <Td >
          <Input {...register("name")} data-validate="required"/>
        </Td>
        <Td>
          <Input type="number" {...register("quantity")} data-validate="required"/>
        </Td>
        <Td>
          <Input type="number" {...register("unitPrice")} data-validate="required"/>
        </Td>
        <Td>
          <Input type="number" {...register("discount")} value={0} data-validate="required"/>
        </Td>
        <Td>
          <Button type="submit">افزودن</Button>
        </Td>
      </Tr>
    </div>
  )
}

const Td = (props:any) => {
  return <span
    class={clsx("p-2 first:pr-9 text-center", props.className)}
    {...props}
  >{props.children}</span>
}

const Tr = (props:any) => {
  return <Dynamic
    component={props.as ? props.as : "div"}
    class={clsx("grid grid-cols-6 items-center", props.className)}
    {...props}
  >{props.children}
  </Dynamic>
}

const calcTotalPrice = (e: item) => {
  let p = e.unitPrice * e.quantity
  return p - p * e.discount / 100
}

export default ProductManage
