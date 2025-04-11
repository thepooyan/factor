import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { createSignal } from "solid-js"
import Input from "../general/Input"
import { FiDownloadCloud, FiPrinter, FiSend } from "solid-icons/fi"

export default function InvoicePage() {
  const [invoiceData, setInvoiceData] = createSignal({
    date: "",
    invoiceNumber: "",
    companyName: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    companyPhone: "",
    companyFax: "",
    companyAddress: "",
    tax: 9, // Default tax percentage
  })

  const [items, setItems] = createSignal([{ id: 1, name: "", quantity: 0, unitPrice: 0, discount: 0, total: 0 }])

  const handleInvoiceChange = (e: any) => {
    const { name, value } = e.target
    setInvoiceData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleItemChange = (id: number, field: string, value: string | number) => {
    const newItems = items().map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }

        // Recalculate total if quantity, unitPrice or discount changes
        if (field === "quantity" || field === "unitPrice" || field === "discount") {
          const quantity = field === "quantity" ? Number(value) : item.quantity
          const unitPrice = field === "unitPrice" ? Number(value) : item.unitPrice
          const discount = field === "discount" ? Number(value) : item.discount

          updatedItem.total = quantity * unitPrice * (1 - discount / 100)
        }

        return updatedItem
      }
      return item
    })

    setItems(newItems)
  }

  const addNewItem = () => {
    const newId = items().length > 0 ? Math.max(...items().map((item) => item.id)) + 1 : 1
    setItems([...items(), { id: newId, name: "", quantity: 0, unitPrice: 0, discount: 0, total: 0 }])
  }

  const removeItem = (id: number) => {
    if (items().length > 1) {
      setItems(items().filter((item) => item.id !== id))
    }
  }

  const calculateSubtotal = () => {
    return items().reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * (Number(invoiceData().tax) / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    alert("در یک برنامه واقعی، این قابلیت یک فایل PDF ایجاد می‌کند")
  }

  const handleSendOnline = () => {
    // In a real application, this would send the invoice via email or other methods
    alert("در یک برنامه واقعی، این قابلیت فاکتور را به صورت آنلاین ارسال می‌کند")
  }

  return (
    <div class="container mx-auto p-4 print:p-0" dir="rtl">
      <Card class="w-full max-w-5xl mx-auto">
        <CardContent class="p-6">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold">فاکتور فروش</h1>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="date">تاریخ</Label>
                  <Input
                    id="date"
                    name="date"
                    value={invoiceData().date}
                    onChange={handleInvoiceChange}
                    placeholder="1402/01/01"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="invoiceNumber">شماره فاکتور</Label>
                  <Input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={invoiceData().invoiceNumber}
                    onChange={handleInvoiceChange}
                    placeholder="001-1402"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="companyName">نام شرکت</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={invoiceData().companyName}
                  onChange={handleInvoiceChange}
                  placeholder="شرکت نمونه"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="companyPhone">تلفن</Label>
                  <Input
                    id="companyPhone"
                    name="companyPhone"
                    value={invoiceData().companyPhone}
                    onChange={handleInvoiceChange}
                    placeholder="021-12345678"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="companyFax">فکس</Label>
                  <Input
                    id="companyFax"
                    name="companyFax"
                    value={invoiceData().companyFax}
                    onChange={handleInvoiceChange}
                    placeholder="021-87654321"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="companyAddress">آدرس شرکت</Label>
                <Input
                  id="companyAddress"
                  name="companyAddress"
                  value={invoiceData().companyAddress}
                  onChange={handleInvoiceChange}
                  placeholder="تهران، خیابان ..."
                />
              </div>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <Label for="customerName">نام مشتری</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={invoiceData().customerName}
                  onChange={handleInvoiceChange}
                  placeholder="نام و نام خانوادگی"
                />
              </div>

              <div class="space-y-2">
                <Label for="customerPhone">شماره تماس مشتری</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  value={invoiceData().customerPhone}
                  onChange={handleInvoiceChange}
                  placeholder="09123456789"
                />
              </div>

              <div class="space-y-2">
                <Label for="customerAddress">آدرس مشتری</Label>
                <Input
                  id="customerAddress"
                  name="customerAddress"
                  value={invoiceData().customerAddress}
                  onChange={handleInvoiceChange}
                  placeholder="آدرس کامل مشتری"
                />
              </div>

              <div class="space-y-2">
                <Label for="tax">مالیات (درصد)</Label>
                <Input
                  id="tax"
                  name="tax"
                  type="number"
                  value={invoiceData().tax}
                  onChange={handleInvoiceChange}
                  placeholder="9"
                />
              </div>
            </div>
          </div>

          <div class="mb-6">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
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
                  {items().map((item, index) => (
                    <tr>
                      <td class="border p-2 text-right">{index + 1}</td>
                      <td class="border p-2">
                        <Input
                          value={item.name}
                          onChange={(e:any) => handleItemChange(item.id, "name", e.target.value)}
                          placeholder="نام محصول"
                        />
                      </td>
                      <td class="border p-2">
                        <Input
                          type="number"
                          value={item.quantity === 0 ? "" : item.quantity}
                          onChange={(e:any) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                          placeholder="0"
                        />
                      </td>
                      <td class="border p-2">
                        <Input
                          type="number"
                          value={item.unitPrice === 0 ? "" : item.unitPrice}
                          onChange={(e:any) => handleItemChange(item.id, "unitPrice", Number(e.target.value))}
                          placeholder="0"
                        />
                      </td>
                      <td class="border p-2">
                        <Input
                          type="number"
                          value={item.discount === 0 ? "" : item.discount}
                          onChange={(e:any) => handleItemChange(item.id, "discount", Number(e.target.value))}
                          placeholder="0"
                        />
                      </td>
                      <td class="border p-2 text-left">{item.total.toLocaleString("fa-IR")}</td>
                      <td class="border p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={items().length <= 1}
                        >
                          حذف
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button variant="outline" class="mt-2" onClick={addNewItem}>
              افزودن کالا
            </Button>
          </div>

          <div class="flex flex-col items-end space-y-2 mb-6">
            <div class="flex justify-between w-full max-w-xs">
              <span>جمع کل:</span>
              <span>{calculateSubtotal().toLocaleString("fa-IR")} ریال</span>
            </div>
            <div class="flex justify-between w-full max-w-xs">
              <span>مالیات ({invoiceData().tax}%):</span>
              <span>{calculateTax().toLocaleString("fa-IR")} ریال</span>
            </div>
            <div class="flex justify-between w-full max-w-xs font-bold">
              <span>مبلغ قابل پرداخت:</span>
              <span>{calculateTotal().toLocaleString("fa-IR")} ریال</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 justify-center print:hidden">
            <Button onClick={handlePrint}>
              <FiPrinter class="w-4 h-4 ml-2" />
              پرینت
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <FiDownloadCloud class="w-4 h-4 ml-2" />
              دانلود
            </Button>
            <Button variant="secondary" onClick={handleSendOnline}>
              <FiSend class="w-4 h-4 ml-2" />
              ارسال آنلاین
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

