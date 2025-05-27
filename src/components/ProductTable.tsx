import { Button } from "~/components/ui/button"
import { createSignal } from "solid-js"

const ProductTable = () => {

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

  return (
    <div class="col-span-2 border-collapse">
      <div>
        <div class="bg-muted">
          <div class="border p-2 text-right">ردیف</div>
          <div class="border p-2 text-right">نام کالا</div>
          <div class="border p-2 text-right">تعداد</div>
          <div class="border p-2 text-right">قیمت واحد (ریال)</div>
          <div class="border p-2 text-right">تخفیف (%)</div>
          <div class="border p-2 text-right">قیمت کل (ریال)</div>
          <div class="border p-2 text-right">عملیات</div>
        </div>
      </div>
      <div>
        {items().map((tr, ind) => (
          <div>
            <div>{ind + 1}</div>
            <div>{tr.name}</div>
            <div>{tr.quantity}</div>
            <div>{tr.unitPrice}</div>
            <div>{tr.discount}</div>
            <div>{tr.quantity * tr.unitPrice}</div>
            <div onclick={() => deleteRow(tr.id)}>حذف</div>
          </div>
        ))}
      </div>
      <Button>افزودن</Button>
    </div>
  );
};

export default ProductTable;
