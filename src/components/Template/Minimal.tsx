import { AI_FactorView } from "~/utility/apiInterface"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Show } from "solid-js"
import Separator from "~/components/ui/Separator"
import { formatToPersianShortDate, hasCompany, logoName2url } from "~/utility/utility"

interface p {
  data: AI_FactorView
}
const Minimal = ({data}:p) => {

  const calculateItemTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice
    const discountAmount = (subtotal * item.discount) / 100
    return subtotal - discountAmount
  }

  const calculateSubtotal = () => {
    return data.factor_infos.factor_items.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  const calculateTax = () => {
    return (calculateSubtotal() * Number.parseFloat(data.factor_infos.tax)) / 100
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " ریال"
  }

  return (
    <>
        <Card class="mb-6">
          <CardHeader class="pb-4">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-4">
                <Show when={data.company_infos.company_infos.company_logo_name}>
                  {l => <img
                    src={logoName2url(l(), data.company_infos.company_infos.company_id)}
                    alt="لوگو شرکت"
                    class="w-20 h-12 object-contain"
                  />}
                </Show>
                <div>
                  <h2 class="text-2xl font-bold">{data.company_infos.company_infos.company_name}</h2>
                  <p class="text-gray-600">{data.company_infos.company_infos.description}</p>
                </div>
              </div>
              <div class="text-left space-y-1">
                <p>
                  <span>تاریخ:</span> {formatToPersianShortDate(data.factor_infos.factor_date)}
                </p>
                <p>
                  <span>شماره فاکتور:</span> {data.factor_infos.factor_number}
                </p>
              </div>
            </div>
          </CardHeader>

          <Separator class="w-9/10 mb-5"/>

          <CardContent>
            {/* Company and Customer Info */}
            <div class="mb-6">
              <Show when={hasCompany(data)}>
              <div>
                <h3 class="font-semibold mb-2 text-lg text-center mb-5">اطلاعات شرکت</h3>
                <div class="space-y-1 text-sm grid grid-cols-2 text-center">
                  <Show when={data.company_infos.company_infos.company_address}>
                    {a => <p>
                      <span class="font-medium">آدرس:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.company_infos.company_infos.company_phone}>
                    {a => <p>
                      <span class="font-medium">تلفن:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.company_infos.company_infos.company_fax}>
                    {a => <p>
                      <span class="font-medium">فکس:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.company_infos.company_infos.post_code}>
                    {a => <p>
                      <span class="font-medium">کد پستی:</span> {a()}
                    </p>}
                  </Show>
                </div>
              </div>
              </Show>
              <Separator vertical/>

              <div>
                <h3 class="font-semibold mb-2 text-lg text-center mb-5">اطلاعات مشتری</h3>
                <div class="space-y-1 text-sm grid grid-cols-2 text-center">
                  <Show when={data.customer_infos.first_name}>
                    {a => <p>
                      <span class="font-medium">نام:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.customer_infos.phone_number}>
                    {a => <p>
                      <span class="font-medium">تلفن:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.customer_infos.fax_number}>
                    {a => <p>
                      <span class="font-medium">فکس:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.customer_infos.address}>
                    {a => <p>
                      <span class="font-medium">آدرس:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.customer_infos.city}>
                    {a => <p>
                      <span class="font-medium">شهر:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.customer_infos.post_code}>
                    {a => <p>
                      <span class="font-medium">کد پستی:</span> {a()}
                    </p>}
                  </Show>
                  <Show when={data.customer_infos.identification_number}>
                    {a => <p>
                      <span class="font-medium">کد ملی:</span> {a()}
                    </p>}
                  </Show>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div class="mb-6">
              <h3 class="font-semibold mb-4 text-lg ">اقلام فاکتور:</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="text-right">نام کالا</TableHead>
                    <TableHead class="text-right">تعداد</TableHead>
                    <TableHead class="text-right">قیمت واحد</TableHead>
                    <TableHead class="text-right">تخفیف (%)</TableHead>
                    <TableHead class="text-right">مجموع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.factor_infos.factor_items.map((item) => (
                    <TableRow>
                      <TableCell class="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell>{item.discount}%</TableCell>
                      <TableCell>{formatCurrency(calculateItemTotal(item))}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totals */}
            <div class="flex justify-end mt-10 text-sm">
              <div class="w-80 space-y-2">
                <div class="flex justify-between">
                  <span>جمع کل:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div class="flex justify-between">
                  <span>مالیات ({parseInt(data.factor_infos.tax)}%):</span>
                  <span>{formatCurrency(calculateTax())}</span>
                </div>
                <Separator />
                <div class="flex justify-between font-bold ">
                  <span>مبلغ نهایی:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    </>
  )
}

export default Minimal
