import clsx from "clsx";
import { createSignal } from "solid-js";
import Input from "./general/Input";
import { Button } from "./ui/button";

const ProductManage = () => {

  interface item {
    id: number,
    name: string, 
    quantity: number, 
    unitPrice: number, 
    discount: number, 
    totalPrice: number
  }
  const head = [
    "ردیف",
    "نام کالا",
    "تعداد",
    "قیمت واحد (ریال)",
    "تخفیف (%)",
    "قیمت کل (ریال)",
  ]
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

  const Td = ({children, className}:any) => {
    return <span class={clsx("p-2 first:pr-9", className)}>{children}</span>
  }

  const Tr = ({children, className}:any) => {
    return <div class={clsx("grid grid-cols-6 items-center", className)}>{children}</div>
  }

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
        <Td>{d.unitPrice * d.quantity}</Td>
      </Tr>)}
      <Tr>
        <Td>
          2
        </Td>
        <Td>
          <Input/>
        </Td>
        <Td>
          <Input type="number"/>
        </Td>
        <Td>
          <Input type="number"/>
        </Td>
        <Td>
          <Input type="number" value={0}/>
        </Td>
        <Td className="flex justify-center">
          <Button>افزودن</Button>
        </Td>
      </Tr>

    </div>
  )
}

export default ProductManage
