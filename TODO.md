# mmd
- add username to signup?
- add pageination for all factors


add customer suggestion
fix print
handle factor missing fields
add logo upload
add payment plan


# invoice
صورتحساب فروش کالا/خدمات
شماره فاکتور: به ترتیب
شماره حواله فروش
تاریخ 
وضعیت: تسویه شده/ در انتظار واریز

مشخصات فروشنده
نام شخص حقیقی/حقوقی
شماره ملی
شماره ثبت
نشانی
کد پستی
شماره اقتصادی
شماره تلفن
نمابر

مشخصات خریدار
نام شخص حقیقی/حقوقی
شماره اقتصادی
شماره ملی/شماره ثبت
نشانی
کد پستی
شماره تلفن
نمابر

مشخصات کالا یا خدمات مورد معامله
ردیف
کد کلا
شرح کالا یا خدمات
واحد
تعداد
مبلغ واحد
مبلغ کالا
تخفیف
جمع مالیات و عوارض
مبلغ کل
جمع کل به حروف
این صورتحساب بدون مهر مجتمع فاقد اعتبار می باشد
توضیحات
تاریخ تحویل؟
امضای فروشنده
امضای خریدار



factor {
    date: string
    factorNumber: string
    transferNumber: string
    taxRate: string
    reciever: {
        name: string
        natinalID: string
        postalCode: string
        address: string
        phone: string
        fax: string
    }
    products: [
        {name: string, quantity: number, unitPrice: number, discount: number}
    ]
}
