import { AI_FactorView } from "~/utility/apiInterface"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { PrinterIcon as Print, Check, X } from "lucide-solid"
import { createSignal, Show } from "solid-js"
import { Button } from "./ui/button"
import Separator from "./ui/Separator"

interface p {
  invoiceData: AI_FactorView
}
const ViewFactor = ({invoiceData}:p) => {
  const [showAcceptDialog, setShowAcceptDialog] = createSignal(false)
  const [isAccepted, setIsAccepted] = createSignal<boolean | null>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleAccept = () => {
    setShowAcceptDialog(true)
  }

  const confirmAccept = (accepted: boolean) => {
    setIsAccepted(accepted)
    setShowAcceptDialog(false)
  }

  const calculateItemTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice
    const discountAmount = (subtotal * item.discount) / 100
    return subtotal - discountAmount
  }

  const calculateSubtotal = () => {
    return invoiceData.factor_infos.factor_items.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  const calculateTax = () => {
    return (calculateSubtotal() * Number.parseFloat(invoiceData.factor_infos.tax)) / 100
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " ریال"
  }

  return (
    <div class="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div class="max-w-4xl mx-auto">
        <Card class="mb-6">
          <CardHeader class="pb-4">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-4">
                <Show when={invoiceData.company_infos.company_infos.company_logo_path}>
                  {l => <img
                    src={l()}
                    alt="لوگو شرکت"
                    class="w-20 h-12 object-contain"
                  />}
                </Show>
                <div>
                  <h2 class="text-2xl font-bold">{invoiceData.company_infos.company_infos.company_name}</h2>
                  <p class="text-gray-600">{invoiceData.company_infos.company_infos.description}</p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Company and Customer Info */}
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 class="font-semibold mb-2 text-lg">اطلاعات شرکت:</h3>
                <div class="space-y-1 text-sm">
                  <p>
                    <span class="font-medium">آدرس:</span> {invoiceData.company_infos.company_infos.company_address}
                  </p>
                  <p>
                    <span class="font-medium">تلفن:</span> {invoiceData.company_infos.company_infos.company_phone}
                  </p>
                  <p>
                    <span class="font-medium">فکس:</span> {invoiceData.company_infos.company_infos.company_fax}
                  </p>
                  <p>
                    <span class="font-medium">کد پستی:</span> {invoiceData.company_infos.company_infos.post_code}
                  </p>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-2 text-lg">اطلاعات مشتری:</h3>
                <div class="space-y-1 text-sm">
                  <p>
                    <span class="font-medium">نام:</span> {invoiceData.customer_infos.first_name}
                  </p>
                  <p>
                    <span class="font-medium">تلفن:</span> {invoiceData.customer_infos.phone_number}
                  </p>
                  <p>
                    <span class="font-medium">فکس:</span> {invoiceData.customer_infos.fax_number}
                  </p>
                  <p>
                    <span class="font-medium">آدرس:</span> {invoiceData.customer_infos.address}
                  </p>
                  <p>
                    <span class="font-medium">شهر:</span> {invoiceData.customer_infos.city}
                  </p>
                  <p>
                    <span class="font-medium">کد پستی:</span> {invoiceData.customer_infos.post_code}
                  </p>
                  <p>
                    <span class="font-medium">کد ملی:</span> {invoiceData.customer_infos.identification_number}
                  </p>
                </div>
              </div>
            </div>

            <Separator class="my-6" />

            {/* Invoice Details */}
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 class="font-semibold mb-2 text-lg">جزئیات فاکتور:</h3>
                <div class="space-y-1 text-sm">
                  <p>
                    <span class="font-medium">شماره فاکتور:</span> {invoiceData.factor_infos.factor_number}
                  </p>
                  <p>
                    <span class="font-medium">تاریخ:</span> {invoiceData.factor_infos.factor_date}
                  </p>
                  <p>
                    <span class="font-medium">نرخ مالیات:</span> {invoiceData.factor_infos.tax}%
                  </p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div class="mb-6">
              <h3 class="font-semibold mb-4 text-lg">اقلام فاکتور:</h3>
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
                  {invoiceData.factor_infos.factor_items.map((item) => (
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
            <div class="flex justify-end">
              <div class="w-80 space-y-2">
                <div class="flex justify-between">
                  <span>جمع کل:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div class="flex justify-between">
                  <span>مالیات ({invoiceData.factor_infos.tax}%):</span>
                  <span>{formatCurrency(calculateTax())}</span>
                </div>
                <Separator />
                <div class="flex justify-between font-bold text-lg">
                  <span>مبلغ نهایی:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>

            {/* Status Display */}
            {isAccepted() !== null && (
              <div class="mt-6 p-4 rounded-lg bg-gray-100">
                <div class="flex items-center gap-2">
                  {isAccepted() ? (
                    <>
                      <Check class="w-5 h-5 text-green-600" />
                      <span class="text-green-600 font-medium">فاکتور تایید شد</span>
                    </>
                  ) : (
                    <>
                      <X class="w-5 h-5 text-red-600" />
                      <span class="text-red-600 font-medium">فاکتور رد شد</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div class="flex gap-4 justify-center print:hidden">
          <Button onClick={handlePrint} variant="outline" class="flex items-center gap-2 bg-transparent">
            <Print class="w-4 h-4" />
            چاپ فاکتور
          </Button>
          <Button onClick={handleAccept} class="flex items-center gap-2">
            <Check class="w-4 h-4" />
            تایید فاکتور
          </Button>
        </div>
      </div>

      {/* Accept/Reject Dialog */}
      <Dialog open={showAcceptDialog()} onOpenChange={setShowAcceptDialog}>
        <DialogContent class="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>تایید فاکتور</DialogTitle>
            <DialogDescription>آیا این فاکتور را تایید می‌کنید؟</DialogDescription>
          </DialogHeader>
          <DialogFooter class="flex gap-2">
            <Button onClick={() => confirmAccept(false)} variant="outline">
              خیر، رد کن
            </Button>
            <Button onClick={() => confirmAccept(true)}>بله، تایید کن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewFactor
